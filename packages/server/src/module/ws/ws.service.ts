import {Server, Socket} from "socket.io";
import {SocketId} from "socket.io-adapter";
import {WsHeartBeatReq} from "@zen-im/common/dist/@types/ws/type/HeartBeat";
import * as _ from "lodash";
import {ImException} from "../../base/im-exception";
import {ERR_REQUEST_FIELD_EMPTY} from "@zen-im/common";
import * as dayjs from "dayjs";
import {Injectable} from "@nestjs/common";
import {OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit} from "@nestjs/websockets";

/**
 * WebSocket服务
 * 该服务不通过DI依赖注入完成，而是在WebSocket网关完成初始化后创建
 */
@Injectable()
export class WsService implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {

    /**
     * 当前WS服务实例
     * @private
     */
    private _server: Server;
    /**
     * 存放WS客户端ID与对应客户端实例映射
     * @private
     */
    private readonly _clientMap: Record<SocketId, Socket>;

    /**
     * 存放WS客户端ID与对应心跳检测超时处理的timerId
     * @private
     */
    private readonly _clientTimerIdMap: Record<SocketId, NodeJS.Timeout>;

    /**
     * 存放用户与WS客户端ID的映射
     * userId -> clientId
     * 之所以不是clientId -> userId，在于后续服务会经常有给某些用户发送消息的场景，
     * 如果是clientId -> userId，那么会频繁先遍历查询userId，再反向获得clientId。
     * @private
     */
    private readonly _userClientMap: Record<string, SocketId>

    constructor() {
        this._clientMap = {};
        this._clientTimerIdMap = {};
        this._userClientMap = {};
        console.debug('WsService instance created')
    }

    afterInit(server: Server) {
        this._server = server;
    }

    /**
     * socket客户端连接
     * @param client
     * @param args
     */
    handleConnection(client: Socket, ...args: any[]) {
        const clientId = client.id;
        this._clientMap[clientId] = client;
        // 按照协议，客户端连接以后，就会立刻发出第一次心跳，服务端5s超时检测
        // 否则视为无效连接
        this.startHeartBeatCheck(clientId, 5 * 1000);
    }

    /**
     * socket客户端断连
     * @param client
     */
    handleDisconnect(client: Socket) {
        delete this._clientMap[client.id];
    }

    /**
     * 处理来自客户端的一次心跳
     * @param req
     * @param clientId
     */
    handleHeartBeat(req: WsHeartBeatReq, clientId: SocketId) {
        console.debug('on client heart beat', req);
        const {userId} = req;
        if (_.isEmpty(userId)) {
            throw ImException.create(ERR_REQUEST_FIELD_EMPTY, 'user id is empty.');
        }

        // 将clientId与userId进行映射
        // 理论上，这个映射会在第一次心跳以后就保持了，但是这里简单用覆盖处理
        this._userClientMap[userId] = clientId;

        // 按照协议，客户端连接会每次5s进行心跳，对于服务端，超时时间设为7s。
        this.startHeartBeatCheck(clientId, 7 * 1000);

        return {
            serverTime: dayjs().format('YYYY-MM-DD HH:mm:ss.SSS')
        };
    }

    /**
     * 启动一个timer来进行心跳检测
     * @param clientId
     * @param timeout
     * @private
     */
    private startHeartBeatCheck(clientId: SocketId, timeout: number) {
        // 开始一个心跳前，先将之前的处理掉
        const previousTimerId = this._clientTimerIdMap[clientId];
        if (previousTimerId) {
            clearTimeout(previousTimerId);
        }
        console.debug(`heart beat check start for [${clientId}].`);
        this._clientTimerIdMap[clientId] = setTimeout(() => {
            // 时间到，移除相关无用上下文
            console.debug('heart beat check timeout.');

            // 移除timer映射
            delete this._clientTimerIdMap[clientId]

            // 主动断连并移除映射表
            const client = this._clientMap[clientId];
            delete this._clientMap[clientId];
            client.disconnect();

            // 移除userId -> clientId的映射
            const userId = Object.keys(this._userClientMap).find(uId => this._userClientMap[uId]);
            delete this._userClientMap[userId];

        }, timeout);
    }
}
