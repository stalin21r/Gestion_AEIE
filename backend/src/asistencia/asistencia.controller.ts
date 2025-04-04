import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  HttpStatus,
  Res,
  UsePipes,
  ValidationPipe,
  BadRequestException,
  ForbiddenException,
  Query,
  NotFoundException
} from '@nestjs/common'
import { AsistenciaService } from './asistencia.service'
import { CreateAsistenciaDto } from './dto/create-asistencia.dto'
import { UpdateAsistenciaDto } from './dto/update-asistencia.dto'
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard'
import { CustomRequest } from 'src/auth/interfaces/CustomRequest.interface'
import { Response } from 'express'

@Controller('asistencia')
@UsePipes(new ValidationPipe({ transform: true }))
export class AsistenciaController {
  constructor(private readonly asistenciaService: AsistenciaService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  /**
   * Creates a new asistencia.
   *
   * Uses the provided `createAsistenciaDto` to create a new asistencia. Logs the user
   * information from the request. If successful, returns a JSON response with a
   * 201 status code and the created asistencia data. If a bad request error occurs,
   * such as the user not existing, returns a 400 status code with an appropriate
   * error message. If a forbidden error occurs, such as the user not having
   * permissions, returns a 403 status code with an appropriate error message. For
   * other errors, returns a 500 status code.
   *
   * @param res - The response object.
   * @param createAsistenciaDto - The data transfer object containing asistencia details.
   * @param req - The request object containing user information.
   * @returns A JSON response with the created asistencia and a 201 status code.
   * @throws {BadRequestException} - If the user does not exist or other validation errors.
   * @throws {ForbiddenException} - If the user does not have permissions to create asistencias.
   * @throws {InternalServerErrorException} - If an unexpected error occurs.
   */
  async createAsistencia(
    @Res() res: Response,
    @Body() createAsistenciaDto: CreateAsistenciaDto,
    @Req() req: CustomRequest
  ) {
    try {
      const result = await this.asistenciaService.createAsistencia(
        createAsistenciaDto,
        req.user.userId
      )
      return res.status(HttpStatus.CREATED).json({
        message: 'Asistencia registrada correctamente',
        data: result
      })
    } catch (error) {
      if (error instanceof BadRequestException) {
        return res.status(HttpStatus.BAD_REQUEST).json({
          message: error.message
        })
      }
      if (error instanceof ForbiddenException) {
        return res.status(HttpStatus.FORBIDDEN).json({
          message: error.message
        })
      }
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: 'Error al registrar asistencia',
        error: error.message
      })
    }
  }

  @Get()
  /**
   * Finds all asistencias.
   *
   * Finds all asistencias and returns them in a JSON response.
   * If no asistencias are found, throws a `NotFoundException`.
   * If an unexpected error occurs, throws an `InternalServerErrorException`.
   *
   * @param res The response object.
   * @param usuario The user ID to filter asistencias by. Optional.
   * @returns A JSON response with the found asistencias and a 200 status code.
   * @throws {NotFoundException} - If no asistencias are found.
   * @throws {InternalServerErrorException} - If an unexpected error occurs.
   */
  async findAllAsistencias(
    @Res() res: Response,
    @Query('usuario') usuario?: number
  ) {
    try {
      const result = await this.asistenciaService.findAllAsistencias(usuario)
      return res.status(HttpStatus.OK).json({
        message: 'Asistencias obtenidas correctamente',
        data: result
      })
    } catch (error) {
      if (error instanceof NotFoundException) {
        return res.status(HttpStatus.NOT_FOUND).json({
          message: error.message
        })
      }
      if (error.code === '23503') {
        return res.status(HttpStatus.BAD_REQUEST).json({
          message: 'Error al registrar turno: el usuario no existe.'
        })
      }
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: 'Error al obtener asistencias',
        error: error.message
      })
    }
  }

  @Get(':id')
  /**
   * Finds a asistencia by its ID.
   *
   * Finds a asistencia by its ID and returns the asistencia in a JSON response.
   * If no asistencia is found, throws a `NotFoundException`.
   * If an unexpected error occurs, throws an `InternalServerErrorException`.
   *
   * @param id The ID of the asistencia to find.
   * @param res The response object.
   * @returns A JSON response with the found asistencia and a 200 status code.
   * @throws {NotFoundException} - If no asistencia is found.
   * @throws {InternalServerErrorException} - If an unexpected error occurs.
   */
  async findAsistenciaById(@Res() res: Response, @Param('id') id: number) {
    try {
      const result = await this.asistenciaService.findAsistenciaById(id)
      return res.status(HttpStatus.OK).json({
        message: 'Asistencia obtenida correctamente',
        data: result
      })
    } catch (error) {
      if (error instanceof NotFoundException) {
        return res.status(HttpStatus.NOT_FOUND).json({
          message: error.message
        })
      }
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: 'Error al obtener asistencia',
        error: error.message
      })
    }
  }

  @Patch(':id')
  /**
   * Updates an asistencia by its ID.
   *
   * Finds an asistencia by its ID and updates its details using the provided `updateAsistenciaDto`.
   * If the asistencia is not found, throws a `NotFoundException`.
   * If an unexpected error occurs, throws an `InternalServerErrorException`.
   *
   * @param res The response object.
   * @param id The ID of the asistencia to update.
   * @param updateAsistenciaDto The data transfer object containing updated asistencia details.
   * @returns A JSON response with the updated asistencia and a 200 status code.
   * @throws {NotFoundException} - If the asistencia is not found.
   * @throws {InternalServerErrorException} - If an unexpected error occurs.
   */
  async updateAsistencia(
    @Res() res: Response,
    @Param('id') id: number,
    @Body() updateAsistenciaDto: UpdateAsistenciaDto
  ) {
    try {
      const result = await this.asistenciaService.updateAsistencia(
        id,
        updateAsistenciaDto
      )
      return res.status(HttpStatus.OK).json({
        message: 'Asistencia actualizada correctamente',
        data: result
      })
    } catch (error) {
      if (error instanceof NotFoundException) {
        return res.status(HttpStatus.NOT_FOUND).json({
          message: error.message
        })
      }
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: 'Error al actualizar asistencia',
        error: error.message
      })
    }
  }

  @Delete(':id')
  /**
   * Deletes an asistencia by its ID.
   *
   * Finds an asistencia by its ID and deletes it.
   * If the asistencia is not found, throws a `NotFoundException`.
   * If an unexpected error occurs, throws an `InternalServerErrorException`.
   *
   * @param res The response object.
   * @param id The ID of the asistencia to delete.
   * @returns A JSON response with the deleted asistencia and a 200 status code.
   * @throws {NotFoundException} - If the asistencia is not found.
   * @throws {InternalServerErrorException} - If an unexpected error occurs.
   */
  async deleteAsistencia(@Res() res: Response, @Param('id') id: number) {
    try {
      const result = await this.asistenciaService.deleteAsistencia(id)
      return res.status(HttpStatus.OK).json({
        message: 'Asistencia eliminada correctamente',
        data: result
      })
    } catch (error) {
      if (error instanceof NotFoundException) {
        return res.status(HttpStatus.NOT_FOUND).json({
          message: error.message
        })
      }
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: 'Error al eliminar asistencia',
        error: error.message
      })
    }
  }
}
