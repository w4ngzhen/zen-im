import {Service} from "../Service";
import {io} from 'socket.io-client';
import {EventBus} from "../../event/EventBus";
import {LoginEventType} from "../../event/type/LoginEventType";
import {WsHeartBeatReq, WsHeartBeatResp} from "@zen-im/common/dist/@types/ws/type/HeartBeat";
import {socketEmitAsync} from "./utils";
import {NetEventType} from "../../event/type/NetEventType";

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

            console.debug('websocket instance connect');

            // ws连接完成后，启动心跳
            const startOnceHeartBeat = (timeout?: number) => {
                if (socket.disconnected) {
                    console.debug('socket disconnected, stop heart beat.');
                    return;
                }
                setTimeout(async () => {
                    console.debug('start client heart beat')
                    const wsHeartBeatReq: WsHeartBeatReq = {
                        userId
                    }
                    try {
                        console.debug('heart beat request');
                        const resp = await socketEmitAsync<WsHeartBeatReq, WsHeartBeatResp>(
                            socket,
                            'im-heart-beat',
                            wsHeartBeatReq
                        ) as WsHeartBeatResp;
                        console.debug('received heart beat response: ', resp);
                        // 正常收到响应后，启动下一次心跳（此时每过5s进行一次心跳
                        startOnceHeartBeat(5 * 1000);
                    } catch (e) {
                        console.error('heart beat check error', e)
                        // 未正常心跳，暂无重试机制，广播心跳异常
                        this.eventBus.emit(NetEventType.HeartBeatError)
                    }
                }, timeout);
            }
            // 第一次心跳需要立刻发出
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
