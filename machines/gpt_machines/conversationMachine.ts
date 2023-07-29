import { createMachine, assign } from "xstate";

/**
Aqui, temos estados que representam as diferentes etapas  
da conversa com o chatbot: cumprimentar o usuário  
(`greeting`), pedir o nome do usuário (`askName`), pedir  
ao usuário para confirmar a política de privacidade  
(`privacyPolicy`), e, em seguida, apresentar o menu  
principal (`mainMenu`). O menu principal tem três opções:  
procurar produtos (`searchProducts`), visualizar o  
catálogo (`viewCatalog`), ou entrar em contato com um  
vendedor (`contactSeller`).
 */

type ChatbotEvent =
  | { type: "START" }
  | { type: "ENTER_NAME"; name: string }
  | { type: "CONFIRM_PRIVACY" }
  | { type: "SEARCH_PRODUCTS" }
  | { type: "VIEW_CATALOG" }
  | { type: "CONTACT_SELLER" }
  | { type: "MAIN_MENU" };

type ChatbotContext = {
  name?: string;
};

export const conversationMachine = createMachine<ChatbotContext, ChatbotEvent>({
  /** @xstate-layout N4IgpgJg5mDOIC5QGMD2A7AbmATrAhgC4CWGAsvsgBbHpgB0UOYYJ6UAxAMoAqAggCUeAbQAMAXUSgADqljESGKSAAeiAIwA2dfVEB2UQBZ1hgMwAOAKybz5gEwAaEAE8NR+usu37hy8dEAnKKaAL4hTmhYuASK6BTUtAz4sADWAHL4ALZgHACiaTy5AgD6aXxkuWKSSCCy8rHKagimAYb0pup26uqidpoBpoZmTq4I5jqGenrmAQGafnoBWmERGNh4RKRxlDR09NI4xJiUzgAKqAA2xMjOHADCAPJpAGIAkgJkxacCrwBqfHcAJpVZR1BRbRqIOaieg2YxeGYBcz9EaISx2eh2JGGAJdUxeSx+UwrECRdYxLbxXYMTL4WhkMDoACu3FygjuAAkvgIHgARACqdx4XBBNTBDRqTSsbTsg0sS06hjsVnUqIQkz09EM5gMeh62tE8oGJLJ0U25B2iXotPpjJZv1euQA6sU7nx+AAZB4AcVFMjk4KUksQ5kMMMspk0dj0ml61hxljV0Zh5iMHRMHWCxhNazNsSpVptcTt9ye-CFxS4uQ9HqKftqAYloCapmC9D0Q1m6LsONMkdMasseks7c0vlMMfswR7OaiG3zlr2sDA+Bw1FOOFQECZyEIsA4ZD4rzSxQqaX59fFEODCD0Pa1hnmpjsEc0UxRLkQz80Hlb8uRPZ9iYs7kua2wJHsmDEGAADudxEPgFyoJwh7Hqe+QXhIoKNtezaIDiP6iH2So9Hed5KoOhpaoMvidK04x9qE4Skrm86UouDCRIQlCEFwYAXBcuAHkeJ5nph1T+vUuGqF+8qwtGpHDqIngBISSbuHYsqaLGWI4uM5hhMx6BbnAyimmxFoQWA2FSUGeEIAAtJoaoOfYmKaPiZjRqpSqEiBebsVZjDMKwtBQDZgboJC6qOJ+CD6rCCI+H4PRBExqxzhSlnUvQyTpFk1lijhdkyQg0YYlY5gtOoSwtISEZqgl8zeD2KWBME-kWeBOUHEcJznFcNwRU2pVDqY7bBLYCy9Isg6YhmnSWIasp6BYw6dVl3WFnSxbMsN0lND0+j0PKhqRjiYZWHoaphhiSLDl46ittpSobWBBZLiua5UBuW47nu+0lU0b5tHMw6aZ0wTqKtarVe2cyeFGL56lMehvQuQVQbB8HcUh4VFbZUU3ktI4tFVngGK2AE3b09D3do0N6kEBiGOjgU5VxPF8QJuCA0T9mZnTT4dqIVWaeihg0wEJ2vjVYaxlMT2GSEQA */
  id: "conversationMachine",
  initial: "greeting",
  context: {
    name: undefined,
  },
  states: {
    greeting: {
      on: {
        START: "askName",
      },
    },
    askName: {
      on: {
        ENTER_NAME: {
          target: "privacyPolicy",
          actions: assign((context, event) => {
            return { name: event.name };
          }),
        },
      },
    },
    privacyPolicy: {
      on: {
        CONFIRM_PRIVACY: "mainMenu",
      },
    },
    mainMenu: {
      on: {
        SEARCH_PRODUCTS: "searchProducts",
        VIEW_CATALOG: "viewCatalog",
        CONTACT_SELLER: "contactSeller",
      },
    },
    searchProducts: {
      on: {
        MAIN_MENU: "mainMenu",
      },
    },
    viewCatalog: {
      on: {
        MAIN_MENU: "mainMenu",
      },
    },
    contactSeller: {
      on: {
        MAIN_MENU: "mainMenu",
      },
    },
  },
});
