import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  BadRequestException,
  HttpStatus,
  NotFoundException,
  Query,
  Put,
  UsePipes,
  ValidationPipe,
  UseInterceptors,
  UploadedFile,
  UseGuards
} from '@nestjs/common'
import { CasilleroService } from './casillero.service'
import { UpdateCasilleroDto } from './dto/update-casillero.dto'
import { Response } from 'express'
import { FileInterceptor } from '@nestjs/platform-express'
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard'
import { RolesGuard } from '../auth/guards/roles.guard'

@UsePipes(new ValidationPipe({ transform: true }))
@Controller('casillero')
export class CasilleroController {
  constructor(private readonly casilleroService: CasilleroService) {}

  @Post('bloque')
  @UseGuards(JwtAuthGuard, RolesGuard)
  /**
   * Crea un bloque de casilleros con su respectiva letra.
   *
   * Recibe un parámetro `mode` que indica si se crearan los casilleros en el
   * bloque. Si `mode` es `true`, se crea el bloque con numeración horizontal.
   * Si `mode` es `false`, se crea el bloque con numeración vertical.
   *
   * @param mode Un booleano que indica como se crean los bloques de casilleros
   *
   * @returns Un objeto con una propiedad `message` que contiene un mensaje de
   * confirmacion y una propiedad `data` que contiene el id del bloque recien
   * creado.
   */
  async createBloque(@Body('mode') mode: boolean, @Res() res: Response) {
    try {
      const result = await this.casilleroService.createBloque(mode)
      return res.status(HttpStatus.CREATED).json({
        message: 'Bloque creado correctamente',
        data: result
      })
    } catch (error) {
      if (error instanceof BadRequestException) {
        return res.status(HttpStatus.BAD_REQUEST).json({
          message: error.message
        })
      }
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: 'Error al crear el bloque',
        error: error.message
      })
    }
  }

  @Get()
  /**
   * Obtiene todos los casilleros, con opción de filtrar por letra de bloque.
   *
   * Consulta el servicio para obtener todos los casilleros, pudiendo filtrar
   * por la letra del bloque a través del parámetro `letra`.
   *
   * @param res - El objeto de respuesta de Express.
   * @param letra - (Opcional) La letra del bloque de casilleros para filtrar.
   * @returns Un objeto JSON con un mensaje de éxito y la lista de casilleros.
   * @throws {NotFoundException} - Si no se encuentran casilleros.
   * @throws {InternalServerErrorException} - Si ocurre un error inesperado
   * al obtener los casilleros.
   */
  async findAllCasilleros(
    @Res() res: Response,
    @Query('letra') letra?: string
  ) {
    try {
      const result = await this.casilleroService.findAllCasilleros(letra)
      return res.status(HttpStatus.OK).json({
        message: 'Casilleros encontrados correctamente',
        data: result
      })
    } catch (error) {
      if (error instanceof NotFoundException) {
        return res.status(HttpStatus.NOT_FOUND).json({
          message: error.message
        })
      }
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: 'Error al obtener los casilleros',
        error: error.message
      })
    }
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('comprobante'))
  /**
   * Registra o actualiza un casillero con el identificador proporcionado.
   *
   * Consulta el servicio para asignar o actualizar los datos del casillero
   * especificado por el `id` utilizando la información del `updateCasilleroDto`.
   *
   * @param res - El objeto de respuesta de Express.
   * @param id - El identificador del casillero a registrar o actualizar.
   * @param updateCasilleroDto - Los datos a actualizar en el casillero.
   *
   * @returns Un objeto JSON con un mensaje de éxito y los datos del
   * casillero registrado o actualizado.
   *
   * @throws {NotFoundException} - Si no se encuentra el casillero.
   * @throws {BadRequestException} - Si la solicitud es inválida o no se
   * puede registrar el casillero.
   * @throws {InternalServerErrorException} - Si ocurre un error inesperado.
   */
  async registerCasillero(
    @Res() res: Response,
    @Param('id') id: number,
    @Body() updateCasilleroDto: UpdateCasilleroDto,
    @UploadedFile() comprobante?: Express.Multer.File
  ) {
    try {
      const result = await this.casilleroService.registerCasillero(
        id,
        updateCasilleroDto,
        comprobante
      )
      return res.status(HttpStatus.OK).json({
        message: result.message,
        data: result.result
      })
    } catch (error) {
      if (error instanceof NotFoundException) {
        return res.status(HttpStatus.NOT_FOUND).json({
          message: error.message
        })
      }
      if (error instanceof BadRequestException) {
        return res.status(HttpStatus.BAD_REQUEST).json({
          message: error.message
        })
      }
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: 'Error al actualizar el casillero',
        error: error.message
      })
    }
  }

  @Put('clear/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  /**
   * Limpia un casillero.
   *
   * Consulta el servicio para limpiar un casillero con el identificador
   * proporcionado.
   *
   * @param res - El objeto de respuesta de Express.
   * @param id - El identificador del casillero a limpiar.
   * @param registrado_por - La persona que realiza la acción de limpiar el
   * casillero.
   * @returns Un objeto JSON con un mensaje de éxito y los datos del
   * casillero limpiado.
   * @throws {NotFoundException} - Si no se encuentra el casillero.
   * @throws {BadRequestException} - Si la solicitud es inválida.
   * @throws {InternalServerErrorException} - Si ocurre un error inesperado.
   */
  async clearCasillero(
    @Res() res: Response,
    @Param('id') id: number,
    @Body('registrado_por') registrado_por: string
  ) {
    try {
      const result = await this.casilleroService.clearCasillero(
        id,
        registrado_por
      )
      return res.status(HttpStatus.OK).json({
        message: 'Casillero limpiado correctamente',
        data: result
      })
    } catch (error) {
      if (error instanceof NotFoundException) {
        return res.status(HttpStatus.NOT_FOUND).json({
          message: error.message
        })
      }
      if (error instanceof BadRequestException) {
        return res.status(HttpStatus.BAD_REQUEST).json({
          message: error.message
        })
      }
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: 'Error al limpiar el casillero',
        error: error.message
      })
    }
  }

  @Put('clearbloque')
  @UseGuards(JwtAuthGuard, RolesGuard)
  /**
   * Limpia un bloque de casilleros.
   *
   * Consulta el servicio para limpiar el bloque de casilleros con la letra
   * proporcionada.
   *
   * @param res - El objeto de respuesta de Express.
   * @param letra - La letra del bloque de casilleros a limpiar.
   * @param registrado_por - La persona que realiz la acci n de limpiar el
   * bloque.
   * @returns Un objeto JSON con un mensaje de  xito y los datos del bloque
   * limpiado.
   * @throws {NotFoundException} - Si no se encuentra el bloque de casilleros.
   * @throws {InternalServerErrorException} - Si ocurre un error inesperado.
   */
  async clearBloque(
    @Res() res: Response,
    @Body('letra') letra: string,
    @Body('registrado_por') registrado_por: string
  ) {
    try {
      const result = await this.casilleroService.clearBloque(
        letra,
        registrado_por
      )
      return res.status(HttpStatus.OK).json({
        message: 'Bloque limpiado correctamente',
        data: result
      })
    } catch (error) {
      if (error instanceof NotFoundException) {
        return res.status(HttpStatus.NOT_FOUND).json({
          message: error.message
        })
      }
      if (error instanceof BadRequestException) {
        return res.status(HttpStatus.BAD_REQUEST).json({
          message: error.message
        })
      }
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: 'Error al limpiar el bloque',
        error: error.message
      })
    }
  }

  @Get('letras')
  /**
   * Obtiene todas las letras de los bloques de casilleros.
   *
   * Consulta el servicio para obtener todas las letras de los bloques de casilleros.
   *
   * @param res - El objeto de respuesta de Express.
   * @returns Un objeto JSON con un mensaje de éxito y las letras de los bloques.
   * @throws {InternalServerErrorException} - Si ocurre un error inesperado al obtener las letras.
   */
  async findAllLetras(@Res() res: Response) {
    try {
      const result = await this.casilleroService.findAllLetras()
      return res.status(HttpStatus.OK).json({
        message: 'Letras encontradas correctamente',
        data: result
      })
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: 'Error al obtener las letras',
        error: error.message
      })
    }
  }

  @Delete('bloque/:letra')
  @UseGuards(JwtAuthGuard, RolesGuard)
  /**
   * Elimina un bloque de casilleros.
   *
   * Consulta el servicio para eliminar el bloque de casilleros con la letra
   * proporcionada.
   *
   * @param res - El objeto de respuesta de Express.
   * @param letra - La letra del bloque de casilleros a eliminar.
   * @returns Un objeto JSON con un mensaje de éxito y los datos del bloque
   * eliminado.
   * @throws {NotFoundException} - Si no se encuentra el bloque de casilleros.
   * @throws {InternalServerErrorException} - Si ocurre un error inesperado.
   */
  async deleteBloque(@Res() res: Response, @Param('letra') letra: string) {
    try {
      const result = await this.casilleroService.deleteBloque(letra)
      return res.status(HttpStatus.OK).json({
        message: 'Bloque eliminado correctamente',
        data: result
      })
    } catch (error) {
      if (error instanceof NotFoundException) {
        return res.status(HttpStatus.NOT_FOUND).json({
          message: error.message
        })
      }
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: 'Error al eliminar el bloque',
        error: error.message
      })
    }
  }

  @Get('ocupacion')
  @UseGuards(JwtAuthGuard, RolesGuard)
  /**
   * Obtiene la ocupación de los casilleros.
   *
   * Consulta el servicio para obtener el estado de ocupación de los casilleros,
   * devolviendo el número de casilleros ocupados y libres por bloque.
   *
   * @param res - El objeto de respuesta de Express.
   * @returns Un objeto JSON con un mensaje de éxito y los datos de ocupación.
   * @throws {NotFoundException} - Si no se encuentran datos de ocupación.
   * @throws {InternalServerErrorException} - Si ocurre un error inesperado.
   */
  async getOccupancy(@Res() res: Response) {
    try {
      const result = await this.casilleroService.getOccupancy()
      return res.status(HttpStatus.OK).json({
        message: 'Ocupación obtenida correctamente',
        data: result
      })
    } catch (error) {
      if (error instanceof NotFoundException) {
        return res.status(HttpStatus.NOT_FOUND).json({
          message: error.message
        })
      }
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: 'Error al obtener la ocupación',
        error: error.message
      })
    }
  }
}
