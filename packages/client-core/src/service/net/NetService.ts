import {Service} from "../Service";
import {io} from 'socket.io-client';
import {EventBus} from "../../event/EventBus";
import {LoginEventType} from "../../event/type/LoginEventType";
import {WsHeartBeatReq, WsHeartBeatResp} from "@zen-im/common/dist/@types/ws/type/HeartBeat";

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
            (eventData: { userId: string, token: string, wsAddress: string }) => {
                this.onLoginCheckSuccess(eventData);
            });
    }

    private onLoginCheckSuccess(eventData: { userId: string, token: string, wsAddress: string }) {

        const {userId, token, wsAddress} = eventData;

        console.debug('onLoginCheckSuccess, prepare to start ws. ws params: ', eventData);

        const socket = io(wsAddress, {
            autoConnect: false,
            transports: ['websocket']
        });
        socket.on('connect', () => {
            // ws连接完成后，启动心跳

            const startOnceHeartBeat = () => {
                if (socket.disconnected) {
                    // 终止心跳
                    return;
                }
                const wsHeartBeatReq: WsHeartBeatReq = {
                    userId
                }
                socket.emit('im-heart-beat', wsHeartBeatReq, (resp: WsHeartBeatResp) => {
                    console.debug('received heart beat', resp);
                    // 收到响应后，启动下一次心跳
                    setTimeout(() => {
                        startOnceHeartBeat();
                    }, 5 * 1000);
                });
            }
            startOnceHeartBeat();

            this.eventBus.emit(LoginEventType.loginConnected);
        });
        socket.on('disconnect', () => {
            console.debug('ws disconnect');
        });
        socket.on('error', (err) => {
            console.warn('websocket connect error, ', err);
        });
        socket.connect();
    }

}
