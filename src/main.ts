import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerCustomOptions, SwaggerModule } from '@nestjs/swagger';
import { SwaggerUiOptions } from '@nestjs/swagger/dist/interfaces/swagger-ui-options.interface';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api/v1');
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true
  }));

  const swagger = new DocumentBuilder()
    .setTitle('Ecommerce API documentaion')
    .setDescription('this is the Ecommerce API documentaion discription')
    .setVersion('1.0')
    .addTag('Bazar API')
    .setLicense('licence', 'https://google.com')
    .addSecurity('bearer', { type: 'http', scheme: 'bearer' })
    .addBearerAuth()
    .build();

  // const swaggerOptions: SwaggerUiOptions = {}
  const options: SwaggerCustomOptions = {
    ui: true,
    explorer: true,
    jsonDocumentUrl: 'docs/json',
    // swaggerOptions: swaggerOptions,

  };
  const docmentation = () => SwaggerModule.createDocument(app, swagger);
  SwaggerModule.setup('api', app, docmentation, options);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
