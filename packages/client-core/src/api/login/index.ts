import {API_MANAGER} from "../ApiManager";
import {UserLoginByPasswordReq, UserLoginResp} from "@zen-im/common/dist/@types/api/login";

/**
 * 用户密码登陆
 * @param req
 */
const userLoginByPassword = (req: UserLoginByPasswordReq): Promise<UserLoginResp> => {
    return API_MANAGER.API.post('login/password', req);
}

export {
    userLoginByPassword
}
