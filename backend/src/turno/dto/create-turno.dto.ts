import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsString,
  Matches,
  Max,
  Min
} from 'class-validator'

export class CreateTurnoDto {
  @IsNotEmpty({ message: 'El usuario es requerido' })
  @IsNumber({}, { message: 'El usuario debe ser un número' })
  usuario: number

  @IsNotEmpty({ message: 'El dia es requerido' })
  @IsInt({ message: 'El dia debe ser un número entero' })
  @Min(1, { message: 'El dia debe ser al menos 1' })
  @Max(5, { message: 'El dia debe ser máximo 5' })
  dia: number

  @IsNotEmpty({ message: 'La hora de llegada es requerida' })
  @IsString({ message: 'La hora de llegada debe ser un texto' })
  @Matches(/^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/, {
    message: 'El formato de hora debe ser HH:MM:SS'
  })
  hora_inicio: string

  @IsNotEmpty({ message: 'La hora de salida es requerida' })
  @IsString({ message: 'La hora de salida debe ser un texto' })
  @Matches(/^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/, {
    message: 'El formato de hora debe ser HH:MM:SS'
  })
  hora_fin: string
}
