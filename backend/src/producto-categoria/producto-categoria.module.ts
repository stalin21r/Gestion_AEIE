import { Module } from '@nestjs/common'
import { ProductoCategoriaService } from './producto-categoria.service'
import { ProductoCategoriaController } from './producto-categoria.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ProductoCategoria } from './entities/producto-categoria.entity'
import { AuthModule } from '../auth/auth.module'

@Module({
  imports: [TypeOrmModule.forFeature([ProductoCategoria]), AuthModule],
  controllers: [ProductoCategoriaController],
  providers: [ProductoCategoriaService],
  exports: [ProductoCategoriaService]
})
export class ProductoCategoriaModule {}
