export interface ServerResponseWrapper<T = any> {
    returnCode: string;
    errorMessage?: string;
    data?: T;
}
