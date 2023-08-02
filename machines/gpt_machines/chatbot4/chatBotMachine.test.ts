import { interpret } from "xstate";
import { chatBotMachine3 } from "./chatBotMachine";

// pnpm jest --watch --testPathPattern=chatbot/chatBotMachine3
describe("chatBotMachine3", () => {
  it("intentions", (done) => {
    const interpreter = interpret(chatBotMachine3);

    interpreter.onTransition((state) => {
      console.log(
        `> [${JSON.stringify(state.event)}] :: ${
          state.value
        } -> ${JSON.stringify(state.context)}`
      );
      // if (state.value === "idle") {
      //   done();
      // }
    });

    // Ativa a máquina
    interpreter.start();

    // Envia mensagem para o chat bot
    interpreter.send({ type: "INPUT", message: "hello" }); // Output: Hello!
    // interpreter.send({ type: "INPUT", message: "goodbye" }); // Output: Goodbye!
    // interpreter.send({ type: "INPUT", message: "unknown" }); // Output: Unknown intent
  });
});
