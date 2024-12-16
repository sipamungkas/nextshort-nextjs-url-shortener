import { redirect, RedirectType } from "next/navigation";
import { SignInForm } from "./sign-in-form";
import { createClient } from "@/lib/utils/supabase/server";

export default async function SignInPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (user) {
    redirect("/dashboard", RedirectType.replace);
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <SignInForm />
    </div>
  );
}
