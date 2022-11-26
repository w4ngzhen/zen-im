import {Injectable} from '@nestjs/common';
import {UserLoginResp} from "@zen-im/common/dist/@types/api/login";
import {ImException} from "../../base/im-exception";
import {ERR_AUTH_ERROR, ERR_NOT_FOUND} from "@zen-im/common";
import {Repository} from "typeorm";
import {UserPo} from "../../entity/po/user.po";
import {InjectRepository} from "@nestjs/typeorm";
import * as _ from 'lodash';
import {encodeToToken} from "../../utils/token-utils";

@Injectable()
export class LoginService {

    constructor(@InjectRepository(UserPo)
                private readonly userRepo: Repository<UserPo>) {
    }

    async loginUserByPassword(
        userId: string,
        userPassword: string
    ): Promise<UserLoginResp> {

        // todo 检查是否已经登录，如果已经登录，找到对应登录的connection，发起挤下线的请求
        // 完成后，准备进行标准登录流程
        const existUser = await this.userRepo.findOneBy({
            id: userId
        });

        if (!existUser) {
            throw ImException.create(ERR_NOT_FOUND, 'user not found');
        }

        const {password} = existUser;
        if (!_.eq(userPassword, password)) {
            throw ImException.create(ERR_AUTH_ERROR, 'user password error');
        }

        const token = encodeToToken(userId);
        return {
            token: token,
            wsAddress: 'ws://localhost:9999'
        }
    }
}
