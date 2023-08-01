import { interpret } from "xstate";
import { echoCallbackMachine } from "./echoCallbackMachine";

// pnpm jest --watch --testPathPattern=echoCallbackMachine
describe("echoCallbackMachine", () => {
  it("pararel states", (done) => {
    const interpreter = interpret(echoCallbackMachine);

    interpreter.onTransition((state) => {
      console.log(`> [${state.event.type}] State:`, state.value);

      if (state.event.type === "ECHO") {
        done();
      }
    });

    interpreter.start();

    // call SPEAK event and ECHO action will be called
    interpreter.send("SPEAK");
  }, 500);
});
