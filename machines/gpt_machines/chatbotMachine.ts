import { assign, createMachine } from "xstate";

const chatbotMachine = createMachine({
  /** @xstate-layout N4IgpgJg5mDOIC5QGMAWBDALgIwPaYDoBLCAGzAGIBlAFQEEAlGgfQGEAJOmgbQAYBdRKAAOuWEUxFcAOyEgAHogCsATgAsBAEwA2XtoAcKgIxL9apUoDMAGhABPRPoDsBC04NOnKr9stO1AL4BtmhYeIShmJLSUNQAogByACLMALJxVFR0AOJxfIJIIKLikjJyighKapoERtrGuvq8KtpG6rYOCH4aar7Glrz+vLyW+kEhGDj4BJHRsYkpHFz5csUSUrKFFUraNfq7lsYq+po6Xh3KBC2WjSoqms7m9eMgkeEEsGDSEEQxFBAyMDEaQAN1wAGsgW9pp9vr8oAhfmDkFgNvkVoU1qVNqBtuoCIZLDsdCobkY6hcEHUNEo6q0TNUnLxNGpAsFXpN3rCfn8wAAnPm4PkEYSkLAAMyFAFsZpyYV8eQikbgUdj0QJVmJ1mUtso1EYCE5NCpeOTjJoydpKZojC56lZGp4VEonGN2dDCHywMgwEQQfDmFK4LB0DB-oDgWDIbKwtMvT6-QGg7AQzBEaCVaiZOqCiItdjyoh6QRLCydoZ9DdtP5KWoTYbWccHvqTKcXh6CPHff6YoHg6HKPzBcLRRLpTGpp7vd2k-208rVWiBBi8yUNoWEL4XPqjfoqtVSYdKVZeAQDJYjDdBhaqkp23LMBQoPhmNIwAB3PspgfMMAgr6YCuRT5uuuoINUtYXiWdamPcej6JWThBOy0i4BAcByB6mprjquKIAAtFa9gEfoBq0tU1SPE0Rg2vesaECQ5DYdqOIKIgRIqAQaiuqclaljalLOK4LoeF4PjdHRk4TnMzEFmB9TaMJhgWtot77Go1q0mepo2jRvDcTRFqSVyCrwrJoF4V0Rg0qaLS0n4tI7BpxFUk0ritNx9QDJeboTPRnbTomvbJqmYDmbhbEIA8+iuMcRj6ScFisrWvAxUS7j7KM+qaHod7IUAA */
  id: "chatbotMachine",

  initial: "idle",

  context: {
    message: "",
    error: null,
  },

  schema: {
    context: {} as { message: string; error: any },
    events: {} as
      | {
          type: "SEND_MESSAGE";
          message: string;
        }
      | {
          type: "END_CHAT";
        }
      | {
          type: "GOT_NEW_MESSAGE_EVENT";
        }
      | {
          type: "START_CHAT";
        },
  },

  tsTypes: {} as import("./chatbotMachine.typegen").Typegen0,

  states: {
    idle: {
      on: {
        START_CHAT: "chatting",
      },
    },

    chatting: {
      on: {
        SEND_MESSAGE: {
          target: "sending",
          actions: assign({
            message: (context, event) => event.message,
          }),
        },
        END_CHAT: "idle",
      },
    },

    sending: {
      invoke: {
        src: (context, event) => {
          // função simulando o envio de uma mensagem
          return new Promise((resolve, reject) => {
            setTimeout(() => {
              if (Math.random() < 0.2) {
                // simulação de erro com 20% de chance
                reject();
              } else {
                resolve({
                  message: context.message,
                });
              }
            }, 1000);
          });
        },
        onDone: "chatting",
        onError: {
          target: "chatting",
          actions: assign({
            error:
              "A mensagem não pode ser enviada. Por favor, tente novamente.",
          }),
        },
      },
    },

    receiving_message: {
      invoke: {
        src: (context, event) => {
          // função simulando o envio de uma mensagem
          return new Promise((resolve, reject) => {
            setTimeout(() => {
              if (Math.random() < 0.2) {
                // simulação de erro com 20% de chance
                reject();
              } else {
                resolve({
                  message: context.message,
                });
              }
            }, 1000);
          });
        },
        onDone: "chatting",
        onError: {
          target: "chatting",
          actions: assign({
            error:
              "A mensagem não pode ser enviada. Por favor, tente novamente.",
          }),
        },
      },
    },
  },

  on: {
    GOT_NEW_MESSAGE_EVENT: ".receiving_message",
  },
});
