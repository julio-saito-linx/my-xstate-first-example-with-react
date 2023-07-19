// This file was automatically generated. Edits will be overwritten

export interface Typegen0 {
  "@@xstate/typegen": true;
  internalEvents: {
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
    "message.buy": "buy";
    "message.closed": "close";
    "message.confirm": "submit";
    "message.menu": "back" | "welcome.message";
    "message.prompt": "close" | "no" | "restart" | "xstate.init";
    "message.sell": "sell";
    "message.talk": "talk";
    "message.welcome": "yes";
    "restart.action": "close" | "restart";
  };
  eventsCausingDelays: {};
  eventsCausingGuards: {
    "can.submit": "submit";
  };
  eventsCausingServices: {};
  matchesStates:
    | "buy"
    | "closed"
    | "confirm"
    | "menu"
    | "prompt"
    | "sell"
    | "talk"
    | "welcome";
  tags: never;
}