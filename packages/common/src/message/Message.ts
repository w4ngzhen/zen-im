import {MessageType} from "./MessageType";

export interface Message {
    /**
     * 表明该消息来自于那个会话中
     */
    chatSessionId: string;
    /**
     * 消息ID
     */
    messageId: string;
    /**
     * 原始消息ID，一般与消息ID一致，
     * 但面对撤回的时候，会有一个关联记录，或者引用消息
     */
    relatedMessageId: string;
    /**
     * 消息发送者ID
     */
    senderId: string;
    /**
     * 消息类型
     */
    type: MessageType;
    /**
     * 消息内容
     * 其含义根据消息类型决定，
     * 例如type为文本，则content就是文本内容
     * type为图片，则可能指图片ID等
     */
    content: string;
    /**
     * 时间戳（精确到毫秒）
     * 形如：2022-11-16T14:28:00.000
     */
    time: string;
}

