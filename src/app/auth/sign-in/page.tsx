import { redirect, RedirectType } from "next/navigation";
import { SignInForm } from "./sign-in-form";
import { createClient } from "@/lib/utils/supabase/server";
import Script from "next/script";

export default async function SignInPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (user) {
    redirect("/dashboard", RedirectType.replace);
  }

  return (
    <>
      <Script
        src="https://challenges.cloudflare.com/turnstile/v0/api.js?onload=onloadTurnstileCallback"
        strategy="lazyOnload"
      />
      <div className="flex justify-center items-center h-screen">
        <SignInForm />
      </div>
    </>
  );
}
