import {Body, Controller, Post, Query} from '@nestjs/common';
import {UserLoginByPasswordReq, UserLoginResp} from "@zen-im/common/dist/@types/api/login";
import {LoginService} from "./login.service";

@Controller('login')
export class LoginController {


    constructor(private readonly loginService: LoginService) {
    }

    @Post("password")
    async loginByPassword(@Body() req: UserLoginByPasswordReq): Promise<UserLoginResp> {
        const {
            userId,
            password
        } = req;
        return this.loginService.loginUserByPassword(userId, password);
    }
}
