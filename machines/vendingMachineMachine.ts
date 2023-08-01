import { log } from "console";
import { assign, createMachine } from "xstate";

export const vendingMachineMachine = createMachine(
  {
    /** @xstate-layout N4IgpgJg5mDOIC5QDcwDsIEs1QLIEMBjAC2zADpMIAbMAYgGUBRAGSYGEAVAfQElOmuANoAGALqJQABwD2sTABdMMtJJAAPRACYALFvIBWAGwB2I6Z0BmHQA4AnEZEmANCACeiAIw3P5HzZsdUxNLIx0DLQBfSNdUDGw8IlI0CipaOgARJgAFAHkGfm4ARQBVAEEAJQEK0QkkEFl5JRU1TQQdXzsu7p6e1w8EH3IdExMbA08nSaCTO2iYkDQZCDg1OKwcAhIyNUbFZVV6toBaI3IRC8urq5d3RFPz66eLk2jY9A3E7ZTKGjBduT7FpHRA2fQmWxGLS6Tw6JwhfpeMHkSzeQLBULhKILdYJLbJCi4nAApoHVqIAx6cgmTyOOE6OxaIzWOyIhDefSogJhSx2ERaWmeeaRIA */
    id: "vendingMachine",
    initial: "idle",
    predictableActionArguments: true,
    context: {
      deposited: 0,
    },
    states: {
      idle: {
        entry: ["logEntry"],
        exit: ["logExit"],
        on: {
          SELECT_ITEM: {
            target: "vending",
            actions: ["logEvent"],
            cond: "depositedEnough",
          },
          DEPOSIT_QUARTER: {
            actions: ["logEvent", "addQuarter"],
          },
        },
      },
      vending: {},
    },
  },
  {
    actions: {
      addQuarter: assign({
        deposited: (context) => {
          console.log("addQuarter: --  context.deposited: ", context.deposited);
          const newValue = context.deposited + 25;
          console.log("addQuarter: --  newValue: ", newValue);
          return newValue;
        },
      }),

      logEvent: (context, state) => {
        console.log(`logEvent: ${state.type}:`, context);
      },

      logEntry: (context, state) => {
        console.log(`logEntry: ${state.type}:`, context);
      },
      logExit: (context, state) => {
        console.log(`logExit: ${state.type}:`, context);
      },
    },
    guards: {
      depositedEnough: (context) => {
        const wasDepositEnouth = context.deposited >= 100;
        console.log("--  wasDepositEnouth: ", wasDepositEnouth);
        return wasDepositEnouth;
      },
    },
  }
);
