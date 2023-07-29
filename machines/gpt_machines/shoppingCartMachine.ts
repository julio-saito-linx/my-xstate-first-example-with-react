import { assign, createMachine } from "xstate";

/**
Aqui está o que faz cada evento:

- ADD_ITEM: adiciona um novo item ao carrinho. Espera um item no 
evento.

- REMOVE_ITEM: remove um item do carrinho. Espera o nome de um 
item no evento.

- EDIT_QUANTITY: altera a quantidade de um item no carrinho. 
Espera o nome e a nova quantidade de um item no evento.

- CLEAR_CART: limpa o carrinho removendo todos os itens.

- CALCULATE_TOTAL: calcula o total do carrinho. 

No evento `loading`, a máquina de estado tenta carregar itens do 
BD (simulado aqui com um setTimeout) e, se bem-sucedido, 
dirige-se ao estado `idle` e muda o contexto `items`. Se houver 
um erro, ela vai para o estado `failed`.
*/

interface Item {
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface ShoppingContext {
  items: Array<Item>;
  total: number;
}

type ShoppingEvent =
  | { type: "ADD_ITEM"; item: Item }
  | { type: "REMOVE_ITEM"; itemName: string }
  | { type: "EDIT_QUANTITY"; itemName: string; newQuantity: number }
  | { type: "CLEAR_CART" }
  | { type: "CALCULATE_TOTAL" };

const shoppingCartMachine = createMachine<ShoppingContext, ShoppingEvent>({
  /** @xstate-layout N4IgpgJg5mDOIC5SwBYHsAOGCWA7KAwgIYBOALgLJEDGKeYAdADZpER5QDEEaujeANzQBrRqkw58xclVr1mrdvgSC01ImWy8A2gAYAunv2JQGNLGybeJkAA9EAJl0A2BroAsz5wE4AjJ4dnAGYAdncAGhAAT0QAViDXEPjY9yD3b3cADliwgF9cyPEsDmlKGjo+BTYOTjASEjQSBgwmDQAzRoBbBiLJQlIyuUqWauVVdStcIyMbMwtJm3sEJ1cPLz8A4LDImIRnB28GWO9M3ROgg5SPfML0YqkB2Qr+CCYwTgBBABEvgH0ASQAKgBRCgzJAgOaWLS4RaIIKZQ7uQLZbwOBHIlzOHaITzuBiZdy+TLEk4OdJnZw3EC9EqPcrybCvd4AJVBAHkAGrAgEgsEGWbmaHWCFLUJBBjOTJBYmE3S6QLOVI4hAJQ7y3SZQK+ELZFLBam0h4yBmVJlvTjAr5A34ARQAqh8AHKAoEATXBpiFC1F8OcIQY3n2gXcLhC-vJEWijhCEt8x2lQVCnmJQUNdz6pSejOZnAIABlgR8Wb8CMXAZ7Id6YXDVbrJRckr5vB4tWcVTqAzLMnKci4Sd4QumJHSTUMXhay-mCPb8x8Qb9AezAR985WoT7QGLYrEGM3dEFdL4HCeHPEgiqSQx3CFdTfw-73LFnLF8gUQLg0BA4DYjf0x88grzDWvoIAAtNi0bgVS75-lmpqMCMShQEBwqwqByIqikhyyg4vitgiziasO9z-oMzwMOaYCoZudjwkGDCxt43ixHhOTpJkIRYS+kpaiSOqZEqDghA4JGZvS44MG0RDYG8EA0SBW70YkQTMax8ZhCcXFQfsXbxISCTHv4wlvrkQA */
  id: "shoppingCartMachine",
  initial: "loading",
  context: {
    items: [],
    total: 0,
  },
  states: {
    loading: {
      invoke: {
        src: () =>
          new Promise((resolve, reject) => {
            // Simulating fetch from DB
            setTimeout(() => {
              resolve([
                {
                  name: "Item from DB",
                  price: 100,
                  quantity: 1,
                  image: "image-url",
                },
              ]);
            }, 1000);
          }),
        onDone: {
          target: "idle",
          actions: assign({
            items: (_, event) => event.data,
          }),
        },
        onError: "failed",
      },
    },
    idle: {
      on: {
        ADD_ITEM: {
          actions: assign({
            items: (context, event) => [...context.items, event.item],
          }),
        },
        REMOVE_ITEM: {
          actions: assign({
            items: (context, event) =>
              context.items.filter((item) => item.name !== event.itemName),
          }),
        },
        EDIT_QUANTITY: {
          actions: assign({
            items: (context, event) =>
              context.items.map((item) =>
                item.name === event.itemName
                  ? { ...item, quantity: event.newQuantity }
                  : item
              ),
          }),
        },
        CLEAR_CART: {
          actions: assign({ items: () => [] }),
        },
        CALCULATE_TOTAL: {
          actions: assign({
            total: (context) =>
              context.items.reduce(
                (total, item) => total + item.price * item.quantity,
                0
              ),
          }),
        },
      },
    },
    failed: {
      type: "final",
    },
  },
});
