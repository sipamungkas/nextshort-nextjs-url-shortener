"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { headers } from "next/headers";

import { createClient } from "@/lib/utils/supabase/server";

const schema = z.object({
  email: z
    .string({
      invalid_type_error: "Invalid Email",
    })
    .email(),
  password: z
    .string({
      invalid_type_error: "Invalid Password",
    })
    .min(8, {
      message: "Invalid Password",
    }),
  turnstilesResponse: z.string().min(1),
});

export async function login(prevState: any, formData: FormData) {
  if (!formData.get("cf-turnstile-response")) {
    return { message: "Please complete the CAPTCHA" };
  }
  const validatedFields = schema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
    turnstilesResponse: formData.get("cf-turnstile-response"),
  });

  // Return early if the form data is invalid
  if (!validatedFields.success) {
    return { message: "Invalid Email or Password" };
  }

  // verify captcha cloudflare turnstile
  const header = await headers();
  const ip = (header.get("x-forwarded-for") ?? "127.0.0.1").split(",")[0];

  const response = await fetch(
    "https://challenges.cloudflare.com/turnstile/v0/siteverify",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        response: validatedFields.data.turnstilesResponse,
        ip,
        secret: process.env.CLOUDFLARE_TURNSTILE_SECRET_KEY,
      }),
    }
  );

  const outcome = await response.json();
  console.log({
    outcome,
    response: validatedFields.data.turnstilesResponse,
    ip,
    secret: process.env.CLOUDFLARE_TURNSTILE_SECRET_KEY,
  });

  if (!outcome.success) {
    return { message: "Invalid CAPTCHA" };
  }

  const supabase = await createClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: validatedFields.data.email,
    password: validatedFields.data.password,
  };

  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    return { message: "Invalid Email or Password" };
  }

  // revalidatePath("/", "layout");
  redirect("/dashboard");
}

export async function signup(formData: FormData) {
  const supabase = await createClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { error } = await supabase.auth.signUp(data);

  if (error) {
    redirect("/error");
  }

  revalidatePath("/", "layout");
  redirect("/account");
}
