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
