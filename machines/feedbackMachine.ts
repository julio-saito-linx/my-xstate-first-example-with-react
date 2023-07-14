import { assign, createMachine, interpret } from "xstate";

const schema = {
  context: {} as { feedback: string },
  events: {} as
    | {
        type: "feedback.good";
      }
    | {
        type: "feedback.bad";
      }
    | {
        type: "feedback.update";
        value: string;
      }
    | { type: "submit" }
    | {
        type: "close";
      }
    | { type: "back" }
    | { type: "restart" }
    | { type: "finish" },
};

export const feedbackMachine = createMachine(
  {
    /** @xstate-layout N4IgpgJg5mDOIC5QDMyQEYEMDGBrAxNgDYD2sYA2gAwC6ioADmQJYAuzJAdvSAB6IAWAEwAaEAE9EARgDsADgB0VAGxy5AZjnKZVGcpUBfA2NQYcuBQwBOJALYNW+UxCx4FUEiQjU6SEE1g2Dm4-fgQAVkiFdWVlITkZIXUpAQFw9TFJBHUqIQVIjQK5IW0BGSMTNBdzSxt7R2dXCyxvWh4AoK4eMMjw6Nj4xOTU9MzEISEqBVk5KRSBNWVk8uMQRprkEitbJyqmhQBXBghMVko2vw72LtDERLz9GSkATiFn5+TlASkxhFmFMrycKzARUZ4ycKpCprPYbLY7Jo+dosa4hUBhOLPaIyGQxcJzJJUMq-KTKLFk55UORUFQLKjqYHQ9ZuTbbfCwA7oWxsJGXFHBbqID4CBQ4gTPWT6ITpCUk-6zNSabS6fTKJmwtzEMiQfBWOCsTBWVi8xj8m7o8ZxBRycJEp7i5TAyYZCTSKKaeSO5SyeRCKTqsxuDlctjsThQfC8WAGs4KTDIM5WAAUUhpVAAlLtAxZg9zWGGoCb-Ga0XxpEJ5PkPeFcUJhFI1CTKfkluEvjbZJTnkZVpwvHAeMzcMjAqjBQgALTKX5TgPVNzWOwOEedUthesKN7AiGQj6kgQkyttxVaHR6QyrIcKVm2Fdj24IPRYqQFcVpbQJH6uhANvLJE-KueaqXhqFisAAFpgnC4PAfKjgKD5SOo7wKB8lJPI64QVuoB7fg2WJtukqSgtSjrqHO+xauQEB3ghFo-gI6iitSVDhM8IJpMkoh4UeqgaKeKoXpU2YKLmobMOGtHmmWP4pMoVbqH6-HqPIzxygRZHEVSKjpD2BhAA */
    id: "feedback",
    initial: "prompt",
    schema,
    tsTypes: {} as import("./feedbackMachine.typegen").Typegen0,
    context: {
      feedback: "",
    },
    states: {
      prompt: {
        on: {
          "feedback.good": "submitting",
          "feedback.bad": "form",
        },
      },

      form: {
        on: {
          "feedback.update": {
            actions: "feedback.update.action",
          },
          back: { target: "prompt" },
          submit: {
            cond: "can.submit",
            target: "submitting",
          },
        },
      },

      thanks: {},

      closed: {
        on: {
          restart: {
            target: "prompt",
            actions: "restart.action",
          },
        },
      },

      submitting: {
        after: {
          "1000": "thanks",
        },
      },
    },
    on: {
      close: "closed",
    },
  },
  {
    actions: {
      "feedback.update.action": assign({
        feedback: (context, event) => {
          return event.value;
        },
      }),
      "restart.action": assign({
        feedback: (context, event) => {
          return "";
        },
      }),
    },
    guards: {
      "can.submit": (context, event) => {
        return context.feedback.trim().length > 0;
      },
    },
    services: {},
    delays: {},
    activities: {},
  }
);
