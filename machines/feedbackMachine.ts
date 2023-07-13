import { assign, createMachine, interpret } from "xstate";

const schema = {
  context: {} as { feedback: string },
  events: {} as
    | {
        type: "feedback.good";
      }
    | {
        type: "feedback.bad";
      }
    | {
        type: "feedback.update";
        value: string;
      }
    | { type: "submit" }
    | {
        type: "close";
      }
    | { type: "back" }
    | { type: "restart" }
    | { type: "finish" },
};

export const feedbackMachine = createMachine(
  {
    /** @xstate-layout N4IgpgJg5mDOIC5QDMyQEYEMDGBrAxNgDYD2sYA2gAwC6ioADmQJYAuzJAdvSAB6IAWAEwAaEAE9EARgDsADgB0VAGxy5AVgCcwgMw6BA9UIC+xsagw5cChgCcSAWwat8FiFjwKoJEhGp0kECZYNg5uQP4EdQEZBU01TSopAU0dbU11MUkEHSohBXV1OR0ZTSE5ZRkZZSEBU3M0dysbeycXNw9rLD9aHmDQrh5I6Nj4uUTk1PTMiUQhISoFWTlk5Sk8zWUqATl6kA7m5BJbB1dGzoUAVwYITFZKXsD+9kGIxBkpdQV5zVLZXNy8SyiBWChi8jWmyEvyquzM+3Oh2Op06-j6LBe4VAkRqUjimgJyiKAio2iEOmBCCkyk0ChpiXkxTk8x06j2B08RxO+Fgl3QDjYaKeGLCQ0QZViaRk6ik6xUeiEMkpUlBKzUhiJBioVTq8I51mIZEg+FscFYmFsrCFjBFr2xcxqCg02w+MjSqUKysKCh0ckZMgM6zWQjZe04vjgPH16JCmLFCAAtMpKUn2YjPHZHM4YwMsXxBFIdHEVeptmlclVlfICqoNGS9AYjGnLJzkTm428ENU8bCBDT9CpScrmT6VXINdESVUZM2mp5WAALTCcXDwYWx0Wd2VpJaFZkh5l+qgU2ZU8Y19Ss1REqS-ITKWcXQ3kCDtzf2qkCIvyKjymppQs+yrRR1FrLRdH0QwTFMYwgA */
    id: "feedback",
    initial: "prompt",
    schema,
    tsTypes: {} as import("./feedbackMachine.typegen").Typegen0,
    context: {
      feedback: "",
    },
    states: {
      prompt: {
        on: {
          "feedback.good": "thanks",
          "feedback.bad": "form",
        },
      },
      form: {
        on: {
          "feedback.update": {
            actions: "feedback.update.action",
          },
          back: { target: "prompt" },
          submit: {
            cond: "can.submit",
            target: "thanks",
          },
        },
      },
      thanks: {},
      closed: {
        on: {
          restart: {
            target: "prompt",
            actions: "restart.action",
          },
        },
      },
    },
    on: {
      close: "closed",
    },
  },
  {
    actions: {
      "feedback.update.action": assign({
        feedback: (context, event) => {
          if (event.type === "feedback.update") {
            return event.value;
          }
          return context.feedback;
        },
      }),
      "restart.action": assign({
        feedback: (context, event) => {
          if (event.type === "restart") {
            return "";
          }
          return context.feedback;
        },
      }),
    },
    guards: {
      "can.submit": (context, event) => {
        return context.feedback.trim().length > 0;
      },
    },
    services: {},
    delays: {},
    activities: {},
  }
);
