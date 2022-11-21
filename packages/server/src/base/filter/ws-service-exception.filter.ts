import {ArgumentsHost, Catch, ExceptionFilter} from "@nestjs/common";
import {ImException} from "../im-exception";
import {ServerResponseWrapper} from "@zen-im/common";

/**
 * 全局WebSocket服务的异常处理，
 * 该Filter在WebSocket网关处通过 @UseFilters 引入
 * 仅处理WebSocket服务
 */
@Catch()
export class WsServiceExceptionFilter implements ExceptionFilter {
    catch(exception: any, host: ArgumentsHost): any {
        // 进入该拦截器，说明websocket调用中存在异常，需要解析异常，并返回统一处理
        let responseWrapper: ServerResponseWrapper;
        if (exception instanceof ImException) {
            // 业务层的IM Exception
            responseWrapper = {
                returnCode: exception.errorCode.code,
                errorMessage: exception.errorMessage
            }
        } else {
            // 非业务错误
            responseWrapper = {
                returnCode: 'IM9999',
                errorMessage: exception.message
            };
        }

        // 对异常进行封装以后，需要让框架继续进行调用处理，才能正确的响应给客户端
        // 此时，需要提取到callback这个函数
        // 参考：https://stackoverflow.com/questions/61795299/nestjs-return-ack-in-exception-filter
        const callback = host.getArgByIndex(2);
        if (callback && typeof callback === 'function') {
            callback(responseWrapper);
        }
    }
}
