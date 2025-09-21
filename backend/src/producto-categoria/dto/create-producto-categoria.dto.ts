import { IsEmpty, IsNotEmpty, IsString, IsUUID } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class CreateProductoCategoriaDto {
  @ApiProperty({
    description: 'ID de la categoria (UUID v4)',
    example: '550e8400-e29b-41d4-a716-446655440000',
    required: false
  })
  @IsEmpty()
  @IsUUID('4', { message: 'El id debe ser un UUID v4' })
  id: string

  @ApiProperty({
    description: 'Categoria del producto',
    example: 'Alimentos',
    required: true
  })
  @IsNotEmpty({ message: 'La categoria es requerida' })
  @IsString({ message: 'La categoria debe ser un texto' })
  catergoria: string
}
