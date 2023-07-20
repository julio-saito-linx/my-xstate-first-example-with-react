import { assign, createMachine, interpret } from "xstate";

export const chatMachine = createMachine(
  {
    /** @xstate-layout N4IgpgJg5mDOIC5QGMAWBDALgYmQV1kwHsBbMAJwH0B3dAO01kuOfQBsBrGgS01UvSUADhVhE6AbQAMAXUSghRWL27j5IAB6IALACYANCACeiABwBGAHTaA7DdMA2G+YCsulwGZd28wF9fhmhY2ORwmOjkmJboyJiqkrLqispxakiaOgbGiLoeVi7aAJxeNnmFhaa6pv6BGFHosFx06GTYsHgARiS80nLpySppoFoI5lKmppZVLg6FNp6mhbpShYYmCB4VlmMuLlI2Ul5S2qY2DjUgQVHI4gBm3OQklM2tRnC9SUqDdOojrja6KYuQrmCbuApLFxrRAeBweSyeWbODwnBy7bwXK6WG50e6PZ4tMDYOhED79L6pH7pP7LQqWca6M4ndEg0zQja2SwOXRoqS6UGHNx+AKXOqWahgNg3VqwVBEaiUEjobh0RVgOh4MkKCnxX6IOHwlwTDy7BxOcoVdn8myWDxSU0eUzaDw2bQuOyYsUSqWkIkQIjPIiYSgYABuYAJZC1IAGlL1CANCONpvN5TZ2Q2DishyR5hRjnR2k9WEsZA1bTAETQlFuRCoQnIRAgeFi0djuupiHMSxtZrNTvGbic7JN8LR2m03NBegOwtqJbLeGwmHI9Fl3CEzAD7UUkTbOqGGVGPa5fYHpiHNitbi5hQcbu8pnGTJsxaii+Xq7o683LFgkrYCh9xSDthi7E8+wcc9L3ZN06XMcwATsbttHGQp9jfSx-yrfha3rRtm1ibAOhiDhgO+eNlg8eF7AsKRzDhN0inTdY7XhRCCndaj3FKDxMJXNdUA3LdKB3OscBI5AyMSckQMPEYqJoiYxgYlEIRYnI+SmRDYUKd1TEdfZqhFLEBO-ITf23ACKGI0jyLjTsEEUyxaJUxj1Ng8YuUdRlcj0TZdEZTDvWlP0wDwSgKEbezQKPWl6VQqRBwnJZQQ0jZQXpZZGV2OYXSNfwRRJCA4HUK5PjkqkwIQABaBx2RqlxLAtO9QR5PS5jOTCGiaQkKooxyDIcW07ydC8s25CcR0dBK9jNdrgR8IsTLFHE8SeF4wH6hzqrzJKEs2Qo3XvY5tBHVCETdKR5tmRbzGW+cohC31ttikZNnhPICmOLNu0tDNlkmXZXSzHk4X5PNMMXV75K7M14UC07WWOqaAZWEb9iO4E7wKWxMOw8hqzw4QCJbTAYaquK80BeibCWdCDgBNErTvekjr5e7+QsTx+K-H8RLEyIKco6n6UQ+n9n2HkoQzcWpnBQVvGcEE+JWkszP5v9rPIYXHP5Lwxbp3QGal5mM1Q-IZiG51VOdB7RRLMANG4DoIyiohdeqrw6WOJLkqKflVnN-YEXvEFxgmJxu0K3wgA */
    id: "chat",

    initial: "welcome",

    schema: {
      context: {} as { customer_name: string; messages: string[]; error: any },
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
            type: "customer_wants_to_talk_with_a_person";
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
            type: "show_main_menu";
          }
        | {
            type: "restart.action";
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
          }
        | {
            type: "do_not_have_name";
          },
    },

    tsTypes: {} as import("./chatMachine.typegen").Typegen0,

    context: {
      customer_name: "",
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
          yes: "menu",

          no: {
            target: "ask_name",
          },
        },
      },

      welcome: {
        entry: "message.welcome",
        on: {
          show_main_menu: {
            target: "menu",
          },
          do_not_have_name: "ask_name",
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
    },

    on: {
      customer_wants_to_talk_with_a_person: "tranship_to_suport",
      "restart.action": ".welcome",
    },
  },
  {
    actions: {
      "message.search_for_product": (context, event) =>
        assign({
          messages: (event) => [
            ...context.messages,
            "entry: 'search_for_product' state",
          ],
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
        return event.value?.trim().length > 0;
      },
    },
  }
);
