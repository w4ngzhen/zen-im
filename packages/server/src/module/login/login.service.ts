import {Injectable} from '@nestjs/common';
import {UserLoginResp} from "@zen-im/common/dist/@types/api/login";
import {dataUsers} from "../../data/user";
import {ImException} from "../../base/im-exception";
import {ERR_NOT_FOUND} from "../../base/return-code";

@Injectable()
export class LoginService {
    async loginUserByPassword(
        userId: string,
        password: string
    ): Promise<UserLoginResp> {

        // 检查是否已经登录，如果已经登录，找到对应登录的connection，发起挤下线的请求
        // 完成后，准备进行标准登录流程
        const existUser = dataUsers.find(userPo => userPo.userId === userId);
        if (!existUser) {
            throw ImException.create(ERR_NOT_FOUND, 'user not found');
        }

        return {
            token: `${userId}_${password}`,
            wsAddress: 'ws://localhost:9999'
        }
    }
}
