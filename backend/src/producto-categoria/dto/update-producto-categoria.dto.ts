import { PartialType } from '@nestjs/mapped-types'
import { CreateProductoCategoriaDto } from './create-producto-categoria.dto'
import { IsNotEmpty, IsUUID } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class UpdateProductoCategoriaDto extends PartialType(
  CreateProductoCategoriaDto
) {
  @ApiProperty({
    description: 'ID de la categoria (UUID v4)',
    example: '550e8400-e29b-41d4-a716-446655440000',
    required: true
  })
  @IsNotEmpty({ message: 'El id es requerido' })
  @IsUUID('4', { message: 'El id debe ser un UUID v4' })
  id: string
}
