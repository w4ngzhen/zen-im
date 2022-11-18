export class User {

    get id(): string {
        return this._id;
    }

    private readonly _id: string;

    private _name: string;

    constructor(id: string, name: string) {
        this._id = id;
        this._name = name;
    }
}
