import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn
} from 'typeorm'
import { ProductoCategoria } from '../../producto-categoria/entities/producto-categoria.entity'

@Entity('productos', { schema: 'private' })
export class Producto {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: 'varchar', length: 50, nullable: false })
  nombre: string

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
  precio: number

  @ManyToOne(() => ProductoCategoria, (categoria) => categoria.productos, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  })
  @JoinColumn({ name: 'categoria' })
  categoria: ProductoCategoria

  @Column({ type: 'text', nullable: true })
  imagen: string

  @Column({ type: 'text', nullable: true })
  delete_hash: string
}
