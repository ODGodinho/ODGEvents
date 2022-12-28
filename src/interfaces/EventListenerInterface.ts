import { type EventObjectType } from ".";

/**
 * Event Listeners interface
 *
 * @interface EventListenerInterface
 * @template {EventObjectType} Events Interface with event properties
 * @template {string | symbol} EventName Current Event Name
 */
export interface EventListenerInterface<Events extends EventObjectType, EventName extends keyof Events> {

    /**
     * Handler event callback
     *
     * @param {Events[EventName]} argument Received Argument
     * @memberof EventListenerInterface
     */
    handler(argument: Events[EventName]): Promise<void> | void;

}
