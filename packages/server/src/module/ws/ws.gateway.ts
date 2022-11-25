import {
    WsHeartBeatReq,
    WsHeartBeatResp
} from '@zen-im/common/dist/@types/ws/type/HeartBeat';
import {
    MessageBody,
    SubscribeMessage,
    WebSocketGateway,
} from '@nestjs/websockets';
import * as dayjs from "dayjs";
import {UseFilters, UseInterceptors} from "@nestjs/common";
import {WsServiceResponseInterceptor} from "../../base/interceptor/ws-service-response.interceptor";
import {ImException} from "../../base/im-exception";
import {WsServiceExceptionFilter} from "../../base/filter/ws-service-exception.filter";
import * as _ from 'lodash';
import {ERR_REQUEST_FIELD_EMPTY} from "@zen-im/common";

// WebSocket统一成功响应拦截器
@UseInterceptors(new WsServiceResponseInterceptor())
// WebSocket统一异常过滤器
@UseFilters(new WsServiceExceptionFilter())
@WebSocketGateway(9999, {
    transports: ['websocket'],
    cors: '*'
})
export class WsGateway {
    @SubscribeMessage('im-heart-beat')
    handleHeartBeat(@MessageBody() req: WsHeartBeatReq): WsHeartBeatResp {
        console.debug('on client heart beat', req);
        const {userId} = req;
        if (_.isEmpty(userId)) {
            throw ImException.create(ERR_REQUEST_FIELD_EMPTY, 'user id is empty.');
        }
        return {
            serverTime: dayjs().format('YYYY-MM-DD HH:mm:ss.SSS')
        };
    }
}
