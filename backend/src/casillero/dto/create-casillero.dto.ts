import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
  Matches
} from 'class-validator'

export class CreateCasilleroDto {
  @IsNotEmpty({ message: 'El id es requerido' })
  @IsNumber({}, { message: 'El id debe ser un número' })
  id: number

  @IsNotEmpty({ message: 'El propietario es requerido' })
  @IsString({ message: 'El propietario debe ser un texto' })
  propietario: string

  @IsNotEmpty({ message: 'El correo es requerido' })
  @IsEmail({}, { message: 'El correo debe ser un correo electrónico válido' })
  correo: string

  @IsNotEmpty({ message: 'El telefono es requerido' })
  @Matches(/^[0-9]{10}$/, {
    message: 'Se debe ingresar un numero de teléfono válido'
  })
  telefono: string

  @IsNotEmpty({ message: 'El registrado por es requerido' })
  @IsString({ message: 'El registrado por debe ser un texto' })
  registrado_por: string
}
