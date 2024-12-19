import { createClient } from "@/lib/utils/supabase/server";
// import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { type NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const supabase = await createClient();

  // Check if a user's logged in
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    await supabase.auth.signOut();
  }

  // revalidatePath("/", "layout");
  console.log({ req: req.url, req2: req.nextUrl.href });
  return redirect("/auth/sign-in");
}
