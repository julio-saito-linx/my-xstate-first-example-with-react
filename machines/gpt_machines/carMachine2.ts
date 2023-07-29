import { Machine, assign } from "xstate";

/**

Neste exemplo, a máquina de estado tem dois estados 
(stopped e moving) que representam um carro parado 
e em movimento, respectivamente. O carro pode 
acelerar, frear, encher o tanque de combustível e 
definir a direção dos piscas. A máquina também 
verifica se o carro ainda está com combustível. 
Quando o combustível se esgota, o carro retorna ao 
estado de parado, independentemente de qual era o 
estado anterior.
 */

interface CarContext {
  speed: number;
  fuel: number;
  blinker: "off" | "right" | "left";
}

type CarEvent =
  | { type: "ACCELERATE"; by: number }
  | { type: "BRAKE"; by: number }
  | { type: "FUEL"; liters: number }
  | { type: "BLINKER"; direction: "off" | "right" | "left" };

const carMachine = Machine<CarContext, CarEvent>(
  {
    /** @xstate-layout N4IgpgJg5mDOIC5QGMCGAnAxAbQAwF1FQAHAe1gEsAXC0gOyJAA9EBaAZlwDp32A2AEwAOACz8AjLlxChfAKwAaEAE9E-OVz4B2OVvFC5AuQE52ArQF8LStOi6wqpYsUiYAggGEPAUQAy3gCU3ABVvPEIkEDJKGnpGFgR2cS1NQxE5WSEBcWMtXEUVNXSuUxFxc2ky-Nw+KxsMe0dnVwAxAFU-cMZo6loGSITxXi5cY2E+cUk8gT4xpVUEbPYuE2M5XAFjY2SRbbk6kFtGpxcITAAhXwBJADkAaUCuyJ7Y-tBBia4cvIM5OT5+JwCgsREJlsYNuY9AJ8pM+LVrIcGgBbUgANwodCgFyCDyeJHIvTiA0QoL4X3E-1yAL0YKEWnmiAEux4Wk27FE7D+2UsiKOqIxWPcXj8gRCYQI3UJr3iiDyy10HLZa12MKEjIQ63EXC07GhMnShh2B356Mx2MutweAXxUWlfVlCC08J18KEuHUWjZcnEGoEzK4Ig28NwIi0YeMWREJpRZqF7U6kue9uJ71JWy+YfyRkBmQ1YZS-FMzv0kbE0YOdFIEDgjFsUpiDpJCFYWiEPH4wjEEykMj4GvK5PK4j4IkEo5qcnSMbsDhOkAbRLezEQOXJML49Pd+T4G3SGsBgZhxnk6TyPp0M64AvNi5lzYmGmZI-Ppgy0gP4ZGvZqWjGbfMKwrCAA */
    id: "car",
    initial: "stopped",
    context: { speed: 0, fuel: 0, blinker: "off" },
    states: {
      stopped: {
        on: {
          ACCELERATE: {
            target: "moving",
            actions: "accelerate",
            cond: "hasFuel",
          },
          FUEL: {
            actions: "addFuel",
          },
          BLINKER: {
            actions: "setBlinker",
          },
        },
      },
      moving: {
        on: {
          BRAKE: {
            target: "stopped",
            actions: "brake",
          },
          ACCELERATE: {
            target: "moving",
            actions: "accelerate",
            cond: "hasFuel",
          },
          BLINKER: {
            actions: "setBlinker",
          },
          FUEL: {
            actions: "addFuel",
          },
        },
      },
    },
    on: {
      "": {
        target: "stopped",
        cond: "isOutOfFuel",
      },
    },
  },
  {
    actions: {
      accelerate: assign((context, event: any) => {
        return {
          speed: context.speed + event.by,
          fuel: context.fuel - event.by * 0.1,
        };
      }),
      brake: assign((context, event: any) => {
        return { speed: Math.max(context.speed - event.by, 0) };
      }),
      addFuel: assign((context, event: any) => {
        return { fuel: context.fuel + event.liters };
      }),
      setBlinker: assign((context, event: any) => {
        return { blinker: event.direction };
      }),
    },
    guards: {
      hasFuel: (context) => context.fuel > 0,
      isOutOfFuel: (context) => context.fuel <= 0,
    },
  }
);
