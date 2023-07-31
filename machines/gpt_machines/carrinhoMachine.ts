import { createMachine, assign } from "xstate";

// https://platform.openai.com/playground/p/NKkbCB3EYTjxnWULHQJ9ccv6

/**

crie um código muito bem comentado, em pt-br, em typescript, 
uma maquina de estado usando o xstate para representar um fluxo 
completo de um carrinho de compras. 

Ele vai possuir os seguintes eventos: incluir item, remover 
item, limpar carrinho, calcular total, editar quantidade, 
finalizar carrinho, fetch do carrinho, save do carrinho. 

Cada item (produto) possui quantidade, nome, imagem e um preço. 

Os estados são os seguintes:
- idle
- carrinho vazio
- carrinho com items
- carrinho finalizado

No início a maquina busca pelo carrinho gravado no banco de 
dados usando o evento fetch do carrinho.
 */

// tipando o item do carrinho
type Item = {
  quantidade: number;
  nome: string;
  imagem: string;
  preco: number;
};

// tipando os context
interface Context {
  carrinho: Item[];
  total: number;
  error: any;
}

// tipando os eventos
type Event =
  | { type: "ADICIONAR_ITEM"; item: Item }
  | { type: "REMOVER_ITEM"; item: Item }
  | { type: "EDITAR_QUANTIDADE"; item: Item; quantidade: number }
  | { type: "LIMPAR_CARRINHO" }
  | { type: "CALCULAR_TOTAL" }
  | { type: "FINALIZAR_CARRINHO" }
  | { type: "FETCH_CARRINHO" }
  | { type: "SALVAR_CARRINHO" };

// criando a máquina de estado
const carrinhoMachine = createMachine<Context, Event>({
  /** @xstate-layout N4IgpgJg5mDOIC5QGMCGAndBLAdgCwHsBZVZPXMAOiwgBswBiAMQFEAVAYQAkB9DgQQBKggJIA5LgHkA2gAYAuolAAHArCwAXLARxKQAD0QBGAGwnKsgOyyALEcsAOEwE4AzAFYbDgDQgAnogATM42lM6mNq6OjrKB7q4mAL6JvmiYuIQkZBSUAGZgGmQcGNj4BAwQOlS4AG4EANZUaaWZpOQ4VPmFeMXpZQi1BGhaOnLyY3qq6iO6SAaI7sEW7g7OJrImgUY2Lja+AQiB65Sugaf27paWF4HJqSUZxG05XUUPZQxgmATolMq0qA0uR+AFtKM1Hll2p0Cm8+oQBjg6sNtDgxhM5lNNKi9IZDpZQkY3FZZA5Ip4zvtEM5ApQzmZVo4bLIorcUiAIWUoTlOYQAGqoABe2gY-AAIiIOCJJGIhDwRGwWEQMSo1NidLiFktZCs1hstjsQlSEDYbM4LKSCUSjHEda4bHcOe9WtkOuDnQQOAQQSINGAcLBRRKpTK5QqlSqQFiZpqEA5ZObme4iWtkzrIsaTJFKO5Se41kYjA5HK5XI7eU9XU0PV6fX6AwxBErJHyWIJ5YrlQpJmqY3M8Q4jO4LIFR8Ws8yjK5nMbAmTKOPTrIjBtXPYjOWPdy3RXa77-YGWBK2HKAIoAVX4YjYIjF4pYkejOP7iGsrjCsls60udkCNksxoErSTiXPmwQOGca6bvClbQu6MF7vWgYCAAMhw54oXKbCSCeKGPr2z6gHiazmkcCQ2CsxbuCYTjGvEC5FpE45-o4KzQS0sE8jW3r7g2KEiEQAAKcoCMI4hSPh0yEfMCCLOaOqrOsmzbLsxoeO+phXNR6z-g4rgOOxkLPDu3F1gezDiPw-EAFoiUIogSDI3aYgRGovggzjuMOFL2oEGyklYM7+IghonHYg6ln5pz5pYhlcsZ1YwUwuCoLQWCCqglQMAAylZfJ2WJjmSeqsxEcYRLvp4DIQc4xbqWpljDnYZjxMmLWFsk7I4AQEBwHoFbbmAPZSW5ZUIAAtCYxrjaWlAmPmzWfiExYEnFLpwTQ9DDSVsY2IEs7FicCTrFs1hZpYJixeyA0JXksI9B6219mNCTDsuo4xLEdjTu4s4rDm2wJrElj2iWSTXVut0VgKwoEE90l4lEshHWYukJiYa4+MFJpZpQK7OM46OedcNHuGtnEmQhPFIfDo0yY1oQ0ZYNJRCDbheMaoVkvYeqxA4izUeTg3wRxyU4Kl6WZXDLkjaVMmFhBdJnLmtgE0cQ6cxddKXBjDgQZElhkZ1iRAA */
  id: "carrinhoMachine",
  initial: "idle",
  context: {
    carrinho: [],
    total: 0,
    error: null,
  },
  states: {
    idle: {
      on: {
        FETCH_CARRINHO: "fetchCarrinho",
      },
    },
    fetchCarrinho: {
      invoke: {
        src: (context, event) => {
          // aqui deve-se implementar a chamada a API que busca o carrinho no banco de dados.
          return Promise.resolve([]);
        },
        onDone: {
          target: "carrinhoComItens",
          actions: assign({
            carrinho: (context, event) => event.data,
          }),
        },
        onError: {
          target: "idle",
          actions: assign({
            error: (context, event) => "Erro ao buscar o carrinho.",
          }),
        },
      },
    },
    carrinhoVazio: {
      on: {
        ADICIONAR_ITEM: {
          target: "carrinhoComItens",
          actions: assign({
            carrinho: (context, event) => [...context.carrinho, event.item],
          }),
        },
      },
    },
    carrinhoComItens: {
      on: {
        ADICIONAR_ITEM: {
          actions: assign({
            carrinho: (context, event) => [...context.carrinho, event.item],
          }),
        },
        REMOVER_ITEM: {
          actions: assign({
            carrinho: (context, event) =>
              context.carrinho.filter((item) => item !== event.item),
          }),
        },
        EDITAR_QUANTIDADE: {
          actions: assign({
            carrinho: (context, event) =>
              context.carrinho.map((item) =>
                item === event.item
                  ? { ...item, quantidade: event.quantidade }
                  : item
              ),
          }),
        },
        CALCULAR_TOTAL: {
          actions: assign({
            total: (context, event) =>
              context.carrinho.reduce(
                (total, item) => total + item.quantidade * item.preco,
                0
              ),
          }),
        },
        LIMPAR_CARRINHO: {
          target: "carrinhoVazio",
          actions: assign({
            carrinho: (context, event) => [],
            total: (context, event) => 0,
          }),
        },
        FINALIZAR_CARRINHO: "carrinhoFinalizado",
      },
    },
    carrinhoFinalizado: {
      type: "final",
      on: {
        SALVAR_CARRINHO: {
          actions: (context, event) => {
            // enviar para a API que salva o carrinho no banco de dados
          },
        },
      },
    },
  },
});
