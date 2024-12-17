"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useActionState } from "react";
import { createMask } from "./action";
import { CardDescription } from "@/components/ui/card";
import { TriangleAlert } from "lucide-react";
import { cn } from "@/lib/utils";

const initialState = {
  success: true,
  message: "",
};

export const CreateForm = () => {
  const [state, formAction, pending] = useActionState(createMask, initialState);

  return (
    <div className=" flex flex-col">
      {state.message && !pending && (
        <CardDescription>
          <div
            className={cn(
              "p-2 rounded-md grid grid-flow-col auto-cols-max gap-2 items-center mb-2",
              state.success ? "bg-green-100" : "bg-red-100"
            )}
          >
            <TriangleAlert
              className={cn(
                "h-4 w-4",
                state.success ? "text-green-500" : "text-red-500"
              )}
            />
            <p
              className={cn(state.success ? "text-green-500" : "text-red-500")}
            >
              {state.message}
            </p>
          </div>
        </CardDescription>
      )}

      <form
        className="flex flex-col md:flex-row w-full items-center gap-2"
        action={formAction}
      >
        <Input
          className="rounded-md md:rounded-xl h-10"
          type="original_url"
          id="original_url"
          name="original_url"
          placeholder="Enter Original Url"
          required
        />
        <Input
          className="rounded-md md:rounded-xl h-10"
          type="text"
          id="mask_url"
          name="mask_url"
          placeholder="Enter Mask Url"
          required
        />
        <Button type="submit" className="w-full">
          Shorten
        </Button>
      </form>
    </div>
  );
};
