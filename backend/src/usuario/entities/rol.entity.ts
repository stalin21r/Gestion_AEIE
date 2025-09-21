import { Column, Entity, Index, OneToMany } from 'typeorm'
import { Usuario } from './usuario.entity'

@Index('roles_pkey', ['id'], { unique: true })
@Index('roles_nombre_key', ['nombre'], { unique: true })
@Entity('roles', { schema: 'private' })
export class Rol {
  @Column('uuid', {
    primary: true,
    name: 'id',
    default: () => 'gen_random_uuid()'
  })
  id: string

  @Column('character varying', { name: 'nombre', unique: true, length: 50 })
  nombre: string

  @OneToMany(() => Usuario, (usuario) => usuario.rol)
  usuarios: Usuario[]
}
