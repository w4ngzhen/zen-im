import {CallHandler, ExecutionContext, NestInterceptor} from "@nestjs/common";
import {map, Observable} from "rxjs";
import {ApiResponse} from "@zen-im/common";
import {SUCCESS} from "../return-code";

/**
 * 全局Http服务响应拦截器
 * 该Interceptor在main中通过
 * app.useGlobalInterceptors 来全局引入，
 * 仅处理HTTP服务响应拦截
 */
export class HttpServiceResponseInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext,
              next: CallHandler):
        Observable<any> | Promise<Observable<any>> {
        return next.handle().pipe(map(data => {
            console.debug('ResponseInterceptor', data);
            // 进入该拦截器，说明没有异常，使用成功返回
            const resp: ApiResponse = {
                returnCode: SUCCESS.code,
                data: data
            };
            return resp;
        }))
    }
}
