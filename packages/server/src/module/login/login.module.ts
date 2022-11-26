import { Module } from '@nestjs/common';
import { LoginService } from './login.service';
import { LoginController } from './login.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {UserPo} from "../../entity/po/user.po";

@Module({
  imports: [
    TypeOrmModule.forFeature([UserPo])
  ],
  providers: [LoginService],
  controllers: [LoginController]
})
export class LoginModule {}
