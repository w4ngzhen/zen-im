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

@WebSocketGateway(9999, {
    transports: ['websocket'],
    cors: '*'
})
export class WsGateway {

    @SubscribeMessage('im-heart-beat')
    handleHeartBeat(@MessageBody() req: WsHeartBeatReq): WsHeartBeatResp {
        console.debug('on client heart beat', req);
        return {
            serverTime: dayjs().format('YYYY-MM-DD HH:mm:ss.SSS')
        };
    }
}
