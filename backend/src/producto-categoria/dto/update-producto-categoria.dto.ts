import { PartialType } from '@nestjs/mapped-types'
import { CreateProductoCategoriaDto } from './create-producto-categoria.dto'
import { IsNotEmpty } from 'class-validator'

export class UpdateProductoCategoriaDto extends PartialType(
  CreateProductoCategoriaDto
) {
  @IsNotEmpty({ message: 'El id es requerido' })
  id: number
}
