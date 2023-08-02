import { assign, createMachine } from "xstate";
import { sendTo } from "xstate/lib/actions";

interface IntentHandler {
  handleIntent(message: string): string | null;
}

class GreetingIntentHandler implements IntentHandler {
  handleIntent(message: string) {
    if (
      message.toLowerCase().includes("hello") ||
      message.toLowerCase().includes("hi")
    ) {
      console.log("GreetingIntentHandler: Hello!");
      return "GreetingIntentHandler";
    }
    return null;
  }
}

class GoodbyeIntentHandler implements IntentHandler {
  handleIntent(message: string) {
    if (
      message.toLowerCase().includes("goodbye") ||
      message.toLowerCase().includes("bye")
    ) {
      console.log("GoodbyeIntentHandler: Goodbye!");
      return "GoodbyeIntentHandler";
    }
    return null;
  }
}

class UnknownIntentHandler implements IntentHandler {
  handleIntent(message: string) {
    console.log("UnknownIntentHandler: intent");
    return "UnknownIntentHandler";
  }
}

class IntentDetector {
  private handlers: IntentHandler[];

  constructor() {
    this.handlers = [
      new GreetingIntentHandler(),
      new GoodbyeIntentHandler(),
      new UnknownIntentHandler(),
    ];
  }

  detectIntent(message: string) {
    for (const handler of this.handlers) {
      const detected_intent = handler.handleIntent(message);
      if (detected_intent !== null) {
        return detected_intent;
      }
    }
  }
}

const intentDetector = new IntentDetector();

export const chatBotMachine3 = createMachine(
  {
    /** @xstate-layout N4IgpgJg5mDOIC5QGMAWBDALgIQPaYDoBLCAGzAGIBJAOQAUBVAFQG0AGAXUVAAddYimIrgB23EAA9EAWgCMAFlkEAzACYAbAHZlAVlkBOAByG1swwBoQAT0SG2BefP3LNhzbLY79O+ToC+fpZoWHiERCKYYBEA+hBgkciREBTsXEggfAJCouJSCKqG8gSyqmY66uqG+r7KspY2CLLKygSqzmaqbPJqmmyq8gGBICK4cfDpwTj44pmCwmLpeXJVKhraekYmpRbWMpoEfYXqzvKqyiZs6qoBQRhTYWRgM-xzOYu2Ld5sBurl5+q1eT1RDeBwlTqefSabyaTQ3ECTULECJRTCxeJgRKQZ5Zea5RBsYEIWrqAjQ1x6M6qTRnZTqQZ+IA */
    id: "chatBot",
    initial: "idle",
    predictableActionArguments: true,
    context: {
      bot_message: "",
    },
    schema: {
      context: {} as {
        bot_message: string;
      },
      events: {} as
        | { type: "INPUT"; message: string }
        | { type: "OUTPUT"; message: string },
    },
    states: {
      idle: {
        on: {
          INPUT: {
            target: "intent_detected",
            actions: ["detectIntent"],
          },
          OUTPUT: {
            actions: assign({
              bot_message: (_, event) => event.message,
            }),
          },
        },
      },
      intent_detected: {
        entry: "show_greetings",
      },
      show_greetings: {
        // entry: [
        //   sendTo("chatBot", { type: "OUTPUT", message: "Hello from bot!" }),
        // ],
        always: [
          {
            target: "idle",
          },
        ],
      },
    },
  },
  {
    actions: {
      detectIntent: (context, event) => {
        const intentDetected = intentDetector.detectIntent(event.message);
        console.log("--  intentDetected: ", intentDetected);
        // go to state show_greetings
      },
    },
  }
);
