/* eslint-disable @typescript-eslint/member-ordering */
import { type EventOptions } from "..";
import { type EventObjectType, type EventBusInterface, type EventListenerInterface } from "../interfaces";

export interface EventListenerOptions<
    Events extends EventObjectType,
    EventName extends keyof Events = keyof Events,
> {
    listener: EventListenerInterface<Events, EventName>;
    options: EventOptions;
}

export type EventListener<
    Events extends EventObjectType,
    EventName extends keyof Events = keyof Events,
> = Record<EventName, Array<EventListenerOptions<Events, EventName>>>;

export type EventListenerNotation<
    Events extends EventObjectType,
    EventName extends keyof Events = keyof Events,
> = Record<EventName, Array<Partial<EventListenerOptions<Events, EventName>> & { containerName: string }>>;

export abstract class EventServiceProvider<Events extends EventObjectType> {

    private readonly listenersMap = new Map<
        string,
        Array<(argument: Events[keyof Events]) => Promise<void> | void>
    >();

    protected abstract bus: EventBusInterface<Events>;

    protected abstract listeners: EventListener<Events>;

    /**
     * Boot Event Service Provider
     *
     * @memberof EventServiceProvider
     */
    public async boot(): Promise<void> {
        for (const [ event, listeners ] of Object.entries(this.listeners)) {
            for (const listener of listeners) {
                const bind = listener.listener.handler.bind(listener.listener);
                this.listenersMap.set(
                    event,
                    [
                        ...this.listenersMap.get(event) ?? [],
                        bind,
                    ],
                );
                await this.bus.subscribe(
                    event,
                    bind,
                    listener.options,
                );
            }
        }
    }

    /**
     * Event Service provider unregister functions
     *
     * @memberof EventServiceProvider
     */
    public async shutdown(): Promise<void> {
        for (const [ event, listeners ] of this.listenersMap.entries()) {
            for (const listener of listeners) {
                await this.bus.unsubscribe(
                    event,
                    listener,
                );
            }
        }
    }

}
