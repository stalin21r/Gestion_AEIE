import { IsNotEmpty, IsString } from 'class-validator'

export class AuthDto {
  @IsString()
  @IsNotEmpty({ message: 'El usuario es requerido' })
  user: string

  @IsString()
  @IsNotEmpty({ message: 'La contraseña es requerida' })
  password: string
}
