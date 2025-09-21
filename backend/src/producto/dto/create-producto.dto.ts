import {
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  IsUUID,
  MaxLength
} from 'class-validator'
import { Type } from 'class-transformer'
import { ApiProperty } from '@nestjs/swagger'

export class CreateProductoDto {
  @ApiProperty({
    example: 'Producto1',
    description: 'Nombre del producto',
    required: true,
    maxLength: 50
  })
  @IsString({ message: 'El nombre debe ser un texto' })
  @IsNotEmpty({ message: 'El nombre es requerido' })
  @MaxLength(50, { message: 'El nombre debe tener máximo 50 caracteres' })
  nombre: string

  @ApiProperty({
    example: 10.99,
    description: 'Precio del producto',
    required: true
  })
  @IsNumber({}, { message: 'El precio debe ser un número positivo' })
  @IsPositive({ message: 'El precio debe ser un número positivo' })
  @Type(() => Number)
  precio: number

  @ApiProperty({
    example: '550e8400-e29b-41d4-a716-446655440000',
    description: 'ID de la categoria (UUID v4)',
    required: true
  })
  @IsNotEmpty({ message: 'El id es requerido' })
  @IsUUID('4', { message: 'El id debe ser un UUID v4' })
  categoriaId: string
}
