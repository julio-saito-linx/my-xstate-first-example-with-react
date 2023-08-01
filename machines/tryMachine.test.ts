import { interpret } from "xstate";
import { tryMachine } from "./tryMachine";

// pnpm jest --watch --testPathPattern=tryMachine
describe("tryMachine", () => {
  it("pararel states", (done) => {
    const interpreter = interpret(tryMachine);

    interpreter.onTransition((state) => {
      console.log(
        `> [${state.event.type}] State:`,
        state.value,
        state.context.tries
      );

      if (state.matches("success")) {
        expect(state.context.tries).toBe(4);
        done();
      }
    });

    interpreter.start();
    // you must try 4 times to get to success state
    interpreter.send("TRY"); // 1
    interpreter.send("TRY"); // 2
    interpreter.send("TRY"); // 3
    interpreter.send("TRY"); // 4
  }, 2000);
});
