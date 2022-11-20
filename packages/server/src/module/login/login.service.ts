import {Injectable} from '@nestjs/common';
import {UserLoginResp} from "@zen-im/common/dist/@types/api/login";

@Injectable()
export class LoginService {
    async loginUserByPassword(
        userId: string,
        password: string
    ): Promise<UserLoginResp> {

        return {
            token: `${userId}_${password}`,
            wsAddress: 'ws://localhost:9999'
        }
    }
}
