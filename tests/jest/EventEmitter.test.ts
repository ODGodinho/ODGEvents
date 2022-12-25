import { EventEmitter } from "node:events";

import { EventEmitterBus } from "../../src/index";

describe("Test EventEmitterBus", () => {
    const eventName = "test";
    const eventSend = "SendMessage";

    test("Test Event EventEmitter Instance", async () => {
        expect(new EventEmitterBus()).toBeInstanceOf(EventEmitterBus);
        expect(new EventEmitterBus()["eventEmitter"]).toBeInstanceOf(EventEmitter);
    });

    test("Test Event Dispatch", async () => {
        const eventBus = new EventEmitterBus<{ test: string }>();

        const mockCallback = jest.fn((eventMessage: string) => eventMessage);

        eventBus.subscribe(eventName, mockCallback);
        eventBus.dispatch(eventName, eventSend);
        expect(mockCallback).toHaveBeenCalledWith(
            eventSend,
        );
    });

    test("Test Event Disable", async () => {
        const eventBus = new EventEmitterBus<{ test: string }>();

        const mockCallback = jest.fn((eventMessage: string) => eventMessage);

        eventBus.subscribe(eventName, mockCallback);
        eventBus.unsubscribe(eventName, mockCallback);
        eventBus.dispatch(eventName, eventSend);
        expect(mockCallback).not.toHaveBeenCalledWith(
            eventSend,
        );
        expect(mockCallback.mock.calls.length).toBe(0);
    });

    test("Test Symbol Event", async () => {
        const symbolEventName = Symbol("test");
        const eventBus = new EventEmitterBus<{
            [symbolEventName]: string;
        }>();
        const mockCallback = jest.fn((eventMessage: string) => eventMessage);

        eventBus.subscribe(symbolEventName, mockCallback);
        eventBus.dispatch(symbolEventName, eventSend);

        expect(mockCallback).toHaveBeenCalledWith(
            eventSend,
        );
    });

    test("Test Multiple Subscribe", async () => {
        const eventBus = new EventEmitterBus<{ test: string }>();

        const mockCallback = jest.fn((eventMessage: string) => eventMessage);

        eventBus.subscribe(eventName, mockCallback);
        eventBus.subscribe(eventName, mockCallback);
        eventBus.dispatch(eventName, eventSend);
        expect(mockCallback).toHaveBeenCalledWith(
            eventSend,
        );
        expect(mockCallback.mock.calls.length).toBe(2);
    });
});
