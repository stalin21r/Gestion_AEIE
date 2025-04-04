import {
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  MaxLength
} from 'class-validator'
import { Type } from 'class-transformer'

export class CreateProductoDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  nombre: string

  @IsNumber()
  @IsPositive()
  @Type(() => Number)
  precio: number

  @IsNumber()
  @IsNotEmpty()
  @Type(() => Number)
  categoria: number
}
