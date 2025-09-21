import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm'
import { ProductoCategoria } from '../../producto-categoria/entities/producto-categoria.entity'

@Index('productos_pkey', ['id'], { unique: true })
@Entity('productos', { schema: 'private' })
export class Producto {
  @Column('uuid', {
    primary: true,
    name: 'id',
    default: () => 'gen_random_uuid()'
  })
  id: string

  @Column('character varying', { name: 'nombre', length: 50 })
  nombre: string

  @Column('numeric', { name: 'precio', precision: 10, scale: 2 })
  precio: number

  @Column('text', { name: 'imagen', nullable: true })
  imagen: string | null

  @Column('text', { name: 'delete_hash', nullable: true })
  deleteHash: string | null

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

  @ManyToOne(
    () => ProductoCategoria,
    (productoCategoria) => productoCategoria.productos,
    { onDelete: 'CASCADE' }
  )
  @JoinColumn([{ name: 'categoria', referencedColumnName: 'id' }])
  categoria: ProductoCategoria
}
