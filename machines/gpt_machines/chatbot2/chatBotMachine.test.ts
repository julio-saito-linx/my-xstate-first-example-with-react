import { interpret } from "xstate";
import { chatBotMachine } from "./chatBotMachine";

// pnpm jest --watch --testPathPattern=chatbot/chatBotMachine
describe("chatBotMachine 2", () => {
  it("pararel states", (done) => {
    const interpreter = interpret(chatBotMachine);

    interpreter.onTransition((state) => {
      if (state.context.success) {
        console.log(`> [${state.event.type}] State:`, {
          "state.value": state.value,
          "state.context": state.context,
        });
        done();
      }
    });

    // Ativa a máquina
    interpreter.start();

    // Envia mensagem para o chat bot
    interpreter.send("MESSAGE", { data: "Hello" });
  });
});
