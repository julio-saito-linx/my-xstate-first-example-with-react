import { interpret } from "xstate";
import { callInnerMachine } from "./callInnerMachine";

// pnpm jest --watch --testPathPattern=callInnerMachine
describe("callInnerMachine", () => {
  it("machine that call another machine", (done) => {
    const interpreter = interpret(callInnerMachine);

    interpreter.onTransition((state) => {
      console.log(`> [${state.event.type}] State: ${state.value}`);

      if (state.matches("done")) {
        done();
      }
    });

    interpreter.start();

    interpreter.send("ACTIVATE");
    interpreter.send("STEP_TO_CHILD");
    interpreter.send("STEP_TO_CHILD");
  }, 500);
});
