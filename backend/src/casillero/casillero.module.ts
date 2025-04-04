import { Module } from '@nestjs/common'
import { CasilleroService } from './casillero.service'
import { CasilleroController } from './casillero.controller'
import { Casillero } from './entities/casillero.entity'
import { CasilleroBloque } from './entities/casillero-bloque.entity'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AuthModule } from 'src/auth/auth.module'

@Module({
  imports: [TypeOrmModule.forFeature([CasilleroBloque, Casillero]), AuthModule],
  controllers: [CasilleroController],
  providers: [CasilleroService],
  exports: [CasilleroService]
})
export class CasilleroModule {}
