import { Column, Entity, Index, OneToMany } from 'typeorm'
import { Producto } from '../../producto/entities/producto.entity'

@Index('productos_categorias_categoria_key', ['categoria'], { unique: true })
@Index('productos_categorias_pkey', ['id'], { unique: true })
@Entity('productos_categorias', { schema: 'private' })
export class ProductoCategoria {
  @Column('uuid', {
    primary: true,
    name: 'id',
    default: () => 'gen_random_uuid()'
  })
  id: string

  @Column('character varying', { name: 'categoria', unique: true, length: 50 })
  categoria: string

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

  @OneToMany(() => Producto, (producto) => producto.categoria)
  productos: Producto[]
}
