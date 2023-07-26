"use client";

import { feedbackMachine } from "@/machines/feedbackMachine";
import { useMachine } from "@xstate/react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";

function Feedback() {
  const [state, send] = useMachine(feedbackMachine);
  const router = useRouter();

  return (
    <>
      <div className="col-span-2 col-start-2 row-start-2">
        <div className="container mx-auto px-4">
          <div className="flex flex-col justify-around items-center h-[80vh]">
            <div className="preview flex min-h-[380px] w-full justify-center p-5 items-center text-5xl">
              XState Machines
            </div>
          </div>
        </div>
      </div>
      <div className="col-start-4 row-start-2"></div>
    </>
  );
}

function App() {
  return <Feedback />;
}

export default App;
