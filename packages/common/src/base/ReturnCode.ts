export class ReturnCode {

    private readonly _preCode: 'SUC' | 'ERR';
    private readonly _subCode: string;

    private readonly _statusCode: number;

    get code() {
        return `${this._preCode}${this._subCode}`;
    }

    get statusCode(): number {
        return this._statusCode;
    }

    constructor(preCode: 'SUC' | 'ERR', subCode: string, statusCode: number) {
        this._preCode = preCode;
        this._subCode = subCode;

        this._statusCode = statusCode;
    }
}

export const SUCCESS = new ReturnCode('SUC', '00000', 200);

export const ERR_NOT_FOUND = new ReturnCode('ERR', '40400', 404);

export const ERR_REQUEST_FIELD_EMPTY = new ReturnCode('ERR', '40001', 400);

export const ERR_AUTH_ERROR = new ReturnCode('ERR', '40100', 401);
