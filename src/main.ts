import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { GlobalInterceptor } from './common/utils/response-interceptor';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.useGlobalPipes(new ValidationPipe());
    app.useGlobalInterceptors(new GlobalInterceptor());

    // Swagger Setup
    const config = new DocumentBuilder()
        .setTitle('API Docs')
        .setDescription('NestJS API documentation')
        .setVersion('1.0')
        .addBearerAuth()
        .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api/docs', app, document);

    await app.listen(3001);
}
bootstrap();
