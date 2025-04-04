import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm'
import { Casillero } from './casillero.entity'

@Entity({ name: 'bloque', schema: 'private' })
export class CasilleroBloque {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: 'char', length: 1, unique: true })
  letra: string

  @OneToMany(() => Casillero, (casillero) => casillero.bloque)
  casilleros: Casillero[]
}
