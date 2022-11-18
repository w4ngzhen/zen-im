import {Message} from "@zen-im/common";
import {ChatSessionType} from "./ChatSessionType";

export class ChatSession {

    /**
     * 聊天会话ID
     * @private
     */
    private readonly _id: string;
    /**
     * 会话类型
     * @private
     */
    private readonly _type: ChatSessionType;
    /**
     * 该会话关联的用户ID
     */
    private readonly _userIds: string[];
    /**
     * 该会话产生的消息
     */
    private readonly _messages: Message[];


    constructor(id: string,
                type: ChatSessionType,
                userIds: string[],
                messages: Message[]) {
        this._id = id;
        this._type = type;
        this._userIds = userIds;
        this._messages = messages;
    }

    get id(): string {
        return this._id;
    }

    get userIds(): string[] {
        return this._userIds;
    }

    get messages(): Message[] {
        return this._messages;
    }

}
