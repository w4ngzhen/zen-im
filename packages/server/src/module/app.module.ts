import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {LoginModule} from './login/login.module';
import {WsModule} from "./ws/ws.module";
import {UserModule} from "./user/user.module";
import {TypeOrmModule} from "@nestjs/typeorm";
import {join} from 'path';

// 实体路径配置一定按此，否则会有模块引入问题
const entitiesPaths = [join(__dirname, '..', '**', '*.po.{ts,js}')]
@Module({
    imports: [
        TypeOrmModule.forRoot({
                "type": "mysql", // 'mariadb' 同样可用
                "host": "localhost",
                "port": 3306,
                "username": "zen_im_user",
                "password": "zen_im_password",
                "database": "zen_im_db",
                "entities": entitiesPaths,
                "synchronize": true
            }
        ),
        UserModule, LoginModule, WsModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
}
