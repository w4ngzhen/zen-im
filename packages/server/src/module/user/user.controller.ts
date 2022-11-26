import {Controller, Get, Query} from "@nestjs/common";
import {UserService} from "./user.service";

@Controller("users")
export class UserController {
    constructor(private userService: UserService) {
    }

    @Get()
    async getUserById(@Query('id') id: string) {
        return this.userService.getUserById(id);
    }
}
