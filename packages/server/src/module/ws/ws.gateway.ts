import {WsHeartBeatReq, WsHeartBeatResp} from '@zen-im/common/dist/@types/ws/type/HeartBeat';
import {
    ConnectedSocket,
    MessageBody,
    OnGatewayConnection,
    OnGatewayDisconnect,
    OnGatewayInit,
    SubscribeMessage,
    WebSocketGateway
} from '@nestjs/websockets';
import {UseFilters, UseInterceptors} from "@nestjs/common";
import {WsServiceResponseInterceptor} from "../../base/interceptor/ws-service-response.interceptor";
import {WsServiceExceptionFilter} from "../../base/filter/ws-service-exception.filter";
import {Server, Socket} from 'socket.io'
import {WsService} from "./ws.service";

// WebSocket统一成功响应拦截器
@UseInterceptors(new WsServiceResponseInterceptor())
// WebSocket统一异常过滤器
@UseFilters(new WsServiceExceptionFilter())
@WebSocketGateway(9999, {
    transports: ['websocket'],
    cors: '*'
})
export class WsGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {

    constructor(private readonly wsService: WsService) {
    }

    /**
     * OnGatewayInit.afterInit
     * WS网关初始化完成
     * @param server
     */
    afterInit(server: Server) {
        console.debug('WsGateway afterInit')
        this.wsService.afterInit(server);
    }

    /**
     * OnGatewayConnection.handleConnection
     * 连接建立时的处理回调
     * @param client 具体平台Socket对象，本项目为socket.io的Socket实例
     * @param args
     */
    handleConnection(client: Socket, ...args: any[]) {
        console.debug(`WsGateway websocket connection [${client.id}] connect`);
        this.wsService.handleConnection(client, args);
    }

    /**
     * OnGatewayDisconnect.handleDisconnect
     * socket断联时触发
     * @param client 具体平台Socket对象，本项目为socket.io的Socket实例
     */
    handleDisconnect(client: Socket): any {
        console.debug(`WsGateway websocket connection [${client.id}] disconnect`);
        this.wsService.handleDisconnect(client);
    }

    @SubscribeMessage('im-heart-beat')
    handleHeartBeat(@MessageBody() req: WsHeartBeatReq,
                    @ConnectedSocket() client: Socket): WsHeartBeatResp {
        const clientId = client.id;
        console.debug(`on client heart beat [${clientId}]`, req);
        return this.wsService.handleHeartBeat(req, clientId);
    }
}
