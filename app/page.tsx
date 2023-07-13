"use client";

import { feedbackMachine } from "@/machines/feedbackMachine";
import { useActor, useInterpret, useMachine } from "@xstate/react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Cross1Icon } from "@radix-ui/react-icons";
import { Textarea } from "@/components/ui/textarea";

function Feedback() {
  const [state, send] = useMachine(feedbackMachine);

  return (
    <div className="container mx-auto px-4">
      <div className="flex flex-col justify-around items-center h-[80vh]">
        <div className="preview flex min-h-[380px] w-full justify-center p-5 items-center">
          {state.matches("closed") && (
            <Card className="w-[380px]">
              <CardHeader className="p-2">
                <div className="p-4">
                  <CardTitle className="leading-tight"></CardTitle>
                  <CardDescription className="py-2">
                    Feedback form closed.
                  </CardDescription>
                </div>
              </CardHeader>
              <CardContent className="flex justify-around">
                <Button
                  onClick={() => {
                    send({ type: "restart" });
                  }}
                  variant="outline"
                  className="h-20 w-32 text-base hover:bg-green-900 bg-green-900 bg-opacity-20"
                >
                  Provide more feedback
                </Button>
              </CardContent>
              <CardFooter></CardFooter>
            </Card>
          )}

          {state.matches("prompt") && (
            <div className="step">
              <Card className="w-[350px]">
                <CardHeader className="p-2">
                  <div className="flex justify-between">
                    <div className="p-4">
                      <CardTitle className="leading-tight">
                        How was your experience?
                      </CardTitle>
                      <CardDescription className="py-2">
                        feedback
                      </CardDescription>
                    </div>
                    <div>
                      <Button
                        onClick={() => {
                          send({ type: "close" });
                        }}
                        variant="ghost"
                      >
                        <Cross1Icon className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="flex justify-around">
                  <Button
                    onClick={() => send({ type: "feedback.bad" })}
                    variant="outline"
                    className="h-20 w-32 text-base hover:bg-red-900 bg-red-900 bg-opacity-20"
                  >
                    Bad
                  </Button>
                  <Button
                    onClick={() => send({ type: "feedback.good" })}
                    variant="outline"
                    className="h-20 w-32 text-base hover:bg-green-900 bg-green-900 bg-opacity-20"
                  >
                    Good
                  </Button>
                </CardContent>
                <CardFooter></CardFooter>
              </Card>
            </div>
          )}

          {state.matches("thanks") && (
            <Card className="w-[350px]">
              <CardHeader className="p-2">
                <div className="flex justify-between">
                  <div className="p-4">
                    <CardTitle className="leading-tight">
                      Thanks for your feedback.
                    </CardTitle>
                  </div>
                  <div>
                    <Button
                      onClick={() => {
                        send({ type: "close" });
                      }}
                      variant="ghost"
                    >
                      <Cross1Icon className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="flex justify-around">
                {state.context.feedback.length > 0 && (
                  <p>"{state.context.feedback}"</p>
                )}
              </CardContent>
              <CardFooter></CardFooter>
            </Card>
          )}

          {state.matches("form") && (
            <Card className="w-[350px]">
              <CardHeader className="p-2">
                <div className="flex justify-between">
                  <div className="p-4">
                    <CardTitle className="leading-tight">
                      What can we do better?
                    </CardTitle>
                    <CardDescription className="py-2">
                      please write your feedback
                    </CardDescription>
                  </div>
                  <div>
                    <Button
                      onClick={() => {
                        send({ type: "close" });
                      }}
                      variant="ghost"
                    >
                      <Cross1Icon className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="flex justify-around">
                <form
                  className="step"
                  onSubmit={(ev) => {
                    ev.preventDefault();
                    send({
                      type: "submit",
                    });
                  }}
                >
                  <Textarea
                    id="feedback"
                    name="feedback"
                    rows={4}
                    className="my-4"
                    placeholder="So many things..."
                    value={state.context.feedback}
                    onChange={(ev) => {
                      send({
                        type: "feedback.update",
                        value: ev.target.value,
                      });
                    }}
                  />
                  <div className="flex justify-between">
                    <Button
                      className="button"
                      type="button"
                      onClick={() => {
                        send({ type: "back" });
                      }}
                    >
                      Back
                    </Button>

                    <Button
                      className="button"
                      disabled={!state.can({ type: "submit" })}
                    >
                      Submit
                    </Button>
                  </div>
                </form>
              </CardContent>
              <CardFooter></CardFooter>
            </Card>
          )}
        </div>

        {state.context && (
          <div className="relative rounded-xl overflow-auto mx-auto w-3/4">
            <div className="bg-white px-6 py-8 shadow-xl text-slate-700 max-w-md mx-auto overflow-auto text-sm leading-6 sm:text-base sm:leading-7 dark:bg-slate-800 dark:text-slate-400">
              <pre className="text-white">
                {JSON.stringify(
                  {
                    state: state.value,
                    "last event": state.event,
                    context: state.context,
                  },
                  null,
                  2
                )}
              </pre>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function App() {
  return <Feedback />;
}

export default App;
