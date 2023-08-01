const { createMachine } = require("xstate");

export const lightBulbMachine = createMachine(
  {
    /** @xstate-layout N4IgpgJg5mDOIC5QBsCWUAWAXAQgV2QCMA6NLAYhwCUBRAQQGkBtABgF1FQAHAe1lSyoeAO04gAHogAsATgDMxAOyKAbAEYWiljLUyAHCqlyANCACeiAEyWArMUvbLcm4pt6WN+QF8vptJlwCEjJyABUAeQBxSIAZGlYOJBBefkERMUkENVViTRYpbSk9GRlLNUtTCyy9PWI1ApUbNzUbFhV2mx8-dGx8ImI8YRDqemZ2MRSBIVEkzOyVXK0CmSKSsorzRD01YillbcUWvT2bIy6Qf16ggaGBMKjY+PGkybSZ0DmcvOXV0vLKqxyWrqGRaAyWKRuRS2Hy+EDCHgQOBiS6BIgTPhTdKzRAAWhUAIQuLsJVJZPJcnOqL6wQEGNS0wyiDkLBYxDklj0hxclhk+RYGyqDks9myciMNhUHOc0KpPTRJEGZHpWPeEmkgqsnPsshkIKk6msiikcoCNOIhAATjwANZgNWvRk4hAqNq7RRAlYOPQsoqEtRcuoFSwqSyKA5SNRR2FeIA */
    id: "lightBulb",
    initial: "unlit",
    predictableActionArguments: true,
    states: {
      unlit: {
        on: {
          BREAK: "broken",
          TOGGLE: "lit",
        },
      },
      lit: {
        // fire exitFromLit when we exit lit state
        entry: ["entryOnLit"],
        exit: ["exitFromLit"],
        on: {
          BREAK: {
            target: "broken",
            actions: ["logTransition"],
          },
          TOGGLE: "unlit",
        },
      },
      // fire logBroken when we enter the broken state
      broken: {
        entry: ["logBroken"],
      },
    },
  },
  {
    actions: {
      entryOnLit: () => {
        console.log("0 Entering lit state");
      },
      exitFromLit: () => {
        console.log("1 Exit from lit state");
      },
      logTransition: () => {
        console.log("2 Transitioning from lit to unlit");
      },
      logBroken: () => {
        console.log("3 Entering broken state");
      },
    },
  }
);
