import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn
} from 'typeorm'
import { Casillero } from './casillero.entity'

@Index('bloque_pkey', ['id'], { unique: true })
@Index('bloque_letra_key', ['letra'], { unique: true })
@Entity('bloque', { schema: 'private' })
export class CasilleroBloque {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number

  @Column('character', { name: 'letra', unique: true, length: 1 })
  letra: string

  @Column('timestamp without time zone', {
    name: 'fecha_creacion',
    default: () => 'CURRENT_TIMESTAMP'
  })
  fechaCreacion: Date

  @Column('timestamp without time zone', {
    name: 'fecha_modificacion',
    default: () => 'CURRENT_TIMESTAMP'
  })
  fechaModificacion: Date

  @Column('text', {
    name: 'ip_maquina',
    nullable: true,
    default: () => 'inet_client_addr()'
  })
  ipMaquina: string | null

  @OneToMany(() => Casillero, (casillero) => casillero.bloque)
  casilleros: Casillero[]
}
