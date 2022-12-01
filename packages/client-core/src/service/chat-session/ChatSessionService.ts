import _ from 'lodash';
import {ChatSession} from "../../entity/chat-session/ChatSession";
import {Message} from "@zen-im/common";
import {Service} from "../Service";
import {EventBus} from "../../event/EventBus";

export class ChatSessionService extends Service {

    get serviceName(): string {
        return "ChatSessionService";
    }

    private _chatSessions: ChatSession[];

    private _currentChatSessionId: string;

    constructor(eventBus: EventBus) {
        super(eventBus);
        this._chatSessions = [];
        this._currentChatSessionId = '';
    }

    get currentChatSession(): ChatSession | undefined {
        return this.getChatSessionById(this._currentChatSessionId);
    }

    get currentChatSessionId(): string {
        return this._currentChatSessionId;
    }

    set currentChatSessionId(chatSessionId: string) {
        this._currentChatSessionId = _.isEmpty(chatSessionId) ? '' : chatSessionId;
    }

    private getChatSessionById(sessionId: string) {
        return _.isEmpty(sessionId)
            ? undefined
            : this._chatSessions.find(cs => cs.id === sessionId);
    }

}
