import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
  HttpStatus,
  BadRequestException,
  NotFoundException,
  Res,
  Req,
  Query,
  UseGuards
  //  UseGuards
} from '@nestjs/common'
import { TurnoService } from './turno.service'
import { CreateTurnoDto } from './dto/create-turno.dto'
import { UpdateTurnoDto } from './dto/update-turno.dto'
import { CustomRequest } from '../auth/interfaces/CustomRequest.interface'
import { Response } from 'express'
import { RolesGuard } from '../auth/guards/roles.guard'
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard'

@Controller('turno')
@UsePipes(new ValidationPipe({ whitelist: true }))
export class TurnoController {
  constructor(private readonly turnoService: TurnoService) {}

  //@UseGuards(JwtAuthGuard)
  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  /**
   * Creates a new turno.
   *
   * Uses the provided `createTurnoDto` to create a new turno. Logs the user
   * information from the request. If successful, returns a JSON response with a
   * 201 status code and the created turno data. If a bad request error occurs,
   * such as the user not existing, returns a 400 status code with an appropriate
   * error message. For other errors, returns a 500 status code.
   *
   * @param res - The response object.
   * @param createTurnoDto - The data transfer object containing turno details.
   * @param req - The request object containing user information.
   * @returns A JSON response with the created turno and a 201 status code.
   * @throws {BadRequestException} - If the user does not exist or other validation errors.
   * @throws {InternalServerErrorException} - If an unexpected error occurs.
   */
  async createTurno(
    @Res() res: Response,
    @Body() createTurnoDto: CreateTurnoDto,
    @Req() req: CustomRequest
  ) {
    try {
      console.log('req.user', req.user)
      const result = await this.turnoService.createTurno(createTurnoDto)
      return res.status(HttpStatus.CREATED).json({
        message: 'Turno registrada correctamente',
        data: result
      })
    } catch (error) {
      if (error instanceof BadRequestException) {
        return res.status(HttpStatus.BAD_REQUEST).json({
          message: error.message
        })
      }
      if (error.code === '23503') {
        return res.status(HttpStatus.BAD_REQUEST).json({
          message: 'Error al registrar turno: el usuario no existe.'
        })
      }
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: 'Error al registrar turno',
        error: error
      })
    }
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  /**
   * Finds all turnos.
   *
   * Finds all turnos and returns them in a JSON response.
   * If no turnos are found, throws a `NotFoundException`.
   * If an unexpected error occurs, throws an `InternalServerErrorException`.
   *
   * @param res The response object.
   * @param usuario The user ID to filter turnos by. Optional.
   * @returns A JSON response with the found turnos and a 200 status code.
   * @throws {NotFoundException} - If no turnos are found.
   * @throws {InternalServerErrorException} - If an unexpected error occurs.
   */
  async findAllTurnos(
    @Res() res: Response,
    @Query('usuario') usuario?: number
  ) {
    try {
      const result = await this.turnoService.findAllTurnos(usuario)
      return res.status(HttpStatus.OK).json({
        message: 'Turnos obtenidas correctamente',
        data: result
      })
    } catch (error) {
      if (error instanceof NotFoundException) {
        return res.status(HttpStatus.NOT_FOUND).json({
          message: error.message
        })
      }
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: 'Error al obtener turnos',
        error: error.message
      })
    }
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  /**
   * Finds a turno by its ID.
   *
   * Finds a turno by its ID and returns it in a JSON response.
   * If no turno is found, throws a `NotFoundException`.
   * If an unexpected error occurs, throws an `InternalServerErrorException`.
   *
   * @param id The ID of the turno to find.
   * @param res The response object.
   * @returns A JSON response with the found turno and a 200 status code.
   * @throws {NotFoundException} - If no turno is found.
   * @throws {InternalServerErrorException} - If an unexpected error occurs.
   */
  async findTurnoById(@Res() res: Response, @Param('id') id: number) {
    try {
      const result = await this.turnoService.findTurnoById(id)
      return res.status(HttpStatus.OK).json({
        message: 'Turno obtenida correctamente',
        data: result
      })
    } catch (error) {
      if (error instanceof NotFoundException) {
        return res.status(HttpStatus.NOT_FOUND).json({
          message: error.message
        })
      }
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: 'Error al obtener turno',
        error: error.message
      })
    }
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  /**
   * Updates a turno by its ID.
   *
   * Finds a turno by its ID and updates its details using the provided `updateTurnoDto`.
   * If the turno is not found, throws a `NotFoundException`.
   * If the update fails, throws a `BadRequestException`.
   * If an unexpected error occurs, throws an `InternalServerErrorException`.
   *
   * @param id The ID of the turno to update.
   * @param updateTurnoDto The data transfer object containing updated turno details.
   * @param res The response object.
   * @returns A JSON response with the updated turno and a 200 status code.
   * @throws {NotFoundException} - If the turno is not found.
   * @throws {BadRequestException} - If the update fails.
   * @throws {InternalServerErrorException} - If an unexpected error occurs.
   */
  async updateTurno(
    @Res() res: Response,
    @Param('id') id: number,
    @Body() updateTurnoDto: UpdateTurnoDto
  ) {
    try {
      const result = await this.turnoService.updateTurno(id, updateTurnoDto)
      return res.status(HttpStatus.OK).json({
        message: 'Turno actualizada correctamente',
        data: result
      })
    } catch (error) {
      if (error instanceof NotFoundException) {
        return res.status(HttpStatus.NOT_FOUND).json({
          message: error.message
        })
      }
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: 'Error al actualizar turno',
        error: error.message
      })
    }
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  /**
   * Deletes a turno by its ID.
   *
   * Finds a turno by its ID and deletes it.
   * If the turno is not found, throws a `NotFoundException`.
   * If the deletion fails, throws a `BadRequestException`.
   * If an unexpected error occurs, throws an `InternalServerErrorException`.
   *
   * @param id The ID of the turno to delete.
   * @param res The response object.
   * @returns A JSON response with the deleted turno and a 200 status code.
   * @throws {NotFoundException} - If the turno is not found.
   * @throws {BadRequestException} - If the deletion fails.
   * @throws {InternalServerErrorException} - If an unexpected error occurs.
   */
  async deleteTurno(@Res() res: Response, @Param('id') id: number) {
    try {
      const result = await this.turnoService.deleteTurno(id)
      return res.status(HttpStatus.OK).json({
        message: 'Turno eliminada correctamente',
        data: result
      })
    } catch (error) {
      if (error instanceof NotFoundException) {
        return res.status(HttpStatus.NOT_FOUND).json({
          message: error.message
        })
      }
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: 'Error al eliminar turno',
        error: error.message
      })
    }
  }
}
