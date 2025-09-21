import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsNotEmpty, IsString, Matches, IsUUID } from 'class-validator'

export class CreateUsuarioDto {
  @ApiProperty({
    example: 'Juan',
    description: 'Nombre del usuario'
  })
  @IsString({ message: 'El nombre debe ser un texto' })
  @IsNotEmpty({ message: 'El nombre es requerido' })
  nombre: string

  @ApiProperty({
    example: 'Pérez',
    description: 'Apellido del usuario'
  })
  @IsString({ message: 'El apellido debe ser un texto' })
  @IsNotEmpty({ message: 'El apellido es requerido' })
  apellido: string

  @ApiProperty({
    example: 'juan.perez@example.com',
    description: 'Correo electrónico del usuario'
  })
  @IsEmail({}, { message: 'El correo debe ser un correo electrónico válido' })
  @IsNotEmpty({ message: 'El correo es requerido' })
  correo: string

  @ApiProperty({
    example: 'P@ssw0rd!',
    description:
      'Contraseña del usuario (mínimo 8 caracteres, incluyendo mayúsculas, minúsculas, números y un carácter especial)'
  })
  @IsString({ message: 'La contraseña debe ser un texto' })
  @IsNotEmpty({ message: 'La contraseña es requerida' })
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    {
      message:
        'La contraseña debe tener al menos 8 caracteres, una letra mayúscula, una letra minúscula, un número y un carácter especial'
    }
  )
  contrasena: string

  @ApiProperty({
    example: 'juanperez',
    description: 'Nombre de usuario único'
  })
  @IsString({ message: 'El usuario debe ser un texto' })
  @IsNotEmpty({ message: 'El usuario es requerido' })
  usuario: string

  @ApiProperty({
    example: '550e8400-e29b-41d4-a716-446655440000',
    description: 'UUID del rol asignado al usuario'
  })
  @IsUUID('4', { message: 'El rolId debe ser un UUID válido' })
  @IsNotEmpty({ message: 'El rol es requerido' })
  rolId: string
}
