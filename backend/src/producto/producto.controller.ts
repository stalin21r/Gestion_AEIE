import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  UsePipes,
  ValidationPipe,
  UseInterceptors,
  UploadedFile,
  Res,
  HttpStatus,
  BadRequestException,
  NotFoundException,
  UseGuards,
  Query
} from '@nestjs/common'
import { ProductoService } from './producto.service'
import { CreateProductoDto } from './dto/create-producto.dto'
import { UpdateProductoDto } from './dto/update-producto.dto'
import { FileInterceptor } from '@nestjs/platform-express'
import { Response } from 'express'
import { ImageValidationPipe } from './pipes/image-validation.pipe'
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard'
import { FindProductsDto } from './dto/find-products.dto'

@Controller('producto')
@UsePipes(new ValidationPipe({ transform: true }))
export class ProductoController {
  constructor(private readonly productoService: ProductoService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('imagen'))
  async createProducto(
    @Res() res: Response,
    @Body() createProductoDto: CreateProductoDto,
    @UploadedFile(new ImageValidationPipe()) imagen?: Express.Multer.File
  ) {
    try {
      const result = await this.productoService.createProducto(
        createProductoDto,
        imagen
      )
      return res.status(HttpStatus.CREATED).json({
        message: 'Producto creado correctamente',
        data: result
      })
    } catch (error) {
      if (error instanceof BadRequestException) {
        return res.status(HttpStatus.BAD_REQUEST).json({
          message: error.message
        })
      }
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: 'Error al crear producto',
        error: error.message
      })
    }
  }

  @Get()
  async findAllProductos(
    @Query() query: FindProductsDto,
    @Res() res: Response
  ) {
    try {
      const result = await this.productoService.findAllProductos(query)
      return res.status(HttpStatus.OK).json({
        message: 'Productos obtenidos correctamente',
        data: result
      })
    } catch (error) {
      if (error instanceof NotFoundException) {
        return res.status(HttpStatus.NOT_FOUND).json({
          message: error.message
        })
      }
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: 'Error al obtener productos',
        error: error.message
      })
    }
  }

  @Get(':id')
  async findProductoById(@Res() res: Response, @Param('id') id: string) {
    try {
      const result = await this.productoService.findProductoById(+id)
      return res.status(HttpStatus.OK).json({
        message: 'Producto obtenido correctamente',
        data: result
      })
    } catch (error) {
      if (error instanceof NotFoundException) {
        return res.status(HttpStatus.NOT_FOUND).json({
          message: error.message
        })
      }
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: 'Error al obtener producto',
        error: error.message
      })
    }
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('imagen'))
  async updateProducto(
    @Res() res: Response,
    @Param('id') id: string,
    @Body() updateProductoDto: UpdateProductoDto,
    @UploadedFile(new ImageValidationPipe()) imagen?: Express.Multer.File
  ) {
    try {
      const result = await this.productoService.updateProducto(
        +id,
        updateProductoDto,
        imagen
      )
      return res.status(HttpStatus.OK).json({
        message: 'Producto actualizado correctamente',
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
        message: 'Error al actualizar producto',
        error: error.message
      })
    }
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async deleteProducto(@Res() res: Response, @Param('id') id: string) {
    try {
      const result = await this.productoService.deleteProducto(+id)
      return res.status(HttpStatus.OK).json({
        message: 'Producto eliminado correctamente',
        data: result
      })
    } catch (error) {
      if (error instanceof NotFoundException) {
        return res.status(HttpStatus.NOT_FOUND).json({
          message: error.message
        })
      }
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: 'Error al eliminar producto',
        error: error.message
      })
    }
  }
}
