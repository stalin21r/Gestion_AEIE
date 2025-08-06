import { IsOptional, IsString, IsNumber } from 'class-validator'
import { Transform } from 'class-transformer'

export class FindProductsDto {
  @IsOptional()
  @IsString()
  search?: string

  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  categoria?: Number

  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  page?: number = 1

  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  limit?: number = 10
}
