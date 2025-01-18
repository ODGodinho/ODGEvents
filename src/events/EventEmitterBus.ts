import EventEmitter2, { type ListenerFn } from "eventemitter2";

import {
    type EventOptions,
    type EventBusInterface,
    type EventNameType,
    type HandlerEventCallback,
    type EventObjectType,
} from "../interfaces";

export class EventEmitterBus<Events extends EventObjectType> implements EventBusInterface<Events> {

    protected readonly eventEmitter: EventEmitter2;

    public constructor() {
        this.eventEmitter = new EventEmitter2();
    }

    public async subscribe<Key extends keyof Events>(
        event: Key,
        listener: HandlerEventCallback<Events[Key]>,
        options?: EventOptions,
    ): Promise<void> {
        if (options?.once) this.eventEmitter.once(this.getEventName(event), listener as ListenerFn);
        else this.eventEmitter.on(this.getEventName(event), listener as ListenerFn);
    }

    public async unsubscribe<Key extends keyof Events>(
        event: Key,
        listener: HandlerEventCallback<Events[Key]>,
    ): Promise<void> {
        this.eventEmitter.off(this.getEventName(event), listener as ListenerFn);
    }

    public async dispatch<Key extends keyof Events>(
        event: Key,
        handler: Events[Key],
    ): Promise<void> {
        await this.eventEmitter.emitAsync(this.getEventName(event), handler);
    }

    /**
     * Convert event name to valid event name
     *
     * @template {string} Key
     * @param {Key} event Event
     * @returns {EventNameType}
     */
    private getEventName<Key extends keyof Events>(event: Key): EventNameType {
        return typeof event === "symbol" ? event : String(event);
    }

}
