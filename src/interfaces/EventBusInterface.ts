/**
 * Event Name valid types
 */
export type EventNameType = string | symbol;

/**
 * Event handler callback to register
 */
export type HandlerEventCallback<ParameterType> = (argument: ParameterType) => Promise<void> | void;

/**
 * Create your object event with this type
 */
export type EventObjectType = Record<EventNameType, unknown>;

/**
 * Event Options.
 *
 * @interface EventOptions
 */
export interface EventOptions {

    /**
     * If true, the listener would only get called once after which it would be removed.
     *
     * @type {boolean}
     * @memberof EventOptions
     */
    once?: boolean;

}

/**
 * Event bus interface IOC
 *
 * @interface EventBusInterface
 * @template {EventObjectType} Events
 */
export interface EventBusInterface<Events extends EventObjectType> {

    /**
     * Subscribe to an event
     *
     * @template {EventNameType} Key
     * @param {Key} event
     * @param {HandlerEventCallback<Events[Key]>} listener
     * @memberof EventBusInterface
     */
    subscribe<Key extends keyof Events>(
        event: Key,
        listener: HandlerEventCallback<Events[Key]>,
        options?: EventOptions,
    ): Promise<void>;

    /**
     * Unsubscribe function to an event
     *
     * @template {EventNameType} Key
     * @param {Key} event
     * @param {HandlerEventCallback<Events[Key]>} listener
     * @memberof EventBusInterface
     */
    unsubscribe<Key extends keyof Events>(
        event: Key,
        listener: HandlerEventCallback<Events[Key]>,
    ): Promise<void>;

    /**
     * Dispatch an event
     *
     * @template {EventNameType} Key
     * @param {Key} event
     * @param {Events[Key]} handler
     * @memberof EventBusInterface
     */
    dispatch<Key extends keyof Events>(
        event: Key,
        handler: Events[Key],
    ): Promise<void>;

}
