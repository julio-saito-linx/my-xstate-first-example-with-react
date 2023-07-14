// This file was automatically generated. Edits will be overwritten

export interface Typegen0 {
  "@@xstate/typegen": true;
  internalEvents: {
    "error.platform.feedback.submitting:invocation[0]": {
      type: "error.platform.feedback.submitting:invocation[0]";
      data: unknown;
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
    "reset.error": "feedback.bad" | "feedback.good" | "submit";
    "restart.action": "restart";
    "show.error": "error.platform.feedback.submitting:invocation[0]";
  };
  eventsCausingDelays: {};
  eventsCausingGuards: {
    "can.submit": "submit";
  };
  eventsCausingServices: {};
  matchesStates: "closed" | "form" | "prompt" | "submitting" | "thanks";
  tags: never;
}
