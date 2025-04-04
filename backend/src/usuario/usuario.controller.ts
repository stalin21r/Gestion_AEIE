import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  HttpStatus,
  BadRequestException,
  NotFoundException,
  UseGuards
} from '@nestjs/common'
import { UsuarioService } from './usuario.service'
import { CreateUsuarioDto } from './dto/create-usuario.dto'
import { UpdateUsuarioDto } from './dto/update-usuario.dto'
import { Response } from 'express'
import { ValidationPipe, UsePipes } from '@nestjs/common'
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard'
import { RolesGuard } from '../auth/guards/roles.guard'

@Controller('usuarios')
@UsePipes(new ValidationPipe({ transform: true }))
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  /**
   * Creates a new user.
   *
   * Creates a new user with the details provided in the `createUsuarioDto`.
   * If the creation fails, throws a `BadRequestException`.
   * If the creation succeeds, returns a JSON response with a 201 status code and the created user.
   * If an unexpected error occurs, throws an `InternalServerErrorException`.
   *
   * @param createUsuarioDto The data transfer object containing the user details.
   * @param res The response object.
   * @returns A JSON response with the created user and a 201 status code.
   * @throws {BadRequestException} - If the user creation fails.
   * @throws {InternalServerErrorException} - If an unexpected error occurs.
   */
  public async createUsuario(
    @Body() createUsuarioDto: CreateUsuarioDto,
    @Res() res: Response
  ) {
    try {
      const result = await this.usuarioService.createUsuario(createUsuarioDto)
      return res.status(HttpStatus.CREATED).json({
        message: 'Usuario creado con éxito',
        data: result
      })
    } catch (error) {
      if (error instanceof BadRequestException) {
        return res.status(HttpStatus.BAD_REQUEST).json({
          message: error.message,
          error
        })
      }
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: 'Error interno del servidor',
        error: error.message
      })
    }
  }

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)

  /**
   * Finds all users.
   *
   * Finds all users and returns them in a JSON response.
   * If no users are found, throws a `NotFoundException`.
   * If an unexpected error occurs, throws an `InternalServerErrorException`.
   *
   * @param res The response object.
   * @returns A JSON response with the found users and a 200 status code.
   * @throws {NotFoundException} - If no users are found.
   * @throws {InternalServerErrorException} - If an unexpected error occurs.
   */
  public async findUsuarios(@Res() res: Response) {
    try {
      const result = await this.usuarioService.findUsuarios()
      return res.status(HttpStatus.OK).json({
        message: 'Usuarios encontrados con éxito',
        data: result
      })
    } catch (error) {
      if (error instanceof NotFoundException) {
        return res.status(HttpStatus.NOT_FOUND).json({
          message: error.message,
          error: error
        })
      }
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: 'Error interno del servidor',
        error: error.message
      })
    }
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  /**
   * Finds a user by ID.
   *
   * Finds a user by their ID and returns the user in a JSON response.
   * If no user is found, throws a `NotFoundException`.
   * If an unexpected error occurs, throws an `InternalServerErrorException`.
   *
   * @param id The ID of the user to find.
   * @param res The response object.
   * @returns A JSON response with the found user and a 200 status code.
   * @throws {NotFoundException} - If no user is found.
   * @throws {InternalServerErrorException} - If an unexpected error occurs.
   */
  public async findUsuarioById(@Param('id') id: number, @Res() res: Response) {
    try {
      const result = await this.usuarioService.findUsuarioById(id)
      return res.status(HttpStatus.OK).json({
        message: 'Usuario encontrado con éxito',
        data: result
      })
    } catch (error) {
      if (error instanceof NotFoundException) {
        return res.status(HttpStatus.NOT_FOUND).json({
          message: error.message,
          error: error
        })
      }
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: 'Error interno del servidor',
        error: error.message
      })
    }
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)

  /**
   * Updates a user by their ID.
   *
   * Updates a user by their ID and updates their details using the provided `updateUsuarioDto`.
   * If the user is not found, throws a `NotFoundException`.
   * If the update fails, throws a `BadRequestException`.
   * If the email or username already exists, throws a `BadRequestException` with a custom error message.
   * If an unexpected error occurs, throws an `InternalServerErrorException`.
   *
   * @param id The ID of the user to update.
   * @param updateUsuarioDto The data transfer object containing updated user details.
   * @param res The response object.
   * @returns A JSON response with the updated user and a 201 status code.
   * @throws {NotFoundException} - If no user is found.
   * @throws {BadRequestException} - If the user update fails or the email or username already exists.
   * @throws {InternalServerErrorException} - If an unexpected error occurs.
   */
  public async updateUsuario(
    @Param('id') id: number,
    @Body() updateUsuarioDto: UpdateUsuarioDto,
    @Res() res: Response
  ) {
    try {
      const result = await this.usuarioService.updateUsuario(
        id,
        updateUsuarioDto
      )
      return res.status(HttpStatus.CREATED).json({
        message: 'Usuario actualizado con éxito',
        data: result
      })
    } catch (error) {
      if (error instanceof NotFoundException) {
        return res.status(HttpStatus.NOT_FOUND).json({
          message: error.message,
          error: error
        })
      }
      if (error instanceof BadRequestException) {
        return res.status(HttpStatus.BAD_REQUEST).json({
          message: error.message,
          error
        })
      }
      if (error.message.includes('duplicate key')) {
        return res.status(HttpStatus.BAD_REQUEST).json({
          message: 'El correo o usuario ya existe.',
          error: error.message
        })
      }
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: 'Error interno del servidor',
        error: error.message
      })
    }
  }
  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)

  /**
   * Deletes a user by their ID.
   *
   * Invokes the `deleteUsuario` method of `UsuarioService` to remove the user with the specified `id`.
   * Returns a success message and the result of the deletion in a JSON response with a 200 status code.
   * If the user is not found, returns a JSON response with a 404 status code.
   * If an unexpected error occurs, returns a JSON response with a 500 status code.
   *
   * @param id The ID of the user to delete.
   * @param res The response object.
   * @returns A JSON response with a success message and the result of the deletion.
   * @throws {NotFoundException} - If the user with the specified ID is not found.
   * @throws {InternalServerErrorException} - If an unexpected error occurs.
   */
  public async deleteUsuario(@Param('id') id: number, @Res() res: Response) {
    try {
      const result = await this.usuarioService.deleteUsuario(id)
      return res.status(HttpStatus.OK).json({
        message: 'Usuario eliminado con éxito.',
        data: result
      })
    } catch (error) {
      if (error instanceof NotFoundException) {
        return res.status(HttpStatus.NOT_FOUND).json({
          message: error.message,
          error: error
        })
      }
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: 'Error interno del servidor.',
        error: error.message
      })
    }
  }
}
