import { createMachine, interpret } from "xstate";

export const lightMachine = createMachine(
  {
    /** @xstate-layout N4IgpgJg5mDOIC5QBsCWUAWAXAdFATmGAHYDEAKgJICyAogEoDaADALqKgAOA9rKlqm7EOIAB6IAjADYpOZgHZmAFmYAOAMxL1q1QE5VAGhABPRACZmZnGYnz1U9eua7tZgL5ujaTLmNhkyNwA7hQ0DCzsSCA8fAJCIuII6rpKOACsqmnMyVqKShJKRqYIFlY2dg5OLqruniDe2DiEEKF0TGwiMfyCwlGJOemZ2SnqeQVFiKoSOEry8qr5aY5pabrMUh51xNwQcCINWJ283fF9iAC0UhMI52k4ug+PT0-qHl7ojQREvVzHcT9iRBKMzXVTydJpeRSVRSJYSMHyWZveofXz+QJBI6xHoJczyO5pAoOCTOdQSQlXEzmSw4eS2ewPeEpKaqZEHJqQLEnAGJLKpSy6MxSGwwpzqMyFKkINZySHQ2FkhGEzZuIA */
    id: "light",
    initial: "green",
    predictableActionArguments: true,
    states: {
      green: {
        on: {
          TIMER: "yellow",
        },
      },
      yellow: {
        on: {
          TIMER: "red",
        },
      },
      red: {
        on: {
          TIMER: "green",
        },
      },
    },
  },
  {
    actions: {
      log: (context, event) => {
        console.log(context, event);
      },
    },
  }
);
