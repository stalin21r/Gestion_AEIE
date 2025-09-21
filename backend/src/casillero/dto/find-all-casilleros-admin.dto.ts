import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Matches
} from 'class-validator'

export class FindAllCasillerosAdminDto {
  @IsOptional()
  @IsString()
  search?: string

  @IsOptional()
  @IsBoolean()
  ocupado?: boolean

  @IsOptional()
  @IsString()
  @Matches(/^[A-Za-z]+$/, {
    message: 'La letra del bloque debe ser un texto que contenga solo letras'
  })
  letraBloque?: string

  @IsOptional()
  @IsNumber()
  numeroCasillero?: number

  @IsNumber()
  @IsNotEmpty()
  page: number

  @IsNumber()
  @IsNotEmpty()
  limit: number
}
