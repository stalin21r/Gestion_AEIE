import { Asistencia } from 'src/asistencia/entities/asistencia.entity'
import { Turno } from 'src/turno/entities/turno.entity'
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm'
@Entity('usuarios', { schema: 'private' })
export class Usuario {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ length: 50 })
  nombre: string

  @Column({ length: 50 })
  apellido: string

  @Column({ length: 100, unique: true })
  correo: string

  @Column({ length: 100 })
  contrasena: string

  @Column({ length: 50, unique: true })
  usuario: string

  @Column({ default: false })
  rol: boolean

  @OneToMany(() => Asistencia, (asistencia) => asistencia.usuario)
  asistencias: Asistencia[]

  @OneToMany(() => Turno, (turno) => turno.usuario)
  turnos: Turno[]
}
