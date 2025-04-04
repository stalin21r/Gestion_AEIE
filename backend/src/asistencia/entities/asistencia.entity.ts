import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn
} from 'typeorm'
import { Usuario } from '../../usuario/entities/usuario.entity'

@Entity('asistencia', { schema: 'private' })
export class Asistencia {
  @PrimaryGeneratedColumn()
  id: number

  @ManyToOne(() => Usuario, (usuario) => usuario.asistencias, {
    onDelete: 'CASCADE'
  })
  @JoinColumn({ name: 'usuario' })
  usuario: Usuario

  @Column({ type: 'date' })
  dia: string

  @Column({ type: 'time' })
  hora_llegada: string

  @Column({ type: 'time' })
  hora_salida: string
}
