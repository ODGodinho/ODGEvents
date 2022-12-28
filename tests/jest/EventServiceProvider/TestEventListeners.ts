import { type EventListenerInterface } from "../../../src";

export class TestEventListeners implements EventListenerInterface<Record<string, unknown>, string> {

    public handler = jest.fn<never, unknown[]>(() => this.test as never);

    private readonly test: string = "test";

}
