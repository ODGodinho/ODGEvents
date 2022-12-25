export type EventType = string | symbol;

type Handler<ParameterType> = (argument: ParameterType) => unknown;

/**
 * Event bus interface IOC
 *
 * @interface EventBusInterface
 * @template {Record<EventType, unknown>} Events
 */
export interface EventBusInterface<Events extends Record<EventType, unknown>> {

    /**
     * Subscribe to an event
     *
     * @template {EventType} Key
     * @param {Key} event
     * @param {Handler<Events[Key]>} listener
     * @memberof EventBusInterface
     */
    subscribe<Key extends keyof Events>(
        event: Key,
        listener: Handler<Events[Key]>,
    ): void;

    /**
     * Unsubscribe function to an event
     *
     * @template {EventType} Key
     * @param {Key} event
     * @param {Handler<Events[Key]>} listener
     * @memberof EventBusInterface
     */
    unsubscribe<Key extends keyof Events>(
        event: Key,
        listener: Handler<Events[Key]>,
    ): void;

    /**
     * Dispatch an event
     *
     * @template {EventType} Key
     * @param {Key} event
     * @param {Events[Key]} handler
     * @memberof EventBusInterface
     */
    dispatch<Key extends keyof Events>(
        event: Key,
        handler: Events[Key],
    ): void;

}
