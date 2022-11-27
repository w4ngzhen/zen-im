import {ServerResponseWrapper, SUCCESS} from "@zen-im/common";

/**
 * 定义一个 socket.io 中的socket连接实例类型（鸭子类型）
 * 该类型适配了服务端的响应机制（正异常响应均使用ServerResponseWrapper封装）
 * 对于响应callback中的参数，服务端总是进行成功响应拦截封装/异常过滤封装，
 * 故我们会通过utils对ServerResponseWrapper进行处理
 */
type SocketIoInstanceType<TReq = any, TResp = any> = {
    emit: (
        ev: string,
        data: TReq,
        cb: (respWrapper: ServerResponseWrapper<TResp>) => void
    ) => {}
}
/**
 * Promise化socket.emit，并处理ServerResponseWrapper
 * @param socket
 * @param eventName
 * @param data
 */
export const socketEmitAsync = async <TReq, TResp>(
    socket: SocketIoInstanceType,
    eventName: string,
    data: TReq
) => {
    // todo socket判断（为空、断连等场景）
    return new Promise<TResp>((resolve, reject) => {
        socket.emit(eventName, data, (respWrapper: ServerResponseWrapper) => {
            const {
                returnCode,
                errorMessage,
                data
            } = respWrapper;
            if (returnCode === SUCCESS.code) {
                resolve(data)
            } else {
                reject({
                    errorCode: returnCode,
                    errorMessage: errorMessage
                })
            }
        })
    })
}
