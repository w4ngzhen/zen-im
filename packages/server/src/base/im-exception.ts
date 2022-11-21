import {ReturnCode} from "./return-code";

export class ImException {
    private readonly _errorCode: ReturnCode;
    private readonly _errorMessage: string;

    get errorCode(): ReturnCode {
        return this._errorCode;
    }

    get errorMessage(): string {
        return this._errorMessage;
    }

    constructor(errorEntity: ReturnCode, errorMessage: string) {
        this._errorMessage = errorMessage;
        this._errorCode = errorEntity;
    }

    static create(errEntity: ReturnCode, errMessage?: string): ImException {
        return new ImException(errEntity, errMessage);
    }
}
