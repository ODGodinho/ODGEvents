import EventEmitter2 from "eventemitter2";
import { vi } from "vitest";

import { EventEmitterBus } from "../../src/index";

describe("Test EventEmitterBus", () => {
    const eventName = "test";
    const eventSend = "SendMessage";

    test("Test Event EventEmitter Instance", async () => {
        expect(new EventEmitterBus()).toBeInstanceOf(EventEmitterBus);
        expect(new EventEmitterBus()["eventEmitter"]).toBeInstanceOf(EventEmitter2);
    });

    test("Test Event Dispatch", async () => {
        const eventBus = new EventEmitterBus<{ test: string }>();

        const mockCallback = vi.fn(async (eventMessage: string) => {
            expect(eventMessage).toBe(eventSend);
        });

        await eventBus.subscribe<"test">(eventName, mockCallback);
        await eventBus.dispatch(eventName, eventSend);
        expect(mockCallback).toHaveBeenCalledWith(
            eventSend,
        );
    });

    test("Test Event Disable", async () => {
        const eventBus = new EventEmitterBus<{ test: string }>();

        const mockCallback = vi.fn(async (eventMessage: string) => {
            expect(eventMessage).toBe(eventSend);
        });

        await eventBus.subscribe(eventName, mockCallback);
        await eventBus.unsubscribe(eventName, mockCallback);
        await eventBus.dispatch(eventName, eventSend);
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
        const mockCallback = vi.fn(async (eventMessage: string) => {
            expect(eventMessage).toBe(eventSend);
        });

        await eventBus.subscribe(symbolEventName, mockCallback);
        await eventBus.dispatch(symbolEventName, eventSend);

        expect(mockCallback).toHaveBeenCalledWith(
            eventSend,
        );
    });

    test("Test Multiple Subscribe", async () => {
        const eventBus = new EventEmitterBus<{ test: string }>();

        const mockCallback = vi.fn(async (eventMessage: string) => {
            expect(eventMessage).toBe(eventSend);
        });

        await eventBus.subscribe(eventName, mockCallback);
        await eventBus.subscribe(eventName, mockCallback);
        await eventBus.dispatch(eventName, eventSend);
        expect(mockCallback).toHaveBeenCalledWith(
            eventSend,
        );
        expect(mockCallback.mock.calls.length).toBe(2);
    });

    test("Test Once Event", async () => {
        const eventBus = new EventEmitterBus<{ test: string }>();

        const mockCallback = vi.fn(async (eventMessage: string) => {
            expect(eventMessage).toBe(eventSend);
        });

        await eventBus.subscribe(eventName, mockCallback, { once: true });
        await eventBus.dispatch(eventName, eventSend);
        await eventBus.dispatch(eventName, eventSend);
        expect(mockCallback).toHaveBeenCalledWith(
            eventSend,
        );
        expect(mockCallback.mock.calls.length).toBe(1);
    });
});
