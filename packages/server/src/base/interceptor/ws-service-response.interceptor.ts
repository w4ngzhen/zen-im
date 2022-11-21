import {CallHandler, ExecutionContext, NestInterceptor} from "@nestjs/common";
import {map, Observable} from "rxjs";
import {ServerResponseWrapper} from "@zen-im/common";
import {SUCCESS} from "../return-code";

/**
 * WebSocket服务响应拦截器
 * 该Interceptor在WebSocket网关被注解 @UseInterceptors 引入，
 * 仅处理WebSocket服务
 */
export class WsServiceResponseInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext,
              next: CallHandler):
        Observable<any> | Promise<Observable<any>> {
        return next.handle().pipe(map(data => {
            // 进入该拦截器，说明没有异常，使用成功返回
            const resp: ServerResponseWrapper = {
                returnCode: SUCCESS.code,
                data: data
            };
            return resp;
        }))
    }
}
