import {ArgumentsHost, Catch, ExceptionFilter, HttpException} from "@nestjs/common";
import {ImException} from "../im-exception";
import {ServerResponseWrapper} from "@zen-im/common";

/**
 * 全局Http服务的异常处理，
 * 该Filter在main中通过
 * app.useGlobalExceptionFilter来全局引入，
 * 仅处理HTTP服务
 */
@Catch()
export class HttpServiceExceptionFilter implements ExceptionFilter {
    catch(exception: any, host: ArgumentsHost): any {
        // 进入该拦截器，说明http调用中存在异常，需要解析异常，并返回统一处理
        let responseWrapper: ServerResponseWrapper;
        let httpStatusCode: number;
        if (exception instanceof ImException) {
            // 业务层的IM Exception
            responseWrapper = {
                returnCode: exception.errorCode.code,
                errorMessage: exception.errorMessage
            }
            httpStatusCode = exception.errorCode.statusCode;
        } else if (exception instanceof HttpException) {
            // 框架层的Http异常
            responseWrapper = {
                returnCode: 'IM9009',
                errorMessage: exception.message,
            }
            httpStatusCode = exception.getStatus();
        } else {
            // 其他错误
            responseWrapper = {
                returnCode: 'IM9999',
                errorMessage: exception.message
            };
            httpStatusCode = 500;

        }

        const httpHost = host.switchToHttp();
        const response = httpHost.getResponse();
        response.status(httpStatusCode).json(responseWrapper);
    }
}
