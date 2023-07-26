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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

function Feedback() {
  const [state, send] = useMachine(feedbackMachine);

  return (
    <div className="w-full mt-8">
      <div className="flex flex-row px-10">
        <div className="basis-4/5 mx-auto flex flex-row justify-center">
          {/* 
          
          STATE: closed
          
          */}
          {state.matches("closed") && (
            <Card>
              <CardHeader className="p-2">
                <div className="p-4">
                  <CardTitle className="leading-tight"></CardTitle>
                  <CardDescription className="py-2">
                    Feedback form closed.
                  </CardDescription>
                </div>
              </CardHeader>
              <CardContent className="flex justify-around">
                <TooltipProvider>
                  <Tooltip delayDuration={200}>
                    <TooltipTrigger asChild>
                      <Button
                        onClick={() => {
                          send({ type: "restart" });
                        }}
                        variant="outline"
                        className="h-20 w-32 text-base hover:bg-green-900 bg-green-900 bg-opacity-20"
                      >
                        Provide more feedback
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>restart</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </CardContent>
              <CardFooter></CardFooter>
            </Card>
          )}

          {/* 
          
          STATE: prompt
          
          */}
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
                      <TooltipProvider>
                        <Tooltip delayDuration={200}>
                          <TooltipTrigger asChild>
                            <Button
                              onClick={() => {
                                send({ type: "close" });
                              }}
                              variant="ghost"
                            >
                              <Cross1Icon className="h-4 w-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>close</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="flex justify-around">
                  <TooltipProvider>
                    <Tooltip delayDuration={200}>
                      <TooltipTrigger asChild>
                        <Button
                          onClick={() => send({ type: "feedback.bad" })}
                          variant="outline"
                          className="h-20 w-32 text-base hover:bg-red-900 bg-red-900 bg-opacity-20"
                        >
                          Bad
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>feedback.bad</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  <TooltipProvider>
                    <Tooltip delayDuration={200}>
                      <TooltipTrigger asChild>
                        <Button
                          onClick={() => send({ type: "feedback.good" })}
                          variant="outline"
                          className="h-20 w-32 text-base hover:bg-green-900 bg-green-900 bg-opacity-20"
                        >
                          Good
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>feedback.good</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </CardContent>
                <CardFooter>
                  {state.context.error?.length > 0 && (
                    <p className="text-red-500">{state.context.error}</p>
                  )}
                </CardFooter>
              </Card>
            </div>
          )}

          {/* 
          
          STATE: submitting
          
          */}
          {state.matches("submitting") && (
            <Card className="w-[350px]">
              <CardHeader className="p-2">
                <div className="flex justify-between">
                  <div className="p-4">
                    <CardTitle className="leading-tight text-base">
                      Sending response...
                    </CardTitle>
                  </div>
                  <div>
                    <TooltipProvider>
                      <Tooltip delayDuration={200}>
                        <TooltipTrigger asChild>
                          <Button
                            onClick={() => {
                              send({ type: "close" });
                            }}
                            variant="ghost"
                          >
                            <Cross1Icon className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>close</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </div>
              </CardHeader>
              <CardFooter></CardFooter>
            </Card>
          )}

          {/* 
          
          STATE: thanks
          
          */}
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
                    <TooltipProvider>
                      <Tooltip delayDuration={200}>
                        <TooltipTrigger asChild>
                          <Button
                            onClick={() => {
                              send({ type: "close" });
                            }}
                            variant="ghost"
                          >
                            <Cross1Icon className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>close</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="flex justify-around">
                {state.context.feedback.length > 0 && (
                  <p>Your feedback was: {state.context.feedback}</p>
                )}
              </CardContent>
              <CardFooter></CardFooter>
            </Card>
          )}

          {/* 
          
          STATE: form
          
          */}
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
                    <TooltipProvider>
                      <Tooltip delayDuration={200}>
                        <TooltipTrigger asChild>
                          <Button
                            onClick={() => {
                              send({ type: "close" });
                            }}
                            variant="ghost"
                          >
                            <Cross1Icon className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>close</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
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
                    <TooltipProvider>
                      <Tooltip delayDuration={200}>
                        <TooltipTrigger asChild>
                          <Button
                            className="button"
                            type="button"
                            onClick={() => {
                              send({ type: "back" });
                            }}
                          >
                            Back
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>back</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>

                    <TooltipProvider>
                      <Tooltip delayDuration={200}>
                        <TooltipTrigger asChild>
                          <Button
                            className="button"
                            disabled={!state.can({ type: "submit" })}
                          >
                            Submit
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>submit</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </form>
              </CardContent>
              <CardFooter></CardFooter>
            </Card>
          )}
        </div>
        <div className="basis-1/5">
          {state.context && (
            <div className="relative rounded-xl overflow-auto mx-auto w-full">
              <div className="bg-white px-6 py-8 shadow-xl text-slate-600 mx-auto overflow-auto text-xs dark:bg-slate-900 dark:text-slate-900">
                <pre className="text-white whitespace-pre-wrap">
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
    </div>
  );
}

function App() {
  return <Feedback />;
}

export default App;
