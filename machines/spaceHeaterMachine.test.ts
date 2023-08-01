import { interpret } from "xstate";
import { spaceHeaterMachine } from "./spaceHeaterMachine";

// pnpm jest --watch --testPathPattern=spaceHeaterMachine
describe("spaceHeaterMachine", () => {
  it("pararel states", () => {
    const interpreter = interpret(spaceHeaterMachine);

    interpreter.onTransition((state) => {
      console.log(`> [${state.event.type}] State:`, state.value);
    });

    interpreter.start();
    interpreter.send("TOGGLE_POWER");
    interpreter.send("TOGGLE_HEAT");
    interpreter.send("TOGGLE_OSC");
  });
});
