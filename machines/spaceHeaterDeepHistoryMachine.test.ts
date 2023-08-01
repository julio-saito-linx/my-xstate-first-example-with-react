import { interpret } from "xstate";
import { spaceHeaterDeepHistoryMachine } from "./spaceHeaterDeepHistoryMachine";

// pnpm jest --watch --testPathPattern=spaceHeaterDeepHistoryMachine
describe("spaceHeaterDeepHistoryMachine", () => {
  // https://egghead.io/lessons/xstate-recall-previous-states-with-xstate-history-states-nodes
  it("pararel states with history deep", () => {
    const interpreter = interpret(spaceHeaterDeepHistoryMachine);

    interpreter.onTransition((state) => {
      console.log(`> [${state.event.type}] State:`, state.value);
    });

    interpreter.start();
    interpreter.send("TOGGLE_POWER");
    interpreter.send("TOGGLE_HEAT");
    interpreter.send("TOGGLE_OSC");
    interpreter.send("TOGGLE_POWER");
    interpreter.send("TOGGLE_POWER");
  });
});
