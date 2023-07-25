import { interpret } from "xstate";
import { lightMachine } from "./lightMachine";

describe("lightMachine", () => {
  it("should transition from green to yellow when receiving TIMER event", () => {
    const lightService = interpret(lightMachine).start("green");
    lightService.send("TIMER");
    expect(lightService.getSnapshot().value).toBe("yellow");
  });

  it("should transition from yellow to red when receiving TIMER event", () => {
    const lightService = interpret(lightMachine).start("yellow");
    lightService.send("TIMER");
    expect(lightService.getSnapshot().value).toBe("red");
  });

  it("should transition from red to green when receiving TIMER event", () => {
    const lightService = interpret(lightMachine).start("red");
    lightService.send("TIMER");
    expect(lightService.getSnapshot().value).toBe("green");
  });
});
