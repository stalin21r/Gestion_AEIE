import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany
} from 'typeorm'
import { Asistencia } from '../../asistencia/entities/asistencia.entity'
import { Turno } from '../../turno/entities/turno.entity'
import { Rol } from './rol.entity'

@Index('usuarios_correo_key', ['correo'], { unique: true })
@Index('usuarios_pkey', ['id'], { unique: true })
@Index('usuarios_usuario_key', ['usuario'], { unique: true })
@Entity('usuarios', { schema: 'private' })
export class Usuario {
  @Column('uuid', {
    primary: true,
    name: 'id',
    default: () => 'gen_random_uuid()'
  })
  id: string

  @Column('character varying', { name: 'nombre', length: 50 })
  nombre: string

  @Column('character varying', { name: 'apellido', length: 50 })
  apellido: string

  @Column('character varying', { name: 'correo', unique: true, length: 100 })
  correo: string

  @Column('character varying', { name: 'contrasena', length: 100 })
  contrasena: string

  @Column('character varying', { name: 'usuario', unique: true, length: 50 })
  usuario: string

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

  @OneToMany(() => Asistencia, (asistencia) => asistencia.usuario)
  asistencias: Asistencia[]

  @OneToMany(() => Turno, (turno) => turno.usuario)
  turnos: Turno[]

  @ManyToOne(() => Rol, (rol) => rol.usuarios)
  @JoinColumn([{ name: 'rol_id', referencedColumnName: 'id' }])
  rol: Rol
}
