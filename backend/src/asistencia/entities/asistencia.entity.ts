import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn
} from 'typeorm'
import { Usuario } from '../../usuario/entities/usuario.entity'

@Index('asistencia_pkey', ['id'], { unique: true })
@Entity('asistencia', { schema: 'private' })
export class Asistencia {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number

  @Column('date', { name: 'dia' })
  dia: string

  @Column('time without time zone', { name: 'hora_llegada', nullable: true })
  horaLlegada: string | null

  @Column('time without time zone', { name: 'hora_salida', nullable: true })
  horaSalida: string | null

  @ManyToOne(() => Usuario, (usuario) => usuario.asistencias)
  @JoinColumn([{ name: 'usuario', referencedColumnName: 'id' }])
  usuario: Usuario
}
