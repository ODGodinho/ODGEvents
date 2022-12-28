import {
    type EventListener,
    EventServiceProvider as EventServiceProviderBase,
    type EventBusInterface,
} from "../../../src";

import { TestEventListeners } from "./TestEventListeners";

export class EventServiceProvider extends EventServiceProviderBase<Record<string, unknown>> {

    protected listeners: EventListener<Record<string, unknown>> = {
        "test": [
            {
                listener: new TestEventListeners(),
                options: {},
            },
            {
                listener: new TestEventListeners(),
                options: {},
            },
        ],
    };

    public constructor(
        protected bus: EventBusInterface<Record<string, unknown>>,
    ) {
        super();
    }

}
