import {Subject} from 'rxjs';

/**
 * 事件总线
 */
export abstract class EventBus {

    protected constructor() {
        console.debug('创建一个事件总线对象');
    }

    abstract emit(eventName: string, eventData?: any): void;

    abstract on(eventName: string, listener: (eventData?: any) => void): void;
}

/**
 * 一个基于RxJs的事件总线，可以按照自己的需求切换为其他的实现
 */
export class EventBusBaseRxJs extends EventBus {

    private _subject: Subject<{
        eventName: string;
        eventData: any;
    }>;

    constructor() {
        super();
        this._subject = new Subject<{
            eventName: string;
            eventData: any;
        }>();
    }

    emit(eventName: string, eventData: any): void {
        console.debug('emit event: ' + eventName);
        this._subject.next({
            eventName,
            eventData
        })
    }

    on(eventName: string, listener: (eventData: any) => void): void {
        console.debug('add event listener: ' + eventName);
        this._subject.subscribe(ev => {
            const {eventName: _eventName, eventData: _eventData} = ev;
            if (eventName !== _eventName) {
                return;
            }
            try {
                console.debug(`event "${eventName}" trigger`, _eventData);
                listener(_eventData);
            } catch (e) {
                console.error(`event ${eventName} handle failed.`, e);
            }
        })
    }
}

const createEventBus = (): EventBus => new EventBusBaseRxJs();

export {
    createEventBus
}
