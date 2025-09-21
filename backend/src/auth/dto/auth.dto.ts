import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString } from 'class-validator'

export class AuthDto {
  @ApiProperty({
    description: 'Usuario',
    example: 'juan',
    required: true
  })
  @IsString()
  @IsNotEmpty({ message: 'El usuario es requerido' })
  user: string

  @ApiProperty({
    description: 'Contraseña',
    example: 'P@ssw0rd!',
    required: true
  })
  @IsString()
  @IsNotEmpty({ message: 'La contraseña es requerida' })
  password: string
}
