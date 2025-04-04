import { Module } from '@nestjs/common'
import { ProductoService } from './producto.service'
import { ProductoController } from './producto.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Producto } from './entities/producto.entity'
import { ProductoCategoriaModule } from '../producto-categoria/producto-categoria.module'
import { ImgurModule } from '../imgur/imgur.module'
import { AuthModule } from '../auth/auth.module'

@Module({
  imports: [
    TypeOrmModule.forFeature([Producto]),
    ProductoCategoriaModule,
    ImgurModule,
    AuthModule
  ],
  controllers: [ProductoController],
  providers: [ProductoService],
  exports: [ProductoService]
})
export class ProductoModule {}
