import { Module } from '@nestjs/common'
import { TurnoService } from './turno.service'
import { TurnoController } from './turno.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Turno } from './entities/turno.entity'
import { AuthModule } from '../auth/auth.module'

@Module({
  imports: [TypeOrmModule.forFeature([Turno]), AuthModule],
  controllers: [TurnoController],
  providers: [TurnoService],
  exports: [TurnoService]
})
export class TurnoModule {}
