// This file was automatically generated. Edits will be overwritten

export interface Typegen0 {
  "@@xstate/typegen": true;
  internalEvents: {
    "xstate.after(1000)#feedback.submitting": {
      type: "xstate.after(1000)#feedback.submitting";
    };
    "xstate.init": { type: "xstate.init" };
  };
  invokeSrcNameMap: {};
  missingImplementations: {
    actions: never;
    delays: never;
    guards: never;
    services: never;
  };
  eventsCausingActions: {
    "feedback.update.action": "feedback.update";
    "restart.action": "restart";
  };
  eventsCausingDelays: {};
  eventsCausingGuards: {
    "can.submit": "submit";
  };
  eventsCausingServices: {};
  matchesStates: "closed" | "form" | "prompt" | "submitting" | "thanks";
  tags: never;
}
