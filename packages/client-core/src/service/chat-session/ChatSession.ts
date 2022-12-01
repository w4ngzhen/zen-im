import {Message, MessageChatType, MessageContent, MessageContentType} from "@zen-im/common";
import {NetService} from "../net/NetService";
import {UserService} from "../user/UserService";

export class ChatSession {
    /**
     * 会话ID
     * @private
     */
    private readonly _id: string;

    /**
     * 聊天会话的类型，取自MessageChatType
     * @private
     */
    private readonly _type: MessageChatType;

    /**
     * 该会话关联的用户
     * 群聊就是一个群里面所有的用户
     * 单聊就是两个用户
     * @private
     */
    private readonly _userIds: string[];

    /**
     * 该会话中所有的聊天消息
     * @private
     */
    private readonly _messages: Message[];

    private readonly _netService: NetService;
    private readonly _userService: UserService;

    constructor(id: string,
                type: MessageChatType,
                userIds: string[],
                messages: Message[],
                netService: NetService,
                userService: UserService,
    ) {
        this._id = id;
        this._type = type;
        this._userIds = userIds;
        this._messages = messages;
        this._netService = netService;
        this._userService = userService;
    }

    sendMessage(message: Pick<Message,
        'refId' | 'contentType' | 'content' | 'receiverId'>) {
        const {
            refId,
            content,
            contentType,
            receiverId
        } = message;

        // 调用用户服务获取当前登录用户
        if (!this._userService.loginUser) {
            throw new Error('当前登录用户为空，无法发送消息');
        }
        const senderId = this._userService.loginUser?.id;

        // 根据传递的数据，构建供传输的message
        // 当然，其中某些字段是暂不可提供的
        const msg: Message = {
            chatType: this._type,
            refId: refId,
            contentType: contentType,
            content: content,

            senderId: senderId,
            receiverId: receiverId,

            id: '', // 服务端产生消息ID
            marks: [], // 一开始发送时，是没有mark的
            time: '' // 客户端时间没有实际意义，由服务端产生
        }

        // todo 调用网络服务进行数据发送
    }

}
