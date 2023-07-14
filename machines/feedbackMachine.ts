import { assign, createMachine, interpret } from "xstate";

const schema = {
  context: {} as { feedback: string; error: any },
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
    /** @xstate-layout N4IgpgJg5mDOIC5QDMyQEYEMDGBrAxNgDYD2sYA2gAwC6ioADmQJYAuzJAdvSAB6IAWAEwAaEAE9EARikBmAHQB2KgNlTFADgCsQ2QOWyAvobGoMOXPIYAnEgFsGrfGYhY88qCRIRqdJCCZYNg5uf34ELQA2LXlZSMjZRUi5AE5oqQ0xSQQBDRT5NIEBKWSBFMSBSIFjUzRXCytbBycXN0ssH1oeQOCuHnComLiEpNT0zIlERIUNSorIxTShSsiakFaG5BJrO2c6tvkAVwYITFZKLv8e9j6wxEVZIXlIqkUhDSo1DTf3rMQhXTyARUKhSXQaGRaFQaNYbdxbHb4Nq+bosG6hUDhBL5RKKAQ6FJSIqyQl-BCPBRxN4pFIgolUXSw-abba7WCHdB2Ngoq5okL9RApIpKRRQ5a5SIpRZSMl6RTyXSyBlJLQaF4pGEmdbM9zEMiQfDWOCsTDWVg8xh826Y-6RJ7aKhaKTlKjaYpkwnyBmyPTvVWVIRaapauGWdmctjsThQfAQLhgeTMTgANxIuATofk4a5rCjUAQSdT2DOIV8FoCVoxfGkcvkWi0mkURKEoMdkVlToVakDijeHzK2iZ5nc2cjSZjYGstmsViIZwRdnkmdHufHBZTJGL6LLl0tQXRAoQUlBAmeYI0ul0ZXeKTJEKBve0cibZQWimMWs43jgPFDqP3-J3AgAC07aTCBkReiC0EwTB74hjqlg2PYjj-r0VbhMIUgKikWhCkqTrRHaZIyKeLaqOo2hXgYQ71PCrJoQeQF4golEaGqdpqoqsrLAqxRyDIyw6EICy0QcrAABaYJwuDwLyAHWtWR65AokQaI8dpxHI-EdlQXZKkIKpqlQGpiQ0erkBAjGATaykKJorb4g8TrfCRRIKioaiaDocqfGZI4cjmebWYp4SQpBWg+j6GpNtEDKynISgrPEQgyCSGQfoYQA */
    id: "feedback",
    initial: "prompt",
    schema,
    tsTypes: {} as import("./feedbackMachine.typegen").Typegen0,
    context: {
      feedback: "",
      error: null,
    },
    states: {
      prompt: {
        on: {
          "feedback.good": "submitting",
          "feedback.bad": "form",
        },
      },

      form: {
        entry: "reset.error",
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
        entry: "reset.error",
        invoke: {
          src: (context, event) => {
            return new Promise((resolve, reject) => {
              setTimeout(() => {
                if (Math.random() > 0.5) {
                  resolve({ status: 200 });
                } else {
                  reject({ status: 500 });
                }
              }, 1000);
            });
          },
          onDone: {
            target: "thanks",
          },
          onError: {
            target: "prompt",
            actions: "show.error",
          },
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
      "show.error": assign({
        error: (context, event) => {
          return "An error occurred while submitting feedback. Please try again.";
        },
      }),
      "reset.error": assign({
        error: (context, event) => {
          return null;
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
