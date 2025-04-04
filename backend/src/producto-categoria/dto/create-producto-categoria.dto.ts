import { IsEmpty, IsNotEmpty, IsString } from 'class-validator'

export class CreateProductoCategoriaDto {
  @IsEmpty()
  id: number

  @IsNotEmpty({ message: 'La categoria es requerida' })
  @IsString({ message: 'La categoria debe ser un texto' })
  catergoria: string
}
