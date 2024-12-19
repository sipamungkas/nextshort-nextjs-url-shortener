import { createClient } from "@/lib/utils/supabase/server";
import { redirect } from "next/navigation";
import { type NextRequest } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ url: string }> }
) {
  try {
    const maskUrl = (await params).url;
    const supabase = await createClient();

    const { data, error } = await supabase
      .from("urls")
      .select("original_url")
      .eq("custom_url", maskUrl)
      .eq("is_active", true)
      .single();
    console.log({ data, error });
    if (!data || error) {
      return redirect("/");
    }

    return redirect(data?.original_url);
  } catch (error) {
    console.log({ error });
    return redirect("/");
  }
}
