import { interpret } from "xstate";
import { vendingMachineMachine } from "./vendingMachineMachine";

// pnpm jest --watch --testPathPattern=vendingMachineMachine
describe("vendingMachineMachine", () => {
  it("should transition if can", () => {
    let counterLocal = 0;
    const interpreter = interpret(vendingMachineMachine);

    interpreter.onTransition((state) => {
      console.log(
        "DEBUG: state: ",
        state.event.type,
        ";",
        state.value,
        ";",
        state.context
      );
    });

    interpreter.start();

    interpreter.send("SELECT_ITEM");

    interpreter.send("DEPOSIT_QUARTER");
    interpreter.send("DEPOSIT_QUARTER");
    interpreter.send("DEPOSIT_QUARTER");
    interpreter.send("SELECT_ITEM");
    interpreter.send("DEPOSIT_QUARTER");
    interpreter.send("SELECT_ITEM");
  });
});
