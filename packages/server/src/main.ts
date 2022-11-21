import {NestFactory} from '@nestjs/core';
import {AppModule} from './module/app.module';
import {HttpServiceResponseInterceptor} from "./base/interceptor/http-service-response.interceptor";
import {INestApplication} from "@nestjs/common";
import {DocumentBuilder, SwaggerModule} from '@nestjs/swagger';
import {HttpServiceExceptionFilter} from "./base/filter/http-service-exception.filter";

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

    // 注册全局仅对HTTP接口服务生效的响应拦截器
    app.useGlobalInterceptors(new HttpServiceResponseInterceptor());
    // 注册全局仅对HTTP接口服务生效的异常处理过滤器
    app.useGlobalFilters(new HttpServiceExceptionFilter());

    app.enableCors();
    setupSwagger(app);
    await app.listen(9090);
}

bootstrap();
