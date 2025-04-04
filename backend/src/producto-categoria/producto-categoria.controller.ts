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

@Controller('producto-categoria')
@UsePipes(new ValidationPipe({ transform: true }))
export class ProductoCategoriaController {
  constructor(
    private readonly productoCategoriaService: ProductoCategoriaService
  ) {}

  @Post()
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
  async findCategoriaById(@Res() res: Response, @Param('id') id: number) {
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
  @UseGuards(JwtAuthGuard, RolesGuard)
  async updateCategoria(
    @Res() res: Response,
    @Param('id') id: number,
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
  @UseGuards(JwtAuthGuard, RolesGuard)
  async deleteCategoria(@Res() res: Response, @Param('id') id: number) {
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
