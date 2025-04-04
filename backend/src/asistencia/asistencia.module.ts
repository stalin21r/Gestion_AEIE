import { Module } from '@nestjs/common'
import { AsistenciaService } from './asistencia.service'
import { AsistenciaController } from './asistencia.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Asistencia } from './entities/asistencia.entity'
import { AuthModule } from 'src/auth/auth.module'
import { Usuario } from 'src/usuario/entities/usuario.entity'

@Module({
  imports: [TypeOrmModule.forFeature([Asistencia, Usuario]), AuthModule],
  controllers: [AsistenciaController],
  providers: [AsistenciaService],
  exports: [AsistenciaService]
})
export class AsistenciaModule {}
