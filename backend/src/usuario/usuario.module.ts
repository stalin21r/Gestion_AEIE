import { Module } from '@nestjs/common'
import { UsuarioService } from './usuario.service'
import { UsuarioController } from './usuario.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Usuario } from './entities/usuario.entity'
import { Rol } from './entities/rol.entity'
import { JwtService } from '@nestjs/jwt'
import { AuthModule } from '../auth/auth.module'

@Module({
  imports: [TypeOrmModule.forFeature([Usuario, Rol]), AuthModule],
  controllers: [UsuarioController],
  providers: [UsuarioService, JwtService]
})
export class UsuarioModule {}
