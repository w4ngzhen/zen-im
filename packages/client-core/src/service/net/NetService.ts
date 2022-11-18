import {Service} from "../Service";
import {Manager} from 'socket.io-client';
import {EventBus} from "../../event/EventBus";
import {LoginEventType} from "../../event/type/LoginEventType";

export class NetService extends Service {

    get serviceName(): string {
        return "NetService";
    }

    constructor(eventBus: EventBus) {
        super(eventBus);
    }

    async onAppStart(): Promise<void> {
        this.eventBus.on(
            LoginEventType.loginCheckSuccess,
            (token, wsAddress) => {
                this.onLoginCheckSuccess(token, wsAddress);
            })
    }

    private onLoginCheckSuccess(token: string, wsAddress: string) {
        console.debug('onLoginCheckSuccess, prepare to start ws');
        const manager = new Manager(wsAddress, {
            autoConnect: false,
            transports: ['websocket']
        });
        const socket = manager.socket('/', {
            auth: {
                token: token
            },
        });

        socket
            .on('connect', () => {

                // ws连接完成后，启动心跳
                const startOnceHeartBeat = () => {
                    if (socket.disconnected) {
                        // 终止心跳
                        return;
                    }
                    socket.emit('im-heart-beat', (response: any) => {
                        // 收到响应后，启动下一次心跳
                        setTimeout(() => {
                            startOnceHeartBeat();
                        }, 5 * 1000);
                    });
                }

                startOnceHeartBeat();
                this.eventBus.emit(LoginEventType.loginConnected);
            })
            .on('disconnect', () => {
                // todo disconnect
            })
            .on('im-message-received', msg => {
                console.debug('msg received', msg);
            })

        manager.open(err => {
            if (err) {
                console.error('connect to server by ws err', err);
            }
        });
    }

}