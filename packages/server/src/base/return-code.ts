import * as _ from 'lodash';

export class ReturnCode {

    private static readonly PREFIX: string = 'IM';

    private readonly _statusCode: number;
    private readonly _subCode: string;

    get statusCode(): number {
        return this._statusCode;
    }

    get code(): string {
        // http状态码转字符串并补齐3位
        const pad = _.padStart(this._statusCode.toString(), 3, '0');
        return `${ReturnCode.PREFIX}${pad}${this._subCode}`;
    }

    constructor(statusCode: number, subCode: string) {
        this._statusCode = statusCode;
        this._subCode = subCode;
    }
}

export const ERR_NOT_FOUND = new ReturnCode(404, '00');
export const ERR_REQUEST_FIELD_ERROR = new ReturnCode(400, '00');
export const SUCCESS = new ReturnCode(0, '00');
