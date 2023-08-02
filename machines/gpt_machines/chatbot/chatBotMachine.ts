import { createMachine, assign } from "xstate";

export const chatBotMachine = createMachine({
  /** @xstate-layout N4IgpgJg5mDOIC5QGMAWBDALgIQPaYDoBLCAGzAGIBZAUQGU6BBAcRoG0AGAXUVAAdcsIpiK4AdrxAAPRAE4OAdgIBWVQvWyATAGYAjMt26ANCACeiABy6CAFnUXNF2QDYrzl7IC+nk2ix5CCDBMMGRMAH0iMRDo0TEKCHEwYjEAN1wAa2SAM2C0cOzcACdworgBMVgwTh4kEAEhEXFJGQRNZQ4CbQ5NWVkLGwtlG2VXGxNzBG0FTt1NBVlpjm0bZ20tb18MHHwCIJCwyOiwWPEEpJT0rIJczHzCkrLYCqq2XVr+QWE4lsR2zu6vX6g2GowGE0QdmUKnkCgsA2cml062RmxAfh2gWCoQiURiTXiiTEySiVxyeVQBWKpXK4lemg+9S+BN+bQ6XR6fQGQxGYwhCGUVgIHGU2jBCmUshsYpsaIxAT22MOeJOBIoYCKRWKBD4pCwDwAtjcKVTHrTKtVuJIGt9mnVWv8OUDuaC+WY-ppnF0XAZkZoOPDFpo5dsFSrTmJwlAysEolBYOF9jjIBQatbmT97XJFCo1BodPpDPz1poCBYA1oLM4RjMvD50aHduGCeEAO7oaLhTC4cLPMDoDJdnuoACuBo7qatdRtLKzCFhueU6gWBd9-Js-QI810cI4im0-vhIf8TeOEfCI7EGTEuFbkaTYRTaenGbtoFaC9US-zejX7oQzjLAQCgrKMywzB0yjBmiN5BPAdTyvg6aNJm76IAAtM4-KYcKe54fh+EKMemLEGQYDIbaEhzroIraF0+jzNo3Sip6WH-usNj0YoHCyHCmg2DY7TEQqD64mes6fChb7SJCmj8jRSj9HCqxLh0jjzMJp74nEUYxiIYjxomSohBAFESTJAH6FuzggbxBiDL0CjFq49EWHC-S6FWHC6NKmmEM2Ontp23a9nw-aDiFo7jlRkmUaykrQv63nDLIww7qs64gcBbg2HMqw0cisr1oh-niTpl7Xre97GZAZmoRZzi6F6oyOPCUHaAM4z-kushbgJG6eiBgGGN43hAA */
  id: "chatBot",
  initial: "idle",
  schema: {
    context: {} as {
      success: boolean | null;
      bot_message: string;
      user_message: string;
      intent_detected: string;
    },
    events: {} as { type: "MESSAGE"; data: string },
    actions: {} as { type: "SEND_MESSAGE"; message: string },
  },
  predictableActionArguments: true,
  context: {
    success: null,
    bot_message: "",
    user_message: "",
    intent_detected: "",
  },
  states: {
    idle: {
      on: {
        MESSAGE: {
          target: "detect_intention",
          actions: assign({
            user_message: (_, event) => event.data,
          }),
        },
      },
    },
    detect_intention: {
      invoke: {
        id: "fetch_for_response",
        src: async (context, event) => {
          const response = await fetch(
            `https://jsonplaceholder.typicode.com/posts/${event.data}`
          );
          const jsonResponse = await response.json();
          // console.log("--  jsonResponse: ", jsonResponse);
          return jsonResponse;
        },
        onDone: [
          {
            cond: (context, event) => event.data.id === 1,
            target: "intention_greetings_detected",
            actions: assign({
              success: true,
              intent_detected: (context, event) => "GREETINGS_DETECTED",
            }),
          },
          {
            cond: (context, event) => event.data.id === 2,
            target: "intention_want_to_speak_to_human",
            actions: assign({
              success: true,
              intent_detected: (context, event) => "WANT_TO_SPEAK_TO_HUMAN",
            }),
          },
          {
            target: "intention_unknown_detected",
            actions: assign({
              success: false,
              intent_detected: (context, event) => "UNKNOWN_DETECTED",
            }),
          },
        ],
        onError: {
          target: "idle", // Retornar ao estado inicial após um erro
          actions: assign({
            bot_message: "Ocorreu um erro, tente novamente!",
          }),
        },
      },
    },
    intention_greetings_detected: {
      entry: assign({
        bot_message: "Olá! Como posso ajudar?",
      }),
      always: "idle",
    },
    intention_want_to_speak_to_human: {
      entry: assign({
        bot_message: "Por favor, aguarde enquanto conecto você a um humano!",
      }),
      always: "idle",
    },
    intention_unknown_detected: {
      entry: assign({
        bot_message: "Desculpe, não entendi sua intenção. Poderia reformular?",
      }),
      always: "idle",
    },
  },
});
