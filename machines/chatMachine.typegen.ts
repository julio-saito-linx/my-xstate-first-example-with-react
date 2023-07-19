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
    "message.ask_name": "close" | "no" | "restart" | "xstate.init";
    "message.closed": "close";
    "message.confirm_name": "submit";
    "message.menu": "back" | "welcome.message";
    "message.search_for_product": "search_for_product";
    "message.tranship_to_seller": "tranship_to_seller";
    "message.tranship_to_suport": "tranship_to_suport";
    "message.welcome": "yes";
    "restart.action": "close" | "restart";
  };
  eventsCausingDelays: {};
  eventsCausingGuards: {
    "can.submit": "submit";
  };
  eventsCausingServices: {};
  matchesStates:
    | "ask_name"
    | "closed"
    | "confirm_name"
    | "menu"
    | "search_for_product"
    | "tranship_to_seller"
    | "tranship_to_suport"
    | "welcome";
  tags: never;
}
