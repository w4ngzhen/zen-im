import {CallHandler, ExecutionContext, NestInterceptor} from "@nestjs/common";
import {map, Observable} from "rxjs";
import {ApiResponse} from "@zen-im/common";

export class ResponseInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext,
              next: CallHandler):
        Observable<any> | Promise<Observable<any>> {
        return next.handle().pipe(map(data => {
            console.debug('ResponseInterceptor', data);
            // 进入该拦截器，说明没有异常，使用成功返回题
            const resp: ApiResponse = {
                returnCode: 'SUCCESS',
                data: data
            };
            return resp;
        }))
    }
}
