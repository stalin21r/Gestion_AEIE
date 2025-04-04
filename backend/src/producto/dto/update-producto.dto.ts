import {
  IsOptional,
  IsNumber,
  IsPositive,
  IsString,
  MaxLength
} from 'class-validator'
import { Type } from 'class-transformer'

export class UpdateProductoDto {
  @IsString()
  @IsOptional()
  @MaxLength(50)
  nombre?: string

  @IsNumber()
  @IsPositive()
  @IsOptional()
  @Type(() => Number)
  precio?: number

  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  categoria?: number
}
