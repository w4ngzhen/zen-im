import {Module} from "@nestjs/common";
import {UserPo} from "../../entity/po/user.po";
import {TypeOrmModule} from "@nestjs/typeorm";
import {UserService} from "./user.service";
import {UserController} from "./user.controller";

@Module({
    imports: [TypeOrmModule.forFeature([UserPo])],
    providers: [UserService],
    controllers: [UserController],
})

export class UserModule {
}
