/**
 * plainText：普通文本
 * image：图片
 */
export type MessageContentType
    = 'plainText'
    | 'image'

/**
 * 匹配对应的MessageContentType
 */
export type MessageContent
    = MessageContentPlainText
    | MessageContentImage

export type MessageContentPlainText = {
    text: string;
}

export type MessageContentImage = {
    isLocal: boolean;
    base64: string;
}
