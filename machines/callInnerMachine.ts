const { Machine, send } = require("xstate");

const childMachine = Machine({
  /** @xstate-layout N4IgpgJg5mDOIC5QGMAWBLANhAdLALmAA4CMAxAMoAqAogAoDaADALqKhED2s6+6nAO3YgAHohIA2EjiYB2JgBYSkgBwAmEmpUBOADQgAnonU41agMw6zy7SQVMJAX0f60WXAWJrKtRq2FcPHyCwmIIltIArEyRkZba9gpq2rL6RggmZvHWJLb2Ts76ApwQcMJu2AHcvPxCSKKIALQSaU0FrhjYeISkVUG1oYhJrRlqOLIWVhq5dg6FIBUePWp9NSH1YWoSYwrmkZoTkSrmTEwqIyYT2dN5cy4LnUvE5qvBdaBhCiYq8mqRCvsJBImCRIi1DMZpApZLIVF8YslYZE1M5nEA */
  id: "child",
  initial: "step1",
  states: {
    step1: {
      on: { STEP: "step2" },
    },
    step2: {
      on: { STEP: "step3" },
    },
    step3: {
      type: "final",
    },
  },
});

export const callInnerMachine = Machine({
  /** @xstate-layout N4IgpgJg5mDOIC5QAcCGAnMA7ALgOgEsIAbMAYgEEBhAFQEkA1CmgUQG0AGAXURQHtYBHAT5ZeIAB6IAjADZpeDgHYOAFmkBOAByqArAGYNq4wBoQATxkaOeAEz79u6-tmrb0rfoC+Xs2ky4eKgAxsIAbuQQomCEWGF8ANYxwQAWBMQQnDxIIMgCQiJiOVIIqrJKeFqy9loearI6Svpmlgi2HLKVHFoauh62svLS3r65GNj4IeHkAMqsAAoA+jQA8otUABJ0ADIAIlnieYLCouIlthq2eOUcfVp9tkqDzRaItXiqSkr3ugNa3zpdD5Rlg+BA4IdxrhDvkTkVQCUALSyFqIZE+PxQ-BEUgw46FM6INyohCaGxNRzOVzuTwYsYBSahAgRPEFU7FRAXLR2VT6aTKQyyFxfXQk-p4PlaWrSYyyW5CpR0-wTPBRLBgVlwwkIOWdOU6Pn6Ny2dpaEntXSVfmyDRKDRC3SqDQaYFeIA */
  id: "parent",
  initial: "idle",
  states: {
    idle: {
      on: { ACTIVATE: "active" },
    },
    active: {
      invoke: {
        id: "child",
        src: childMachine,
        onDone: "done",
      },
      on: {
        STEP_TO_CHILD: {
          actions: send("STEP", { to: "child" }),
        },
      },
    },
    done: {},
  },
});
