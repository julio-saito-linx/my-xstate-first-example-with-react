import { interpret } from "xstate";
import { chatBotMachine } from "./chatBotMachine";

// pnpm jest --watch --testPathPattern=chatbot/chatBotMachine
describe("chatBotMachine 1", () => {
  it("intent 1", (done) => {
    const interpreter = interpret(chatBotMachine);

    interpreter.onTransition((state) => {
      if (state.context.success !== null) {
        console.log(
          state.context.user_message,
          ":",
          state.context.intent_detected,
          ":",
          state.context.bot_message
        );
        done();
      }
    });

    // Ativa a máquina
    interpreter.start();

    // Envia mensagem para o chat bot
    interpreter.send("MESSAGE", { data: "1" });
  });

  it("intent 2", (done) => {
    const interpreter = interpret(chatBotMachine);

    interpreter.onTransition((state) => {
      if (state.context.success !== null) {
        console.log(
          state.context.user_message,
          ":",
          state.context.intent_detected,
          ":",
          state.context.bot_message
        );
        done();
      }
    });

    // Ativa a máquina
    interpreter.start();

    // Envia mensagem para o chat bot
    interpreter.send("MESSAGE", { data: "2" });
  });

  it("intent 3", (done) => {
    const interpreter = interpret(chatBotMachine);

    interpreter.onTransition((state) => {
      if (state.context.success !== null) {
        console.log(
          state.context.user_message,
          ":",
          state.context.intent_detected,
          ":",
          state.context.bot_message
        );
        done();
      }
    });

    // Ativa a máquina
    interpreter.start();

    // Envia mensagem para o chat bot
    interpreter.send("MESSAGE", { data: "3" });
  });
});
