import { Module } from '@nestjs/common';
import { LoginService } from './service/login.service';
import { LoginController } from './controller/login.controller';

@Module({
  providers: [LoginService],
  controllers: [LoginController]
})
export class LoginModule {}
