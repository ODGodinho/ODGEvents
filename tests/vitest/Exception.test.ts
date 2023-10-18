import { Exception } from "@odg/exception";

import { EventBusNotImplementedException } from "../../src/Exceptions";

describe("Exception.test.ts", () => {
    test("Exception instance test", () => {
        expect(new EventBusNotImplementedException("")).toBeInstanceOf(Exception);
    });
});
