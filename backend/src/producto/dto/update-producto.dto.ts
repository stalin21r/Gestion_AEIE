import {
  IsOptional,
  IsNumber,
  IsPositive,
  IsString,
  MaxLength,
  IsUUID
} from 'class-validator'
import { Type } from 'class-transformer'
import { ApiPropertyOptional } from '@nestjs/swagger'

export class UpdateProductoDto {
  @ApiPropertyOptional({
    description: 'Nombre del producto',
    maxLength: 50,
    type: String,
    example: 'Laptop'
  })
  @IsString({ message: 'El nombre debe ser un texto' })
  @IsOptional()
  @MaxLength(50, { message: 'El nombre debe tener máximo 50 caracteres' })
  nombre?: string

  @ApiPropertyOptional({
    description: 'Precio del producto',
    type: Number,
    example: 999.99,
    minimum: 0
  })
  @IsNumber({}, { message: 'El precio debe ser un número positivo' })
  @IsPositive({ message: 'El precio debe ser un número positivo' })
  @IsOptional()
  @Type(() => Number)
  precio?: number

  @ApiPropertyOptional({
    description: 'UUID v4 de la categoría',
    type: String,
    example: 'a3f1c2e4-5b6d-7e8f-9a0b-1c2d3e4f5a6b'
  })
  @IsUUID('4', { message: 'La categoria debe ser un UUID v4' })
  @IsOptional()
  categoria?: string
}
