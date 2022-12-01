export interface MessageMark {
    /**
     * 标记类型
     */
    type: MessageMarkType;
    /**
     * 标记时间
     */
    time: string;
    /**
     * 标记者ID
     */
    markerId: string;
}

/**
 * withdraw：撤回
 * plusOne：+1
 * good：点赞
 */
export type MessageMarkType
    = 'withdraw'
    | 'plusOne'
    | 'good'
