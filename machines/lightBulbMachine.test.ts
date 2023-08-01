import { interpret } from "xstate";
import { lightBulbMachine } from "./lightBulbMachine";

describe("lightBulbMachine", () => {
  it("should transition", () => {
    const interpreter = interpret(lightBulbMachine);

    interpreter.onTransition((state) => {
      console.log(`> [${state.event.type}] State: ${state.value}`);
    });

    interpreter.start();
    interpreter.send("TOGGLE");
    interpreter.send("BREAK");
  });
});
