import {
    MessageContent,
    MessageContentType
} from "./MessageContent";
import {MessageChatType} from "./MessageChatType";
import {MessageMark} from "./MessageMark";


export type Message = {
    /**
     * 消息ID
     */
    id: string;
    /**
     * 引用的消息ID
     */
    refId: string;
    /**
     * 消息发送者ID
     */
    senderId: string;
    /**
     * 消息接收者ID
     */
    receiverId: string;
    /**
     * 聊天类型
     * 单聊single：receiverId则为用户接收者ID
     * 群聊group：receiverId则为群ID
     */
    chatType: MessageChatType;
    /**
     * 消息内容类型
     */
    contentType: MessageContent;
    /**
     * 消息内容
     * 其含义根据消息类型决定，
     * 例如type为文本，则content就是文本内容
     * type为图片，则可能指图片ID等
     */
    content: MessageContent;
    /**
     * 该条信息标记，
     * 当marks数组中存在一个类型为'withdraw'撤回的标记时，
     * 显示为已经撤回
     */
    marks: MessageMark[];
    /**
     * 时间戳（精确到毫秒）
     * 形如：2022-11-16T14:28:00.000
     */
    time: string;
}

