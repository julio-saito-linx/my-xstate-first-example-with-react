import { assign, createMachine, interpret } from "xstate";

export const chatMachine = createMachine(
  {
    /** @xstate-layout N4IgpgJg5mDOIC5QGMAWBDALgYmQGwHtYwBtABgF1FQAHIgS03oIDtqQAPRAFgCYAaEAE9EARjIBOAHSjuAZlEBWUQA5eqlfMUBfbYLRYpNAE4EAtjRywArgCMzjclSQg6sRszYuuCAGwrRKQB2CTUyOV9uMiVubkERBFEJQMUgiMjeeSDNFTldfQxMKWRWADN6YzNsITgndjcPVnYfCUU5KUVQ8LllXjlNUXixUUDIhVj-RSjQ0XyQAyKSlnLK7BYCOpcGpibvRH92yQiJDP8AiSGEVuC5Xl8g+XCJW805hakAdzA8ErMwbC+P3MYCkf1gsHQME2tAYOy8oB8ol4mRkZEyil8fUUihUZF8l1Ecm4Ulu3CRt3EuTIKl8b0KoLALGs2Fs1iE0NcsM8zTEmN8JOxql4oWyuRUl2OUjI0rCVLkQUydMMfyZ2GIeDwHO23L2iT5AuUahFKjFBKCQRJGmmijxByVRRVzMw6DwAGstVzdgjeXcDULjabhIgMWQpP5eLiyEFxFHIvapKyhCz0Mh3ZR6p74ZwffyeobhSpRf1Lrw0jJOlSVBIyIpeOF4+q8MnUx73HCeXrfXn-YWTcWgwgAlJuOaVMpotTRL48np5vTnW7m2nnDC2zrvZ3c4Kjb3AwluJEpAMAlGgmjMhF4-giJBsMY4M7jJhW40sz4etI5BJktEwqfZASkgyPIShClaPS6LO6wQHA7ALBma5etmCAALT4gOaFStK2E4ThQTxiY5iWAhr4dsoFqaNwNpTqkUTyIBKhHrc6h8PKrQ4rMs7vEsKxmCR7a6iExKRI8OL9LcGIEiMJLMRG47VtwEjxoCvxgPx67IeIviKMBNJjg8dxBIoUmBHIsljuIClKVx9KOupSGInwvDDtEikBLc9yliZMnInJllkIp8aJvZb5iGkFrVjiNK+NKISEiWJrBJ08rUui8hEg23x4CFHaiOFUiRSavgxVGyRyJcEgWqeUS1nlRbcPGC6ujlup5fKBU1kVJVxeVA7cLiw5kmxvDUVROg2YY17EBALUbnWoaxG0365GkpZTgxTHIrIfQhNiaiQdoQA */
    id: "chat",

    initial: "prompt",

    schema: {
      context: {} as { name: string; messages: string[]; error: any },
      events: {} as
        | {
            type: "back";
          }
        | {
            type: "buy";
          }
        | {
            type: "close";
          }
        | {
            type: "finish";
          }
        | {
            type: "no";
          }
        | {
            type: "restart";
          }
        | {
            type: "sell";
          }
        | {
            type: "submit";
            value: string;
          }
        | {
            type: "talk";
          }
        | {
            type: "yes";
          }
        | {
            type: "welcome.message";
          },
    },

    tsTypes: {} as import("./chatMachine.typegen").Typegen0,

    context: {
      name: "",
      messages: [],
      error: null,
    },

    states: {
      /**
      chat bot started
      greatings the user
      ask name -> confirm name
      if confirm name is yes, say so, and goto main menu
      if confirm name is no, say so and back to ask name
      main menu: show tree options: buy products, say about a sell made, talk to specialist
      */
      prompt: {
        entry: "message.prompt",
        on: {
          submit: {
            target: "confirm",
            cond: "can.submit",
          },
        },
      },

      confirm: {
        entry: "message.confirm",
        on: {
          yes: {
            target: "welcome",
          },

          no: {
            target: "prompt",
          },
        },
      },

      welcome: {
        entry: "message.welcome",
        on: {
          "welcome.message": {
            target: "menu",
          },
        },
      },

      menu: {
        entry: "message.menu",
        on: {
          buy: {
            target: "buy",
          },
          sell: {
            target: "sell",
          },
          talk: {
            target: "talk",
          },
        },
      },

      buy: {
        entry: "message.buy",
        on: {
          back: {
            target: "menu",
          },
        },
      },

      sell: {
        entry: "message.sell",
        on: {
          back: {
            target: "menu",
          },
        },
      },

      talk: {
        entry: "message.talk",
        on: {
          back: {
            target: "menu",
          },
        },
      },

      closed: {
        entry: "message.closed",
        on: {
          restart: {
            target: "prompt",
            actions: "restart.action",
          },
        },
      },
    },

    on: {
      close: {
        target: "closed",
        actions: "restart.action",
      },
    },
  },
  {
    actions: {
      "restart.action": (context, event) => {
        console.log("restart.action");
      },
      "message.buy": (context, event) =>
        assign({
          messages: (event) => [...context.messages, "entry: buy"],
        }),
      "message.closed": (context, event) =>
        assign({
          messages: (event) => [...context.messages, "entry: closed"],
        }),
      "message.confirm": (context, event) =>
        assign({
          messages: (event) => [...context.messages, "entry: confirm"],
        }),
      "message.menu": (context, event) =>
        assign({
          messages: (event) => [...context.messages, "entry: menu"],
        }),
      "message.prompt": (context, event) =>
        assign({
          messages: (event) => [...context.messages, "entry: prompt"],
        }),
      "message.sell": (context, event) =>
        assign({
          messages: (event) => [...context.messages, "entry: sell"],
        }),
      "message.talk": (context, event) =>
        assign({
          messages: (event) => [...context.messages, "entry: talk"],
        }),
      "message.welcome": (context, event) =>
        assign({
          messages: (event) => [...context.messages, "entry: welcome"],
        }),
    },
    guards: {
      "can.submit": (context, event) => {
        console.log("can.submit");
        return true;
      },
    },
  }
);
