import { Machine, createMachine } from "xstate";

// Definindo as possíveis formas que nosso estado pode ter
interface SemaforoStateSchema {
  states: {
    // Sinal verde
    verde: {};
    // Sinal amarelo
    amarelo: {};
    // Sinal vermelho
    vermelho: {};
  };
}

// Quais ações nosso semáforo pode executar
type SemaforoEvent =
  | { type: "TEMPORIZAR" };

// Inicializando nossa máquina de estados do semáforo
const semaforoMachine = createMachine<SemaforoStateSchema, SemaforoEvent>({
  /** @xstate-layout N4IgpgJg5mDOIC5SzAWwIYDMD2AnbAdAG5i4RgDEAKgKICyACgPIBKAkgFoCCLA2gAwBdRKAAO2WAEsALpOwA7ESAAeiAMwBWAgA4ALNu0BOXWv4BGAGwb9ugDQgAnuv4B2Ai7MaXes77OHtAF9A+xQMHHwCdAxcMAAbbGp6ZnZuPiElcSlZBSVVBA1+fh1rbRcNQzUAJiqXfmN7JwQ1MzUCWsN+XTrCq19g0LQsPEISXFR4gAtE2kZWTh4BYSQQLJk5RRX8qrKCDQs1FzVtKrULQw09O0dEXY0vc8sq-ZdyjWCQkHlscngVsOG+EyEnWuS2iAAtGYqgRPL5+PsAmpdBono1EMVXAETF4qudOmpkVUBiAARFRqRyMDshs8ohdFV0Qg7g9DE8XuUgp8ySMojF4thqaDNqB8i03NoLPxjjUrMczC4LEyWm0Ol0evw+mYSTzImMJnFpkKciKVIgLCiCBYTpLLAEjqcmWZLecutYNFVWtYqroPoEgA */
  id: "semaforo",
  initial: "verde", //inicializa a máquina de estado com o sinal verde
  states: {
    // estado do semáforo quando o sinal está verde
    verde: {
      on: { 
        // com a ação de TEMPORIZAR vai para o estado amarelo
        TEMPORIZAR: "amarelo",
      }
    },
    // estado do semáforo quando o sinal está amarelo
    amarelo: {
      on: { 
        // com a ação de TEMPORIZAR vai para o estado vermelho
        TEMPORIZAR: "vermelho",
      }
    },
    // estado do semáforo quando o sinal está vermelho
    vermelho: {
      on: { 
        // com a ação de TEMPORIZAR volta para o estado verde
        TEMPORIZAR: "verde",
      }
    },
  },
});