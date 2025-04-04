import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm'
import { Producto } from '../../producto/entities/producto.entity'

@Entity('productos_categorias', { schema: 'private' })
export class ProductoCategoria {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: 'varchar', unique: true, nullable: false })
  categoria: string

  @OneToMany(() => Producto, (producto) => producto.categoria)
  productos: Producto[]
}
