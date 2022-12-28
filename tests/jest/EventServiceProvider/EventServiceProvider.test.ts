import { EventEmitterBus } from "../../..";

import { EventServiceProvider } from "./EventServiceProvider";

describe("Teste Event Service Provider", () => {
    test("Teste Event Service Provider", async () => {
        const bus = new EventEmitterBus();
        const provider = new EventServiceProvider(bus);
        await expect(provider.boot()).resolves.toBeUndefined();
        await bus.dispatch("test", "test");
        expect(provider["listeners"].test[0].listener.handler).toHaveBeenCalledWith("test");
        expect(provider["listeners"].test[0].listener.handler).toReturnWith("test");
        expect(provider["listeners"].test[0].listener.handler).toBeCalledTimes(1);
        expect(provider["listeners"].test[1].listener.handler).toHaveBeenCalledWith("test");
        expect(provider["listeners"].test[1].listener.handler).toReturnWith("test");
        expect(provider["listeners"].test[1].listener.handler).toBeCalledTimes(1);

        await expect(provider.shutdown()).resolves.toBeUndefined();
        await bus.dispatch("test", "test");
        expect(provider["listeners"].test[0].listener.handler).toBeCalledTimes(1);
        expect(provider["listeners"].test[1].listener.handler).toBeCalledTimes(1);
    });
});
