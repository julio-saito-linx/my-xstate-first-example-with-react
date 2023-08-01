import { createMachine, send, sendTo } from "xstate";

export const echoCallbackMachine = createMachine(
  {
    /** @xstate-layout N4IgpgJg5mDOIC5RgMYAsD2A6ANgS1gBcwA7PEqAYgGUAFAUQEEBpAbQAYBdRUABw1h5CeDCR4gAHogBMAZgDsWAGwBWACxLN8gIzTpajdIA0IAJ6IDsrCvlL5s6QE5d07QA55agL5eTqTLgExGQUlPQAwgASAPIc3Egg-ILCouJSCHJuWNraaira8uwqjh6y7PIm5gg50liO0ipKsm7sbrLaSjmOPr4gJBgQcOL+GOJJQiJiCekAtNqVMipYBvLybkqO7I5NKkVKPn7o2PhEpORQYwITqdMWFWYya9nFbg1qHkrsdj1eQA */
    id: "echo",
    initial: "listening",
    predictableActionArguments: true,
    states: {
      listening: {
        invoke: {
          id: "echoCallback",
          src: "echoCallbackHandler",
        },
        on: {
          SPEAK: {
            actions: sendTo("echoCallback", "HEAR"),
          },
          ECHO: {
            actions: "echo.action",
          },
        },
      },
    },
  },
  {
    actions: {
      "echo.action": () => {
        console.log("echo.action was called by callback handler!");
      },
    },
    services: {
      echoCallbackHandler:
        (context: any, event: any) => (callback: any, onEvent: any) => {
          onEvent((e: any) => {
            if (e.type === "HEAR") {
              callback("ECHO");
            }
          });
        },
    },
  }
);
