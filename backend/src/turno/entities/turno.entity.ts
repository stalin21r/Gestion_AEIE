import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn
} from 'typeorm'
import { Usuario } from '../../usuario/entities/usuario.entity'

@Index('turnos_pkey', ['id'], { unique: true })
@Entity('turnos', { schema: 'private' })
export class Turno {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number

  @Column('integer', { name: 'dia', nullable: true })
  dia: number | null

  @Column('time without time zone', { name: 'hora_inicio' })
  horaInicio: string

  @Column('time without time zone', { name: 'hora_fin' })
  horaFin: string

  @ManyToOne(() => Usuario, (usuario) => usuario.turnos)
  @JoinColumn([{ name: 'usuario', referencedColumnName: 'id' }])
  usuario: Usuario
}
