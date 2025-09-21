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
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiBody
} from '@nestjs/swagger'

@ApiTags('Usuarios') // Agrupa este controller en Swagger
@Controller('usuarios')
@UsePipes(new ValidationPipe({ transform: true }))
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo usuario' })
  @ApiBody({ type: CreateUsuarioDto })
  @ApiResponse({ status: 201, description: 'Usuario creado con éxito' })
  @ApiBadRequestResponse({
    description: 'Datos inválidos o usuario ya existente'
  })
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
  @ApiOperation({ summary: 'Obtener todos los usuarios' })
  @ApiResponse({
    status: 200,
    description: 'Lista de usuarios obtenida con éxito'
  })
  @ApiNotFoundResponse({ description: 'No se encontraron usuarios' })
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
  @ApiOperation({ summary: 'Obtener un usuario por su ID' })
  @ApiResponse({ status: 200, description: 'Usuario encontrado con éxito' })
  @ApiNotFoundResponse({ description: 'Usuario no encontrado' })
  public async findUsuarioById(@Param('id') id: string, @Res() res: Response) {
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
  @ApiOperation({ summary: 'Actualizar un usuario por ID' })
  @ApiBody({ type: UpdateUsuarioDto })
  @ApiResponse({ status: 201, description: 'Usuario actualizado con éxito' })
  @ApiNotFoundResponse({ description: 'Usuario no encontrado' })
  @ApiBadRequestResponse({
    description: 'Datos inválidos o conflicto de datos'
  })
  public async updateUsuario(
    @Param('id') id: string,
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
  @ApiOperation({ summary: 'Eliminar un usuario por ID' })
  @ApiResponse({ status: 200, description: 'Usuario eliminado con éxito' })
  @ApiNotFoundResponse({ description: 'Usuario no encontrado' })
  public async deleteUsuario(@Param('id') id: string, @Res() res: Response) {
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
