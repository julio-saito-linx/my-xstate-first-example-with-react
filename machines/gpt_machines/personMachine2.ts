import { createMachine } from "xstate";

/**
Esse exemplo de máquina de estado de pessoa tem quatro estados: 
'parado', 'caminhando', 'correndo' e 'pulando'. Em cada estado, 
os comandos 'andar', 'parar', 'correr' e 'pular' são manuseados 
e direcionam para outros estados conforme necessário. As ações 
associadas com cada comando atualizam o contexto da máquina de 
estado para refletir a direção atual e a ação da pessoa.
 */

type PersonContext = {
  direction: "left" | "right" | null;
  action: "walking" | "running" | "jumping" | "stopped";
};

type PersonEvent =
  | { type: "walk"; direction: "left" | "right" }
  | { type: "stop" }
  | { type: "run"; direction: "left" | "right" }
  | { type: "jump" };

const personMachine = createMachine<PersonContext, PersonEvent>({
  id: "person",
  initial: "stopped",
  context: {
    direction: null,
    action: "stopped",
  },
  states: {
    walking: {
      on: {
        stop: {
          target: "stopped",
          actions: (context, event) => {
            context.action = "stopped";
            context.direction = null;
          },
        },
        run: {
          target: "running",
          actions: (context, event) => {
            context.action = "running";
            context.direction = event.direction;
          },
        },
        jump: {
          target: "jumping",
          actions: (context, event) => {
            context.action = "jumping";
          },
        },
      },
    },
    running: {
      on: {
        stop: {
          target: "stopped",
          actions: (context, event) => {
            context.action = "stopped";
            context.direction = null;
          },
        },
        walk: {
          target: "walking",
          actions: (context, event) => {
            context.action = "walking";
            context.direction = event.direction;
          },
        },
        jump: {
          target: "jumping",
          actions: (context, event) => {
            context.action = "jumping";
          },
        },
      },
    },
    jumping: {
      on: {
        stop: {
          target: "stopped",
          actions: (context, event) => {
            context.action = "stopped";
            context.direction = null;
          },
        },
        walk: {
          target: "walking",
          actions: (context, event) => {
            context.action = "walking";
            context.direction = event.direction;
          },
        },
        run: {
          target: "running",
          actions: (context, event) => {
            context.action = "running";
            context.direction = event.direction;
          },
        },
      },
    },
    stopped: {
      on: {
        walk: {
          target: "walking",
          actions: (context, event) => {
            context.action = "walking";
            context.direction = event.direction;
          },
        },
        run: {
          target: "running",
          actions: (context, event) => {
            context.action = "running";
            context.direction = event.direction;
          },
        },
        jump: {
          target: "jumping",
          actions: (context, event) => {
            context.action = "jumping";
          },
        },
      },
    },
  },
});
