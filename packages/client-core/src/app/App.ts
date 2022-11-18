import {LoginService} from "../service/login/LoginService";
import {ChatSessionService} from "../service/chat-session/ChatSessionService";
import {UserService} from "../service/user/UserService";
import {EventBus, createEventBus} from "../event/EventBus";
import {Service} from "../service/Service";
import {LoginEventType} from "../event/type/LoginEventType";
import {API_MANAGER} from "../api/ApiManager";
import {NetService} from "../service/net/NetService";

export class App {

    private readonly _eventBus: EventBus;

    private readonly _loginService: LoginService;
    private readonly _netService: NetService;
    private readonly _chatSessionService: ChatSessionService;
    private readonly _userService: UserService;

    private get services(): Service[] {
        return [
            this._loginService,
            this._netService,
            this._userService,
            this._chatSessionService
        ]
    }

    constructor(baseServiceUrl: string) {
        API_MANAGER.init(baseServiceUrl);
        this._eventBus = createEventBus();
        this._loginService = new LoginService(this._eventBus);
        this._netService = new NetService(this._eventBus);
        this._chatSessionService = new ChatSessionService(this._eventBus);
        this._userService = new UserService(this._eventBus);
    }

    private init() {
        console.debug('start App init');
        // 登录事件监听
        this._eventBus.on(LoginEventType.loginConnected, async () => {
            await this.onAfterLogin();
        });
        this._eventBus.on(LoginEventType.logout, async () => {
            await this.onAfterLogout();
        });
    }

    private async onAppStart(): Promise<void> {
        console.debug('[onAppStart] begin');
        this.init();
        for (let service of this.services) {
            await service.onAppStart();
            console.debug(`service ${service.serviceName} complete 'onAppStart'`);
        }
    }

    private async onAfterLogin(): Promise<void> {
        for (let service of this.services) {
            await service.onAfterLogin();
        }
    }

    private async onAfterLogout(): Promise<void> {
        for (let service of this.services) {
            await service.onAfterLogout();
        }
    }

    private async onAppExit(): Promise<void> {
        for (let service of this.services) {
            await service.onAppExit();
        }
    }

    async start() {
        await this.onAppStart();
    }

    async exit() {
        await this.onAppExit();
    }

    get loginService(): LoginService {
        return this._loginService;
    }

}
