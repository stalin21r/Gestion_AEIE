import { IsOptional, IsString, IsNumber, IsUUID, Min } from 'class-validator'
import { Transform } from 'class-transformer'
import { ApiProperty } from '@nestjs/swagger'

export class FindProductsDto {
  @ApiProperty({
    description: 'Texto a buscar en el nombre del producto',
    example: 'Producto1',
    required: false
  })
  @IsOptional()
  @IsString({ message: 'La búsqueda debe ser un texto' })
  search?: string

  @ApiProperty({
    description: 'ID de la categoría del producto (UUID v4)',
    example: '550e8400-e29b-41d4-a716-446655440000',
    required: false
  })
  @IsOptional()
  @IsUUID('4', { message: 'El id debe ser un UUID v4' })
  categoria?: string

  @ApiProperty({
    description: 'Número de página para la paginación',
    example: 1,
    required: false
  })
  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  @IsNumber({}, { message: 'La página debe ser un número' })
  @Min(1, { message: 'La página debe ser al menos 1' })
  page?: number = 1

  @ApiProperty({
    description: 'Cantidad de elementos por página',
    example: 10,
    required: false
  })
  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  @IsNumber({}, { message: 'El límite debe ser un número' })
  @Min(1, { message: 'El límite debe ser al menos 1' })
  limit?: number = 10
}
