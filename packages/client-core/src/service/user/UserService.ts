import {User} from "../../entity/user/User";
import {Service} from "../Service";
import {EventBus} from "../../event/EventBus";

export class UserService extends Service {

    private _loginUserId?: string;

    get serviceName(): string {
        return "UserService";
    }

    get loginUserId(): string | undefined {
        return this._loginUserId;
    }

    set loginUserId(value: string | undefined) {
        this._loginUserId = value;
    }

    get loginUser(): User | undefined {
        return this._loginUserId ? this._cacheUsers[this._loginUserId] : undefined;
    }

    private readonly _cacheUsers: {
        [userId: string]: User
    }

    constructor(eventBus: EventBus) {
        super(eventBus);
        this._cacheUsers = {};
    }

    addUser(user: User) {
        if (!user) {
            console.warn('添加了一个空用户');
            return;
        }
        const {id: userId} = user;
        this._cacheUsers[userId] = user;
    }

    getUserById(userId: string) {
        const cacheUser = this._cacheUsers[userId];
        if (cacheUser) {
            return cacheUser;
        }
        // todo 远端请求用户数据
        // todo 存储到内存缓存
        // todo 返回使用
    }

}
