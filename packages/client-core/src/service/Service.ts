import {EventBus} from "../event/EventBus";

export abstract class Service {
    get eventBus(): EventBus {
        return this._eventBus;
    }

    abstract get serviceName(): string;

    private readonly _eventBus: EventBus;

    protected constructor(eventBus: EventBus) {
        this._eventBus = eventBus;
    }

    async onAppStart(): Promise<void> {

    }

    async onAfterLogin(): Promise<void> {

    }

    async onAfterLogout(): Promise<void> {

    }

    async onAppExit(): Promise<void> {

    }
}
