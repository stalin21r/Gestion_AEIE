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
  Res,
  HttpStatus,
  BadRequestException,
  NotFoundException,
  UseGuards
} from '@nestjs/common'
import { ProductoCategoriaService } from './producto-categoria.service'
import { CreateProductoCategoriaDto } from './dto/create-producto-categoria.dto'
import { UpdateProductoCategoriaDto } from './dto/update-producto-categoria.dto'
import { Response } from 'express'
import { RolesGuard } from '../auth/guards/roles.guard'
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard'
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody
} from '@nestjs/swagger'

@ApiTags('producto-categoria')
@Controller('producto-categoria')
@UsePipes(new ValidationPipe({ transform: true }))
export class ProductoCategoriaController {
  constructor(
    private readonly productoCategoriaService: ProductoCategoriaService
  ) {}

  @Post()
  @ApiOperation({ summary: 'Crear una nueva categoría de producto' })
  @ApiBody({ type: CreateProductoCategoriaDto })
  @ApiResponse({ status: 201, description: 'Categoría creada correctamente.' })
  @ApiResponse({ status: 400, description: 'Datos inválidos.' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  async createCategoria(
    @Res() res: Response,
    @Body() createProductoCategoriaDto: CreateProductoCategoriaDto
  ) {
    try {
      const result = await this.productoCategoriaService.createCategoria(
        createProductoCategoriaDto
      )
      return res.status(HttpStatus.CREATED).json({
        message: 'Categoría creada correctamente',
        data: result
      })
    } catch (error) {
      if (error instanceof BadRequestException) {
        return res.status(HttpStatus.BAD_REQUEST).json({
          message: error.message
        })
      }
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: 'Error al crear categoría',
        error: error.message
      })
    }
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todas las categorías de producto' })
  @ApiResponse({
    status: 200,
    description: 'Categorias obtenidas correctamente.'
  })
  @ApiResponse({ status: 404, description: 'No se encontraron categorías.' })
  async findAllCategorias(@Res() res: Response) {
    try {
      const result = await this.productoCategoriaService.findAllCategorias()
      return res.status(HttpStatus.OK).json({
        message: 'Categorias obtenidas correctamente',
        data: result
      })
    } catch (error) {
      if (error instanceof NotFoundException) {
        return res.status(HttpStatus.NOT_FOUND).json({
          message: error.message
        })
      }
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: 'Error al obtener categorias',
        error: error.message
      })
    }
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener una categoría de producto por ID' })
  @ApiParam({ name: 'id', type: String })
  @ApiResponse({
    status: 200,
    description: 'Categoría obtenida correctamente.'
  })
  @ApiResponse({ status: 404, description: 'Categoría no encontrada.' })
  async findCategoriaById(@Res() res: Response, @Param('id') id: string) {
    try {
      const result = await this.productoCategoriaService.findCategoriaById(id)
      return res.status(HttpStatus.OK).json({
        message: 'Categoría obtenida correctamente',
        data: result
      })
    } catch (error) {
      if (error instanceof NotFoundException) {
        return res.status(HttpStatus.NOT_FOUND).json({
          message: error.message
        })
      }
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: 'Error al obtener categoría',
        error: error.message
      })
    }
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar una categoría de producto' })
  @ApiParam({ name: 'id', type: String })
  @ApiBody({ type: UpdateProductoCategoriaDto })
  @ApiResponse({
    status: 200,
    description: 'Categoría actualizada correctamente.'
  })
  @ApiResponse({ status: 404, description: 'Categoría no encontrada.' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  async updateCategoria(
    @Res() res: Response,
    @Param('id') id: string,
    @Body() updateProductoCategoriaDto: UpdateProductoCategoriaDto
  ) {
    try {
      const result = await this.productoCategoriaService.updateCategoria(
        id,
        updateProductoCategoriaDto
      )
      return res.status(HttpStatus.OK).json({
        message: 'Categoría actualizada correctamente',
        data: result
      })
    } catch (error) {
      if (error instanceof NotFoundException) {
        return res.status(HttpStatus.NOT_FOUND).json({
          message: error.message
        })
      }
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: 'Error al actualizar categoría',
        error: error.message
      })
    }
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar una categoría de producto' })
  @ApiParam({ name: 'id', type: String })
  @ApiResponse({
    status: 200,
    description: 'Categoría eliminada correctamente.'
  })
  @ApiResponse({ status: 404, description: 'Categoría no encontrada.' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  async deleteCategoria(@Res() res: Response, @Param('id') id: string) {
    try {
      const result = await this.productoCategoriaService.deleteCategoria(id)
      return res.status(HttpStatus.OK).json({
        message: 'Categoría eliminada correctamente',
        data: result
      })
    } catch (error) {
      if (error instanceof NotFoundException) {
        return res.status(HttpStatus.NOT_FOUND).json({
          message: error.message
        })
      }
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: 'Error al eliminar categoría',
        error: error.message
      })
    }
  }
}
