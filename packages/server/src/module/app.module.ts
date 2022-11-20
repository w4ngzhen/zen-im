import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {LoginModule} from './login/login.module';
import {WsModule} from "./ws/ws.module";

@Module({
    imports: [LoginModule, WsModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
}
