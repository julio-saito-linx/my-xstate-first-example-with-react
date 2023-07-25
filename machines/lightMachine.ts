import { assign, createMachine, interpret } from "xstate";

const schema = {
  context: {} as { counter: number },
  events: {} as {
    type: "TIMER";
  },
};

export const lightMachine = createMachine(
  {
    /** @xstate-layout N4IgpgJg5mDOIC5QBsCWUAWAXAsgQwGMNUA7MAOliwH0BxAJzDBIGIAVASRwFEAlAbQAMAXUSgADgHtYqLKkkkxIAB6IAjADYN5QQHZBAFjUGAzACYAnJYCsugDQgAnojNmD5ABwWPJowZ+6BoIeBgC+oQ5omLiExGSUNACaYMjIkgDu7Fx8QqJIIFIycgpKqggGruTWrmrWHj5mHhqCmg7OCK7uXj5+AUEh4ZHo2PhEpBRU1LyQWTwCIkqFsvKK+WUVZlU1dQ1NLRptiB5q5Aa6uh7VZrpqVrUm4REgJJIQcEpRI7Hji9LLJWtEABaA5OYHWcgWKHQmEwh5PT4xMbxSYMJirCR-YoYlSICqHBBqNSCchmExNC4WEz6AwaMzWQYgRGjOITJIpNLpX5FFalRAmQQkkxaSwWawackWQwEtweHS6KnBKGNYJqRnM74omjTCDc-44srWcWeNQeQxBDSBaz+AlEza6ckaIy6ZqCKHUx6hIA */
    id: "lightMachine",
    initial: "st_Green",
    predictableActionArguments: true,
    schema,
    context: {
      counter: 0,
    },
    states: {
      st_Green: {
        on: {
          TIMER: {
            target: "st_Yellow",
            actions: "act_timer",
          },
        },
      },
      st_Yellow: {
        on: {
          TIMER: {
            target: "st_Red",
            actions: "act_timer",
          },
        },
      },
      st_Red: {
        on: {
          TIMER: {
            target: "st_Green",
            actions: "act_timer",
          },
        },
      },
    },
  },
  {
    actions: {
      act_timer: assign({
        counter: (context, event) => {
          return context.counter + 1;
        },
      }),
    },
  }
);
