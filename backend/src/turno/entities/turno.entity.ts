import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn
} from 'typeorm'
import { Usuario } from '../../usuario/entities/usuario.entity'

@Entity({ name: 'turnos', schema: 'private' })
export class Turno {
  @PrimaryGeneratedColumn()
  id: number

  @ManyToOne(() => Usuario, (usuario) => usuario.turnos, {
    onDelete: 'CASCADE'
  }) // Relación con Usuario
  @JoinColumn({ name: 'usuario' })
  usuario: Usuario

  @Column({
    type: 'int',
    nullable: false
  })
  dia: number

  @Column({
    type: 'time',
    nullable: false
  })
  hora_inicio: string

  @Column({
    type: 'time',
    nullable: false
  })
  hora_fin: string
}
