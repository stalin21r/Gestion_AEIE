import {
  BadRequestException,
  Injectable,
  NotFoundException
} from '@nestjs/common'
import { CreateProductoCategoriaDto } from './dto/create-producto-categoria.dto'
import { UpdateProductoCategoriaDto } from './dto/update-producto-categoria.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { ProductoCategoria } from './entities/producto-categoria.entity'

@Injectable()
export class ProductoCategoriaService {
  constructor(
    @InjectRepository(ProductoCategoria)
    private readonly productoCategoriaRepository: Repository<ProductoCategoria>
  ) {}

  public async createCategoria(
    createProductoCategoriaDto: CreateProductoCategoriaDto
  ) {
    const categoria = this.productoCategoriaRepository.create(
      createProductoCategoriaDto
    )
    if (!categoria) {
      return new BadRequestException('No se pudo crear la categoría')
    }
    const result = await this.productoCategoriaRepository.save(categoria)
    if (!result || result.id === null) {
      return new BadRequestException('No se pudo crear la categoría')
    }
    return result
  }

  public async findAllCategorias() {
    const result = await this.productoCategoriaRepository.find()
    if (!result || result.length === 0) {
      throw new NotFoundException('No se encontraron categorías')
    }
    return result
  }

  public async findCategoriaById(id: number) {
    const result = await this.productoCategoriaRepository.findOneBy({ id })
    if (!result) {
      throw new NotFoundException('No se encontró la categoría')
    }
    return result
  }

  public async updateCategoria(
    id: number,
    updateProductoCategoriaDto: UpdateProductoCategoriaDto
  ) {
    const result = await this.productoCategoriaRepository.update(
      { id: id },
      updateProductoCategoriaDto
    )
    if (!result.affected) {
      throw new NotFoundException('No se encontró la categoría')
    }
    return result
  }

  public async deleteCategoria(id: number) {
    const result = await this.productoCategoriaRepository.delete(id)
    if (!result.affected) {
      throw new NotFoundException('No se encontró la categoría')
    }
    return result
  }
}
