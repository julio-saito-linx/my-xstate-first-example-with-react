import { assign, createMachine } from "xstate";

// https://egghead.io/lessons/xstate-use-xstate-null-events-and-transient-transitions-to-immediately-transition-states
export const tryMachine = createMachine(
  {
    /** @xstate-layout N4IgpgJg5mDOIC5SwA4EMDGYASY0BcwAnAOhQHsB3YyAeQDN6BiAFVoHF2AZAUQH0ACrQDqPAEoBtAAwBdRKAqwAlviXkAdvJAAPRAEYAHAHYSAZgBsegJwBWcwYBMpu+dMOANCACe+03pK29gZSplIGtqZGAL5RnqiYOHiEpBTURHTqrBzc-EKikrJaiipqmkg6+sZmloGOzuauHt6IBv4ALEZGBm0ObTbGDT0xcehYuATEZFQ0ELTqJAAWSZAkADZU4-hZnLx82DwAgizScuXFqhpauggONv5SRlI9UjYhBpFhnj4INlamJMYXlYjM4rOYpFY9MMQPExssUtN0rN5ksJhBFkooAtNtscntDsdCmdyMoLmVQNdbvdHs9XqZ3o8DF9EDY2v9TJCbL9XlYeoZobDEhMEWkMiQSRglKtVgRSiQIEpYGgAEarSC43a0ADKAGETkUSSVLuVKXcSA8ng4Xm8Pkzmghgm0zFJzFyrGFwVIHA4BaMhckpqLkeLYJLpbKNCQwOoVWqIBr+Nq9USFIayVdEFTzTSrXSGZ97UYbP9HEWHHonP09G0rDFYiB1OQIHAtILNsQDaTShmEABaPRGZl98zmqRj8cT8fRett+GBmYMeido3kioIHpDqpcoz2ctjtrmNm+hLtkUL1fnbsmxB+IcWAwkNm-Qx6Z9tKEzv2n+dIuaLZYQMu6bXggRhWEOfQ2AEeiROClhgQ8bTHnCwo-mKqKEOi6yUJsQFXhS+gOIO9qslYj5GDBVicnoNFgsh-qTKk57-miGJYrhxJdsaBHrt65pcm0ITcq0O7Ed8XL+MClHUbR5j0d+TG-vMEpSjKwGplxq7XGBQ4NCOpg1q4NhWsCYJIZ+J5zopYoqeGZLyoqsaQHh3FrhWYmIEWZHuiC4LGEW7nyVZiI2aGqkRvM0ZOYBnErj275OkRtyulYBjGKYkSmEOO4OI+DwWGEnR3ERdZREAA */
    id: "tryMachine",
    initial: "idle",
    predictableActionArguments: true,
    context: {
      tries: 0,
    },
    states: {
      idle: {
        on: { TRY: "trying" },
      },
      trying: {
        entry: ["incrementTries"],
        always: [
          { cond: "triesGraterThanThree", target: "success" },
          { target: "idle" },
        ],
      },
      success: {
        type: "final",
      },
    },
  },
  {
    actions: {
      incrementTries: assign({
        tries: (context, event) => {
          return context.tries + 1;
        },
      }),
    },
    guards: {
      triesGraterThanThree: (context, event) => {
        return context.tries > 3;
      },
    },
  }
);
