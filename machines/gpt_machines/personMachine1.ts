import { createMachine, interpret } from "xstate";

/**

Neste exemplo, a entidade 'pessoa' tem cinco estados ('idle', 'walking', 
'sitting', 'speaking', 'sleeping', 'havingSex') e o fluxo determinado pela 
maquina de estados indica que:

- do estado de 'idle', ele pode começar a 'walk' ou 'sleep'.
- do estado de 'walking', ele pode 'sit' ou 'sleep'.
- do estado de 'sitting', ele pode começar a 'speak', 'walk' ou 'sleep'.
- do estado de 'speaking', ele pode 'sit', 'walk' ou 'sleep'.
- do estado de 'sleeping', ele pode começar a 'walk' or have 'sex'.
- do estado de 'havingSex', he can 'sleep' or 'walk' again.
 */

// Define os comportamentos possíveis da pessoa
type PersonEvent =
  | { type: "WALK" }
  | { type: "SIT" }
  | { type: "SPEAK" }
  | { type: "SLEEP" }
  | { type: "SEX" };

// Define a máquina de estado
const personMachine = createMachine<unknown, PersonEvent>({
  id: "person",
  initial: "idle",
  states: {
    idle: {
      on: {
        WALK: "walking",
        SLEEP: "sleeping",
      },
    },
    walking: {
      on: {
        SIT: "sitting",
        SLEEP: "sleeping",
      },
    },
    sitting: {
      on: {
        SPEAK: "speaking",
        WALK: "walking",
        SLEEP: "sleeping",
      },
    },
    speaking: {
      on: {
        SIT: "sitting",
        WALK: "walking",
        SLEEP: "sleeping",
      },
    },
    sleeping: {
      on: {
        WALK: "walking",
        SEX: "havingSex",
      },
    },
    havingSex: {
      on: {
        SLEEP: "sleeping",
        WALK: "walking",
      },
    },
  },
});

// Inicia a máquina de estado e define o fluxo de comportamento
let currentState = personMachine.initialState;
console.log(`The person is currently: ${currentState.value}`);

const personService = interpret(personMachine).onTransition((state) => {
  console.log(`The person is currently: ${state.value}`);
});

personService.start();
personService.send("WALK");
personService.send("SIT");
personService.send("SPEAK");
personService.send("SLEEP");
personService.send("SEX");
