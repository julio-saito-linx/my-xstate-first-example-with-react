import { assign, createMachine, interpret } from "xstate";

interface CarContext {
  gasAmount: number;
  speed: number;
}

type CarEvent =
  | { type: "ACCELERATE"; amount: number }
  | { type: "BREAK"; amount: number }
  | { type: "CRASH" }
  | { type: "SHOOT" }
  | { type: "REFUEL"; gas: number };

const carMachine = createMachine<CarContext, CarEvent>(
  {
    /** @xstate-layout N4IgpgJg5mDOIC5QGMCGAnAdASwgGzAGIBBAYVIFEAZCgJWIBUKBtABgF1FQAHAe1mwAXbLwB2XEAA9EARgBsczKwDsrAMwBODQBYArLpnqATHIA0IAJ6JNMzEe0AOfRqP6Z21hoC+X82iy4BIS0FABiAKrUbJxIIHwCwmIS0gjaGpjaRkZOymqZDlnmVghqJpjKqhoyDjIayjK1unI+fhiYEOjYAG7YolCEAEIhxADS0RLxQiLisSlq+phq8g6lKvNGrA5F1vYZRmqscvbaMk1yMi0g-u2dPX2EpPQAygAS47GTiTOgKY7Ki6VXCtTqwjLltqldso5JoViZtI5WLpLtcOt1ev1XgB5LEMd48fhTJKzRBGQyYGTQk5qebrXTaCFkhyYJpqYG5DxglFtNF3fpkSg0ehMfFxQlfZLWJblVgyUoOBW6Q66MGM0F2SlqZRK7TnJFqZq+K5tABm2E69wF1DojBYHAm4umkoQ8kUKnUWj0BmMZkspLk6VY+XqTg0cgcoO5WDNFv6j2Ir1FnydJJdCiUqk0OjcPohNQyFScaThygcFR8RtEvAgcAk-gdCRTP0QAFpfcU20pWN2e73u+4ozh8GAG0TvlJENplBDMv9ztU5J59B6aYPeRjRxLU3l0hoaroNGzlPYdO3J647HIPEjajpQ4OwJJuHhq5BN02JwhF0Zyg4qh5FSqOoZ3kRYmiRUslQOINBxjDcPkdYlm0hRlaiUGEnANANjC1CsvCAA */
    id: "carMachine",
    initial: "idle",
    context: {
      gasAmount: 100,
      speed: 0,
    },
    states: {
      idle: {
        on: {
          ACCELERATE: {
            actions: ["accelerate", "consumeGas"],
            target: "driving",
          },
          REFUEL: {
            actions: "refuel",
          },
        },
      },
      driving: {
        on: {
          BREAK: {
            actions: "break",
          },
          CRASH: "exploded",
          SHOOT: "firing",
          ACCELERATE: {
            actions: ["accelerate", "consumeGas"],
          },
        },
      },
      exploded: {
        type: "final",
      },
      firing: {
        on: {
          ACCELERATE: {
            actions: ["accelerate", "consumeGas"],
            target: "driving",
          },
          CRASH: "exploded",
        },
      },
    },
  },
  {
    actions: {
      accelerate: assign({
        speed: (context, event: any) => context.speed + event.amount,
      }),
      break: assign({
        speed: (context, event: any) =>
          Math.max(0, context.speed - event.amount),
      }),
      consumeGas: assign({
        gasAmount: (context, event: any) =>
          Math.max(0, context.gasAmount - event.amount),
      }),
      refuel: assign({
        gasAmount: (context, event: any) => context.gasAmount + event.gas,
      }),
    },
  }
);
