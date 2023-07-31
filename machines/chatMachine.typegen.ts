
  // This file was automatically generated. Edits will be overwritten

  export interface Typegen0 {
        '@@xstate/typegen': true;
        internalEvents: {
          "xstate.init": { type: "xstate.init" };
        };
        invokeSrcNameMap: {
          
        };
        missingImplementations: {
          actions: never;
          delays: never;
          guards: never;
          services: never;
        };
        eventsCausingActions: {
          "message.ask_name": "do_not_have_name" | "no";
"message.confirm_name": "submit";
"message.menu": "back" | "show_main_menu" | "yes";
"message.search_for_product": "search_for_product";
"message.tranship_to_seller": "tranship_to_seller";
"message.tranship_to_suport": "customer_wants_to_talk_with_a_person" | "tranship_to_suport";
"message.welcome": "customer_wants_to_talk_with_a_person" | "restart.action" | "xstate.init";
        };
        eventsCausingDelays: {
          
        };
        eventsCausingGuards: {
          "can.submit": "submit";
        };
        eventsCausingServices: {
          
        };
        matchesStates: "ask_name" | "confirm_name" | "menu" | "search_for_product" | "tranship_to_seller" | "tranship_to_suport" | "welcome";
        tags: never;
      }
  