import { interpret } from "xstate";
import { lightMachine } from "./lightMachine";

// pnpm jest --watch --testPathPattern=lightMachine
describe("lightMachine", () => {
  it("should transition: st_Yellow -> st_Red -> st_Green when receiving TIMER event", () => {
    let counterLocal = 0;
    const interpreter = interpret(lightMachine);

    interpreter.onChange((context) => {
      // console.log(context);
      counterLocal = context.counter;
    });

    interpreter.start("st_Yellow");
    expect(counterLocal).toBe(0);

    // st_Yellow -> st_Red
    interpreter.send("TIMER");
    expect(counterLocal).toBe(1);
    expect(interpreter.getSnapshot().value).toBe("st_Red");

    // st_Red -> st_Green
    interpreter.send("TIMER");
    expect(counterLocal).toBe(2);
    expect(interpreter.getSnapshot().value).toBe("st_Green");

    // st_Green -> st_Yellow
    interpreter.send("TIMER");
    expect(counterLocal).toBe(3);
    expect(interpreter.getSnapshot().value).toBe("st_Yellow");

    // st_Yellow -> st_Red
    interpreter.send("TIMER");
    expect(counterLocal).toBe(4);
    expect(interpreter.getSnapshot().value).toBe("st_Red");
  });
});
