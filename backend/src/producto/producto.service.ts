import {
  BadRequestException,
  Injectable,
  NotFoundException
} from '@nestjs/common'
import { CreateProductoDto } from './dto/create-producto.dto'
import { UpdateProductoDto } from './dto/update-producto.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { Producto } from './entities/producto.entity'
import { ImgurService } from '../imgur/imgur.service'
import { Repository } from 'typeorm'
import { Express } from 'express'

@Injectable()
export class ProductoService {
  constructor(
    @InjectRepository(Producto)
    private readonly productoRepository: Repository<Producto>,
    private readonly imgurService: ImgurService
  ) {}

  public async createProducto(
    createProductoDto: CreateProductoDto,
    imagen?: Express.Multer.File
  ) {
    try {
      let imageUrl: string | undefined = undefined
      let delete_hash: string | undefined = undefined

      if (imagen) {
        try {
          const uploadResult = await this.imgurService.uploadImage(
            imagen,
            createProductoDto.nombre
          )
          imageUrl = uploadResult.link
          delete_hash = uploadResult.deletehash
        } catch (error) {
          console.error(
            'Error al subir la imagen. Se creara el producto sin imagen:',
            error
          )
          // No lanzamos excepción, continuamos sin imagen
        }
      }

      const producto = this.productoRepository.create({
        nombre: createProductoDto.nombre,
        precio: createProductoDto.precio,
        categoria: { id: createProductoDto.categoria },
        imagen: imageUrl,
        delete_hash: delete_hash
      })
      if (!producto) {
        throw new BadRequestException('No se pudo crear el producto')
      }
      const data = await this.productoRepository.save(producto)
      if (!data) {
        throw new BadRequestException('No se pudo crear el producto')
      }
      return data
    } catch (error) {
      console.error('Error in ProductoService.createProducto:', error)
      throw error
    }
  }

  public async findAllProductos() {
    const filter: any = {
      relations: ['categoria'],
      order: { id: 'ASC' }
    }
    const result = await this.productoRepository.find(filter)
    if (!result || result.length === 0) {
      throw new NotFoundException('No se encontraron productos')
    }
    return result
  }

  public async findProductoById(id: number) {
    const result = await this.productoRepository.findOneBy({ id })
    if (!result) {
      throw new NotFoundException('No se encontró el producto')
    }
    return result
  }

  public async updateProducto(
    id: number,
    updateProductoDto: UpdateProductoDto,
    imagen?: Express.Multer.File
  ) {
    const producto = await this.productoRepository.findOneBy({ id })
    if (!producto) {
      throw new NotFoundException('No se encontró el producto')
    }
    let imageUrl: string | undefined = undefined
    let delete_hash: string | undefined = undefined
    if (imagen) {
      try {
        const uploadResult = await this.imgurService.uploadImage(
          imagen,
          updateProductoDto.nombre || producto.nombre // Usar el nombre actualizado o el existente
        )
        imageUrl = uploadResult.link
        delete_hash = uploadResult.deletehash
        if (producto.delete_hash) {
          try {
            await this.imgurService.deleteImage(producto.delete_hash)
          } catch (error) {
            console.error('Error al borrar la imagen anterior:', error)
          }
        }
      } catch (error) {
        console.error('Error al subir la nueva imagen:', error)
      }
    }
    const updateData: any = { ...updateProductoDto }
    if (imageUrl && delete_hash) {
      updateData.imagen = imageUrl
      updateData.delete_hash = delete_hash
    }
    const result = await this.productoRepository.update(id, updateData)
    if (!result.affected) {
      throw new NotFoundException('No se pudo actualizar el producto')
    }
    const productoActualizado = await this.productoRepository.findOneBy({ id })
    return productoActualizado
  }

  public async deleteProducto(id: number) {
    const producto = await this.productoRepository.findOneBy({ id })
    if (!producto) {
      throw new NotFoundException('No se encontró el producto')
    }
    const deleteHash = producto.delete_hash
    const result = await this.productoRepository.delete(id)
    if (!result.affected) {
      throw new NotFoundException('No se pudo eliminar el producto')
    }
    if (deleteHash) {
      try {
        await this.imgurService.deleteImage(deleteHash)
      } catch (error) {
        console.error('Error al eliminar la imagen del producto:', error)
      }
    }
    return {
      message: 'Producto eliminado correctamente',
      id: id
    }
  }
}
