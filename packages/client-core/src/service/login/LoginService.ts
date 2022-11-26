import {EventBus} from "../../event/EventBus";
import {Service} from "../Service";
import {LoginEventType} from "../../event/type/LoginEventType";
import {userLoginByPassword} from "../../api/login";

export class LoginService extends Service {

    get serviceName(): string {
        return "LoginService";
    }

    constructor(eventBus: EventBus) {
        super(eventBus);
    }

    async login(userId: string, password: string) {
        // 进行登陆验证以后，构建登陆用户信息
        return userLoginByPassword({
            userId,
            userPassword: password
        }).then(({token, wsAddress}) => {
            console.debug('loginCheckSuccess');
            this.eventBus.emit(LoginEventType.loginCheckSuccess, {
                userId,
                token,
                wsAddress
            });
        }, () => {
            this.eventBus.emit(LoginEventType.loginFail);
        })
    }

    logout(): void {
        this.eventBus.emit(LoginEventType.logout, undefined);
    }


}
