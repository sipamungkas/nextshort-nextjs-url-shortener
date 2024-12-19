"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { updatePassword } from "./action";
import { useActionState } from "react";
import { LoaderCircle, TriangleAlert } from "lucide-react";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

const initialState = {
  message: "",
  success: false,
};

export const ChangePasswordForm = () => {
  const [state, formAction, pending] = useActionState(
    updatePassword,
    initialState
  );

  const router = useRouter();

  return (
    <Card className="w-96">
      <CardHeader>
        <CardTitle>Reset Password</CardTitle>
        {!!state.message && !pending && (
          <CardDescription>
            <div
              className={cn(
                "p-2 rounded-md grid grid-flow-col auto-cols-max gap-2 items-center mt-2",
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
                className={cn(
                  state.success ? "text-green-500" : "text-red-500"
                )}
              >
                {state.message}
              </p>
            </div>
          </CardDescription>
        )}
      </CardHeader>
      <form>
        <CardContent>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Enter your password"
                required
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="framework">Confirm Password</Label>
              <Input
                id="confirm_password"
                name="confirm_password"
                type="password"
                placeholder="Enter your password again"
                required
              />
            </div>
          </div>
        </CardContent>
        <CardFooter className="grid gap-4">
          <Button disabled={pending} formAction={formAction}>
            {pending ? (
              <LoaderCircle className="animate-spin" />
            ) : (
              "Change Password"
            )}
          </Button>
          <Button
            variant="secondary"
            type="reset"
            onClick={() => router.replace("/dashboard")}
          >
            Back
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};
