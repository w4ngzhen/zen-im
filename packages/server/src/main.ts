import {NestFactory} from '@nestjs/core';
import {AppModule} from './module/app.module';
import {ResponseInterceptor} from "./interceptor/response.interceptor";
import {INestApplication} from "@nestjs/common";
import {DocumentBuilder, SwaggerModule} from '@nestjs/swagger';


function setupSwagger(app: INestApplication) {
    const config = new DocumentBuilder()
        .setTitle('zen-im swagger')
        .setDescription('zen-im swagger service')
        .setVersion('1.0')
        .addTag('zen-im')
        .build();
    const doc = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('swagger', app, doc);
}

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.useGlobalInterceptors(new ResponseInterceptor());
    app.enableCors();
    setupSwagger(app);
    await app.listen(9090);
}

bootstrap();
