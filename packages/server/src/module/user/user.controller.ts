import {Controller, Get, Query, Req} from "@nestjs/common";
import {UserService} from "./user.service";
import * as _ from 'lodash';
import {ImException} from "../../base/im-exception";
import {ERR_AUTH_ERROR} from "@zen-im/common";
import {decodeFromToken} from "../../utils/token-utils";
import {Request} from 'express';

@Controller("users")
export class UserController {
    constructor(private userService: UserService) {
    }

    @Get()
    async getUserById(@Query('id') id: string) {
        return this.userService.getUserById(id);
    }

    @Get('current')
    async getCurrentUser(@Req() httpReq: Request) {
        const token = httpReq.headers['token'] as string;
        if (_.isEmpty(token)) {
            throw ImException.create(ERR_AUTH_ERROR, 'token is empty');
        }
        const userId = decodeFromToken(token);
        return this.userService.getUserById(userId);
    }
}
