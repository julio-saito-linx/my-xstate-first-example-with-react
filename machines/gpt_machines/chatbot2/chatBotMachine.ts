import { createMachine, assign, sendParent } from "xstate";

// Define o contexto inicial

// Criação da máquina de estados.
export const chatBotMachine = createMachine({
  /** @xstate-layout N4IgpgJg5mDOIC5QGMAWBDALgIQPaYDoBLCAGzAGIBZAUQGU6BBAcRoG0AGAXUVAAdcsIpiK4AdrxAAPRAEYAbPIIcA7BwAsHAEzyVADm3ytAZgA0IAJ5yV6gsa1bNe9QE51NvQF9P5tFjyEAE5wAmIQRGJQFBDiYMRiAG64ANZxAGZgmGgA+mm4gdnBsKGwYJw8SCACQiLikjIICkqqGob6hibmVgh6sgTu+iouWnouHACs6u7evhg4+ARFoeGRFGCBgfkEfKRYeYEAtgQZWai5+YUh4qXlktXCohKVDePjKgRaHMbyekP66npfl05J9lPIXMZZC55Oo3lphuNvD4QGJcBA4JI-PNMHdBA86s9EABaeTAhAkmYgLEBYhkMC4mqPeqIdRaMmyDh6Ag2DQqLQqDkGXTGSnUhZLcQrKAM-FPUANYwQgiyN7aYzqGFQxTqMkucYEN7DWTGcayLTjGHGLzIsWEZDoMSozDZACuYXWsEwDogMtqcukiH0WgIbnG3wF-OcsN1+sNsj0kNkKmMrXUSM8QA */
  id: "chatBot", // Identificador único para a máquina.
  initial: "idle", // Estado inicial da máquina.
  context: {
    user_message: "",
    bot_message: "",
    success: false,
  }, // Estado de contexto inicial.
  tsTypes: {} as import("./chatBotMachine.typegen").Typegen0,
  predictableActionArguments: true,
  schema: {
    context: {} as {
      success: boolean;
      bot_message: string;
      user_message: string;
    },
    events: {} as { type: "MESSAGE"; data: string },
    actions: {} as { type: "SEND_MESSAGE"; message: string },
  },
  states: {
    // Estado 'idle'
    idle: {
      // Ao receber um evento de mensagem.
      on: {
        MESSAGE: {
          target: "responding",
          actions: assign({
            success: false,
            user_message: (_, event) => event.data,
          }),
        },
      },
    },
    // Estado 'responding'
    responding: {
      // Inioca a busca por respostas.
      invoke: {
        id: "fetch_for_response",
        src: async (context) => {
          const response = await fetch(
            "https://jsonplaceholder.typicode.com/posts/1"
          );
          return response.json();
        },
        onDone: {
          // Em caso de conclusão da requisição com sucesso.
          target: "idle",
          actions: assign({
            success: true,
            bot_message: (_, event) => event.data.title,
          }),
        },
        onError: "cannot_understand", // Em caso de erro na requisição.
      },
    },
    // Estado 'cannot_understand'
    cannot_understand: {
      // Neste estado, ele vai instantaneamente enviar a mensagem de erro para a máquina "pai" ou "host".
      entry: sendParent("Cannot understand your message. Please try again."),
    },
  },
});
