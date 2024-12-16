"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

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
});

export async function login(prevState: any, formData: FormData) {
  const validatedFields = schema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  // Return early if the form data is invalid
  if (!validatedFields.success) {
    return { message: "Invalid Email or Password" };
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
  redirect("/account");
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
