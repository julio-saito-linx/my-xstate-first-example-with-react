"use client";

import { feedbackMachine } from "@/machines/feedbackMachine";
import { useMachine } from "@xstate/react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

function Feedback() {
  const [state, send] = useMachine(feedbackMachine);

  if (state.matches("closed")) {
    return (
      <div>
        <em>Feedback form closed.</em>
        <br />
        <button
          onClick={() => {
            send({ type: "restart" });
          }}
        >
          Provide more feedback
        </button>
      </div>
    );
  }

  return (
    <div className="preview flex min-h-[350px] w-full justify-center p-10 items-center">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Feedback</CardTitle>
          <CardDescription>What can we do better?</CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Name</Label>
                <Input id="name" placeholder="Name of your project" />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Framework</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select" />
                    <SelectContent position="popper">
                      <SelectItem value="next">Next.js</SelectItem>
                      <SelectItem value="sveltekit">SvelteKit</SelectItem>
                      <SelectItem value="astro">Astro</SelectItem>
                      <SelectItem value="nuxt">Nuxt.js</SelectItem>
                    </SelectContent>
                  </SelectTrigger>
                </Select>
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline">Cancel</Button>
          <Button>Deploy</Button>
        </CardFooter>
      </Card>
    </div>
  );
}

function App() {
  return <Feedback />;
}

export default App;
