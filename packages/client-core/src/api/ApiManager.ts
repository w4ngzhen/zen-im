import axios, {AxiosInstance} from "axios";
import {ApiResponse} from "@zen-im/common";


class ApiManager {

    get API(): AxiosInstance {
        if (!this._initialed) {
            throw new Error('[zen-im] API instance dose not initialized.');
        }
        return this._axiosInstance;
    }

    private _axiosInstance!: AxiosInstance;

    private _initialed: boolean;

    constructor() {
        this._initialed = false;
    }

    init(baseServiceUrl: string) {
        this._axiosInstance = axios.create({
            baseURL: baseServiceUrl,
            timeout: 30 * 1000
        });
        this._axiosInstance.interceptors.response.use(
            (originResponse) => {
                // 按照协议，只要返回码200，总是返回成功
                // 直接提取data
                const {
                    data
                }: ApiResponse = originResponse.data;
                return data;
            }, err => {
                // 进入该回掉，默认总是非1/2**返回码
                const {
                    returnCode,
                    errorMessage
                }: ApiResponse = err.data;
                throw new Error(`[${returnCode}]${errorMessage}`);
            })
        this._initialed = true;
    }
}

const API_MANAGER = new ApiManager();

export {
    API_MANAGER
}
