import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn
} from 'typeorm'
import { CasilleroBloque } from './casillero-bloque.entity'

@Entity({ name: 'casilleros', schema: 'private' })
export class Casillero {
  @PrimaryGeneratedColumn()
  id: number

  @ManyToOne(() => CasilleroBloque, (bloque) => bloque.casilleros, {
    onDelete: 'CASCADE'
  })
  @JoinColumn({ name: 'bloque' })
  bloque: CasilleroBloque

  @Column({ type: 'int' })
  numero: number

  @Column({ type: 'boolean', default: false })
  ocupado: boolean

  @Column({ type: 'varchar', length: 50, nullable: true })
  propietario: string | null

  @Column({ type: 'varchar', length: 100, nullable: true })
  correo: string | null

  @Column({ type: 'varchar', length: 20, nullable: true })
  telefono: string | null

  @Column({ type: 'varchar', nullable: true })
  registrado_por: string | null

  @Column({ type: 'bytea', nullable: true })
  comprobante: Buffer | null
}
