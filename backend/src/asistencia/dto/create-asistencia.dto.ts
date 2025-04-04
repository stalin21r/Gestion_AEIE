import {
  IsNotEmpty,
  IsNumber,
  IsDateString,
  IsString,
  Matches
} from 'class-validator'

export class CreateAsistenciaDto {
  @IsNotEmpty({ message: 'El usuario es requerido' })
  @IsNumber({}, { message: 'El usuario debe ser un número' })
  usuario: number

  @IsNotEmpty({ message: 'El dia es requerido' })
  @IsDateString({}, { message: 'El dia debe ser una fecha' })
  dia: string

  @IsNotEmpty({ message: 'La hora de llegada es requerida' })
  @IsString({ message: 'La hora de llegada debe ser un texto' })
  @Matches(/^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/, {
    message: 'El formato de hora debe ser HH:MM:SS'
  })
  hora_llegada: string

  @IsNotEmpty({ message: 'La hora de salida es requerida' })
  @IsString({ message: 'La hora de salida debe ser un texto' })
  @Matches(/^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/, {
    message: 'El formato de hora debe ser HH:MM:SS'
  })
  hora_salida: string
}
