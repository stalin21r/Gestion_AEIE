import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { DataSource } from 'typeorm'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.setGlobalPrefix('api/v1/')
  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true
  })

  // Configuración de Swagger
  const config = new DocumentBuilder()
    .setTitle('API Documentation')
    .setDescription('Documentación de la API REST')
    .setVersion('1.0')
    .addBearerAuth()
    .build()

  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api/v1/docs', app, document)

  const dataSource = app.get(DataSource)
  if (!dataSource.isInitialized) {
    try {
      await dataSource.initialize()
      console.log('Conexión a bd exitosa')
    } catch (err) {
      console.error('Error de conexión a bd: ', err)
      process.exit(1)
    }
  } else {
    console.log('Conexión a db ya establecida')
  }

  await app.listen(process.env.SERVER_PORT ?? 3000)
  console.log(`Application is running on: ${await app.getUrl()}`)
  console.log(
    `Swagger documentation available at: ${await app.getUrl()}/api/v1/docs`
  )
}

bootstrap()
  .then(() => {
    console.log('Application started')
  })
  .catch((err) => {
    console.error(err)
  })
