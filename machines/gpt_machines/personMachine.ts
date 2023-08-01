import { createMachine, interpret } from "xstate";

// Define os comportamentos possíveis da PESSOA
type PersonEvent =
  | { type: "GET_UP" }
  | { type: "LAY_DOWN" }
  | { type: "RUN" }
  | { type: "HAVE_SEX" }
  | { type: "SIT" }
  | { type: "SLEEP" }
  | { type: "SPEAK" }
  | { type: "STAND_UP" }
  | { type: "STOP" }
  | { type: "STOP_RUNNING" }
  | { type: "STOP_SITTING" }
  | { type: "STOP_SLEEPING" }
  | { type: "STOP_SPEAKING" }
  | { type: "STOP_WALKING" }
  | { type: "WALK" }
  | { type: "WAKE_UP" };

// Define a máquina de estado PESSOA
const personMachine = createMachine<unknown, PersonEvent>({
  /** @xstate-layout N4IgpgJg5mDOIC5QAcwCdYHsB2A6WALgIbYQCW2UA+oWQDZ0DEAygAoCiAggNIDaADAF1EKTLDIEyOESAAeiAMwA2AJy4ATAA51AFnUBGfQFZN2pQoDsAGhABPRJov8NS4yv4X3CzUp0BfPxtUDBx8YlIKaloGFgBJABUBYSQQZDEJKWwZeQQAWnUFXB1DFSUlCwN+I31XBRt7BFKdIosLSwUVIwMuhQCg9Cw8QhJyShpJGIB1TgAZPiEZNPFJaRSc9RV9XGN9HWKjBSMLHSV6hy2dVs0dTSqNi00uvtSB0NhUIgBrKgB3AAt6GBxiNIuN6ExmPEAPKsJKLdIrLJrRRGIy4fgKBQGTabE41M4ICxGNQ1Q6dVz6dz6TTPYKDXA-Ih0T6RFjQ2ELFJLDKrUA5a7NFQ+TY1HRGfg6CUEsm4Q5lIzFDq3am0154RnM1kAJQAqgA5OFchGZbIOdzbRwqLGXbyaUoErTqXBGJTqXSWG5izqqkJ4NAAV2w2FZ0zmhtEyxNyMJR1w7nU-CULpUFkpOhUDoVzsxxPUSjtRM0+h99OWkkoLA4PHDqWNvLkiCOTtaTkTBWKrtOdkQ+kTzScvlT4txxcCL19+Ak5agjBmnAAmlQACJQyYGzkRnlIvmIE5ozbXfgi10Kfj6An6W0aDG3TqosoeEtvKesgDi7HiVB1HOSm8RpoQdpnVcSVxQMMVdAvPtcAHG59A2BNHCfIYPm+f5ARoF8K0hGEa25f9o0eZo8VUKosWOdQjAvXsnXMfhrhTS4hSUZDcDoIhbFBCBMB+bBKy4eZf1rSN6xySwLG2VoVEuN1fDPcoL26IojjtV1L1PTZWPYzixm43jGAACU4AA1dgqGYdgAA08LrbcGwQfgCX4LSOK4ni+OYGZ2HYH94REuz1gqdEdAUE42gOB4hUUxwNFuLo4IePYXJ06g9I8hIbP8gCajUZQqicVoun4DYLxCtFLj2eixR8EKLFY94wC+X4AToIFtLc-ScN8o0sujdxnCLV1UQlApMQzbsEF2alnSPcpvDKDZHnq1qwGQEMeDM79Mq3bKPGaKoMU2Np1AsfNrAmy8xRmjozwxfRjksVi-iIAA3SJmDAWQ2VwjdhJ26NMSUZ0TqFA4kwlR4CRuIHNlCzY3Xu2ante97PpYLyfO2gid0JUKYITE5iicLRvAJA41Gxd0qlzU7kbeygPq+0NBL8-6cYfXAauKg5KsTc8JrFCTVHMTpjmKlQVACMdsEwCA4EWNVWex+z8jKON7oom4hWpTQCVyGLLkSzx+Ah0LR36CdhgiMZojoJWoxx-JpqOzW7SLUwCSUCUilMIsdhGvR6tQ5qMKt0YogmO2erZ+y4LjWqHlPJNqQVAkHi2VQalce8iwKViNRZSh7dExs3W2L2NmKGpU1O6UDFwcoicpYqtBC1iAyDSJi4ChwQs51EXW0a5LV1iaEyB7oDlMBVKK9uqxzpZ8CGnbuAPFNF6M7JxqitLECUYhu3WYol6NTIPGrQlqgTLLvo+VnJ3BJELXAqbRpKtffdGdPRTE8QwbppAvNUbFXK6XcqvaMZ1y7i3BuUcCF5QponFN4NoKhdCtn8EAy2wd0KtSoO1MBvEIE42uEDBQhgbjDg8McUeDR4J5h9kOIsewyqYItqWFaa0i53wdvZHELhvDGFup0E6nsNguFmomBaj0sH0mevTKAjNiH2XJg3bQHgtDlAqONBoBxCi7AOmUDo-8jBSz8EAA */
  id: "person",
  initial: "standing_still",
  states: {
    standing_still: {
      on: {
        SPEAK: "speak_while_standing_still",
        SIT: "sitting",
        WALK: "walking",
      },
    },
    speak_while_standing_still: {
      on: {
        STOP: "standing_still",
      },
    },
    walking: {
      on: {
        STOP: "standing_still",
        RUN: "running",
      },
    },
    running: {
      on: {
        WALK: "walking",
      },
    },
    sitting: {
      on: {
        SPEAK: "speak_while_sitting",
        LAY_DOWN: "laying_down",
        GET_UP: "standing_still",
      },
    },
    speak_while_sitting: {
      on: {
        STOP: "sitting",
      },
    },
    laying_down: {
      on: {
        SPEAK: "speak_while_laying_down",
        HAVE_SEX: "havingSex",
        SLEEP: "sleeping",
        SIT: "sitting",
      },
    },
    speak_while_laying_down: {
      on: {
        STOP: "laying_down",
      },
    },
    sleeping: {
      on: {
        WAKE_UP: "laying_down",
      },
    },
    havingSex: {
      on: {
        STOP: "laying_down",
      },
    },
  },
});

// Inicia a máquina de estado e define o fluxo de comportamento da PESSOA
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
personService.send("HAVE_SEX");
