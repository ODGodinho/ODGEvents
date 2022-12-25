import EventEmitter from "node:events";

import { type EventBusInterface, type EventType } from "../interfaces/EventBusInterface";

export class EventEmitterBus<Events extends Record<EventType, unknown>> implements EventBusInterface<Events> {

    protected readonly eventEmitter: EventEmitter;

    public constructor() {
        // eslint-disable-next-line unicorn/prefer-event-target
        this.eventEmitter = new EventEmitter();
    }

    public subscribe<Key extends keyof Events>(event: Key, listener: (argument: Events[Key]) => unknown): void {
        this.eventEmitter.on(this.getEventName(event), listener);
    }

    public unsubscribe<Key extends keyof Events>(event: Key, listener: (argument: Events[Key]) => unknown): void {
        this.eventEmitter.off(this.getEventName(event), listener);
    }

    public dispatch<Key extends keyof Events>(event: Key, handler: Events[Key]): void {
        this.eventEmitter.emit(this.getEventName(event), handler);
    }

    private getEventName<Key extends keyof Events>(event: Key): EventType {
        return typeof event === "symbol" ? event : String(event);
    }

}
