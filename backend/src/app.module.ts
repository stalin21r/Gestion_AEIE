import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { UsuarioModule } from './usuario/usuario.module'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AuthModule } from './auth/auth.module'
import { CasilleroModule } from './casillero/casillero.module'
import { AsistenciaModule } from './asistencia/asistencia.module'
import { TurnoModule } from './turno/turno.module'
import { ProductoCategoriaModule } from './producto-categoria/producto-categoria.module'
import { ProductoModule } from './producto/producto.module'
import { ImgurModule } from './imgur/imgur.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: configService.get('DB_PORT'),
        username: configService.get('DB_USER'),
        password: configService.get('DB_PASS'),
        database: configService.get('DB_NAME'),
        autoLoadEntities: true,
        synchronize: false,
        //logging: ['query', 'error'],
        logging: ['error'],
        extra: {
          ssl: {
            require: configService.get('DB_SSL'),
            rejectUnauthorized: false
          }
        },
        options: {
          enableArithAbort: true,
          trustServerCertificate: true,
          connectionTimeout: 10000,
          requestTimeout: 10000
        }
      })
    }),
    UsuarioModule,
    AuthModule,
    CasilleroModule,
    AsistenciaModule,
    TurnoModule,
    ProductoCategoriaModule,
    ProductoModule,
    ImgurModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
