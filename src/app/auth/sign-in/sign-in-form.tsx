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
import { login } from "./action";
import { useActionState } from "react";
import { LoaderCircle, TriangleAlert } from "lucide-react";

const initialState = {
  message: "",
};

export const SignInForm = () => {
  const [state, formAction, pending] = useActionState(login, initialState);

  return (
    <Card className="w-96">
      <CardHeader>
        <CardTitle>Sign In</CardTitle>
        {state.message && !pending && (
          <CardDescription>
            <div className="bg-red-100 p-2 rounded-md grid grid-flow-col auto-cols-max gap-2 items-center mt-2">
              <TriangleAlert className="h-4 w-4 text-red-500" />
              <p className="text-red-500">{state.message}</p>
            </div>
          </CardDescription>
        )}
      </CardHeader>
      <form>
        <CardContent>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Email</Label>
              <Input
                id="email"
                name="email"
                placeholder="Enter your email"
                required
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="framework">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Enter your password"
                required
              />
            </div>
          </div>
        </CardContent>
        <CardFooter className="grid gap-4">
          <Button disabled={pending} formAction={formAction}>
            {pending ? <LoaderCircle className="animate-spin" /> : "Sign In"}
          </Button>
          <div
            className="cf-turnstile"
            data-sitekey={process.env.NEXT_PUBLIC_CLOUDFLARE_SITE_KEY}
          ></div>
        </CardFooter>
      </form>
    </Card>
  );
};
