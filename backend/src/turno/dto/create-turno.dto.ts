import {
  IsInt,
  IsNotEmpty,
  IsString,
  IsUUID,
  Matches,
  Max,
  Min
} from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class CreateTurnoDto {
  @ApiProperty({
    description: 'ID del usuario al que pertenece el turno (UUID v4)',
    example: '550e8400-e29b-41d4-a716-446655440000',
    type: String
  })
  @IsNotEmpty({ message: 'El usuario es requerido' })
  @IsUUID(4, { message: 'El usuario debe ser un UUID v4' })
  usuarioId: string

  @ApiProperty({
    description: 'Día de la semana (1 = Lunes, 5 = Viernes)',
    example: 3,
    minimum: 1,
    maximum: 5,
    type: Number
  })
  @IsNotEmpty({ message: 'El dia es requerido' })
  @IsInt({ message: 'El dia debe ser un número entero' })
  @Min(1, { message: 'El dia debe ser al menos 1' })
  @Max(5, { message: 'El dia debe ser máximo 5' })
  dia: number

  @ApiProperty({
    description: 'Hora de inicio del turno en formato HH:MM:SS',
    example: '08:30:00',
    type: String
  })
  @IsNotEmpty({ message: 'La hora de llegada es requerida' })
  @IsString({ message: 'La hora de llegada debe ser un texto' })
  @Matches(/^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/, {
    message: 'El formato de hora debe ser HH:MM:SS'
  })
  hora_inicio: string

  @ApiProperty({
    description: 'Hora de finalización del turno en formato HH:MM:SS',
    example: '17:00:00',
    type: String
  })
  @IsNotEmpty({ message: 'La hora de salida es requerida' })
  @IsString({ message: 'La hora de salida debe ser un texto' })
  @Matches(/^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/, {
    message: 'El formato de hora debe ser HH:MM:SS'
  })
  hora_fin: string
}
