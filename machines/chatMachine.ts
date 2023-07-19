import { assign, createMachine, interpret } from "xstate";

export const chatMachine = createMachine(
  {
    /** @xstate-layout N4IgpgJg5mDOIC5QGMAWBDALgYmQGwHtYwBtABgF1FQAHIgS03oIDtqQAPRAFgCYAaEAE9EATm4A6AKx8AzAEYAHN0Vleo+fIC+WwWiwT0sANYB9FugC2YbLACuAI0uNyVJCDqxGzNu64JFWUkAdl4ZYO5ggDZuWQ0BYUR5KVkJdVkybjJ5YKlFGO4dPQxMCWRWADN6ACdLcysbIThXdk9vVnZ-eQVFCSjRRVEoqWDFRSl5UQSRBE1e0O4VMO4JsnzZIpB9UvKWKtr662wWAhb3NqYOvzEpKWleMLJRBeD5MmDBGbfeCUV5LKeylksikaw2ui2JQkAHcwHhykdYfCCNYJNZYLB0DAzrQGJdfKAujFRBJRMDuqNxPIolFPkklBIFksZKt1pttmiwCw7LYwOhqmhTBUCNVTDRqgQIHZkJgcR48T5OoheJoflFRrIxskQflaYkELxFtJsmRZFFVLxcsFguyodZudhMNV0CxYKh6DRTJgCKZ7HRqrLKK0FVdCcrVX0NVqUnkaXTZnEJKbFA9RENVFEyMNbQZ7TynS63R6vT7iHg8GBqnKLorrgaI+rAtGdXH9UESUNNXlZGFZMEhjnSsR+YLhaLxZLpTgHOhkMZqyGCZxlSr5mnlDEgtwydMkuIkw8yFnImpFslBxIC673Z7vb67P7p7P50HzoulQbV4z19xN4syR8+pjNIUgaGmUQguE2gQhyV5FrepZwhW1TYDOc4Ll4+Ifg8DL9gMv6xP+fbxuoJIqEseG8LqpoXvgRCQNg1RwJg-KBm4uKYbWYYIHwkhxJowxSFRvBmqI8ZktIsSgqE-aGlIUQ6BCJwQHA7DbMGnGhsuCAALR6jMOl3GmxkmaZ4LFAYRhmBY1gae0S7+HkPyBDSIkPHIzziakbkjEMWZPLwWa0ZUNR1DZYB2VhdZvL+EgqH2CzrCmsjiXcwQ9r5maZlMQUwVCSIIhFb6aQ5SRZCSNLZKoaxHnEKX6qIaUZf2WUBblFmlHmkVcdpSg9mkETZN8vBRMkgEzIa8gSN0qwRJa4yqOZkIGMOAqoEKIpihKUoyt1Wn+CJOQHumijROMI31V8+SklkIxRG5AwpApeUGHBN4lvej57aVBoKMEx3mqd5pCRB8Z-HF1qjFk+QqgoUgXm9xZ3mWyHfdhf0A2MZ0g5dypTHFprcPIhpST20EdWUhDEBAaPRQMcWRBErw0maVG4wgEk+S1-k5c9OhAA */
    id: "chat",

    initial: "ask_name",

    schema: {
      context: {} as { name: string; messages: string[]; error: any },
      events: {} as
        | {
            type: "back";
          }
        | {
            type: "search_for_product";
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
            type: "tranship_to_suport";
          }
        | {
            type: "submit";
            value: string;
          }
        | {
            type: "tranship_to_seller";
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
      ask name -> confirm_name name
      if confirm_name name is yes, say so, and goto main menu
      if confirm_name name is no, say so and back to ask name
      main menu: show tree options: search_for_product products, say about a tranship_to_suport made, tranship_to_seller to specialist
      */
      ask_name: {
        entry: "message.ask_name",
        on: {
          submit: {
            target: "confirm_name",
            cond: "can.submit",
          },
        },
      },

      confirm_name: {
        entry: "message.confirm_name",
        on: {
          yes: {
            target: "welcome",
          },

          no: {
            target: "ask_name",
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
          search_for_product: {
            target: "search_for_product",
          },
          tranship_to_suport: {
            target: "tranship_to_suport",
          },
          tranship_to_seller: {
            target: "tranship_to_seller",
          },
        },
      },

      search_for_product: {
        entry: "message.search_for_product",
        on: {
          back: {
            target: "menu",
          },
        },
      },

      tranship_to_suport: {
        entry: "message.tranship_to_suport",
        on: {
          back: {
            target: "menu",
          },
        },
      },

      tranship_to_seller: {
        entry: "message.tranship_to_seller",
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
            target: "ask_name",
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
      "message.search_for_product": (context, event) =>
        assign({
          messages: (event) => [
            ...context.messages,
            "entry: 'search_for_product' state",
          ],
        }),
      "message.closed": (context, event) =>
        assign({
          messages: (event) => [...context.messages, "entry: 'closed' state"],
        }),
      "message.confirm_name": (context, event) =>
        assign({
          messages: (event) => [
            ...context.messages,
            "entry: 'confirm_name' state",
          ],
        }),
      "message.menu": (context, event) =>
        assign({
          messages: (event) => [...context.messages, "entry: 'menu' state"],
        }),
      "message.ask_name": (context, event) =>
        assign({
          messages: (event) => [...context.messages, "entry: 'ask_name' state"],
        }),
      "message.tranship_to_suport": (context, event) =>
        assign({
          messages: (event) => [
            ...context.messages,
            "entry: 'tranship_to_suport' state",
          ],
        }),
      "message.tranship_to_seller": (context, event) =>
        assign({
          messages: (event) => [
            ...context.messages,
            "entry: 'tranship_to_seller' state",
          ],
        }),
      "message.welcome": (context, event) =>
        assign({
          messages: (event) => [...context.messages, "entry: 'welcome' state"],
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
