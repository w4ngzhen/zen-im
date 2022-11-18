import {Subject} from 'rxjs';

/**
 * 事件总线
 */
export abstract class EventBus {

    protected constructor() {
        console.debug('创建一个事件总线对象');
    }

    abstract emit(eventName: string, ...args: any[]): void;

    abstract on(eventName: string, listener: (...args: any[]) => void): void;
}

/**
 * 一个基于RxJs的事件总线，可以按照自己的需求切换为其他的实现
 */
export class EventBusBaseRxJs extends EventBus {

    private _subject: Subject<{
        eventName: string;
        data: any;
    }>;

    constructor() {
        super();
        this._subject = new Subject<{
            eventName: string;
            data: any;
        }>();
    }

    emit(eventName: string, ...args: any[]): void {
        console.debug('emit event: ' + eventName);
        this._subject.next({
            eventName,
            data: args
        })
    }

    on(eventName: string, listener: (...args: any[]) => void): void {
        console.debug('on event: ' + eventName);
        this._subject.subscribe(ev => {
            const {eventName: evName, data} = ev;
            if (eventName !== evName) {
                return;
            }
            try {
                console.debug('prepare trigger event: ' + eventName);
                listener(data);
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
