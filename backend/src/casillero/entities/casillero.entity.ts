import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn
} from 'typeorm'
import { CasilleroBloque } from './casillero-bloque.entity'

@Index('casilleros_pkey', ['id'], { unique: true })
@Entity('casilleros', { schema: 'private' })
export class Casillero {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number

  @Column('integer', { name: 'numero' })
  numero: number

  @Column('boolean', {
    name: 'ocupado',
    nullable: true,
    default: () => 'false'
  })
  ocupado: boolean | null

  @Column('character varying', {
    name: 'propietario',
    nullable: true,
    length: 50
  })
  propietario: string | null

  @Column('character varying', { name: 'correo', nullable: true, length: 100 })
  correo: string | null

  @Column('character varying', { name: 'telefono', nullable: true, length: 10 })
  telefono: string | null

  @Column('text', { name: 'registrado_por', nullable: true })
  registradoPor: string | null

  @Column('bytea', { name: 'comprobante', nullable: true })
  comprobante: Buffer | null

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

  @ManyToOne(() => CasilleroBloque, (bloque) => bloque.casilleros, {
    onDelete: 'CASCADE'
  })
  @JoinColumn([{ name: 'bloque', referencedColumnName: 'id' }])
  bloque: CasilleroBloque
}
