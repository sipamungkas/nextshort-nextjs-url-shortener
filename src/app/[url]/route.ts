import { createClient } from "@/lib/utils/supabase/server";
import { NextResponse, type NextRequest } from "next/server";
import { z } from "zod";

const maskSchema = z.object({
  url: z.string(),
});

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ url: string }> }
) {
  try {
    const maskUrl = (await params).url;
    const validatedUrl = maskSchema.safeParse({ url: maskUrl });
    if (!validatedUrl.success) {
      return NextResponse.redirect(
        new URL("/", process.env.NEXT_PUBLIC_BASE_URL)
      );
    }
    const supabase = await createClient();

    const { data, error } = await supabase
      .from("urls")
      .select("original_url,id")
      .eq("custom_url", validatedUrl.data?.url)
      .eq("is_active", true)
      .single();

    if (!data || error) {
      return NextResponse.redirect(
        new URL("/", process.env.NEXT_PUBLIC_BASE_URL)
      );
    }

    supabase
      .rpc("increment_click_count", {
        url_id_param: data?.id,
      })
      .then();

    return NextResponse.redirect(new URL(data?.original_url));
  } catch (error) {
    console.log({ error });
    return NextResponse.redirect(
      new URL("/", process.env.NEXT_PUBLIC_BASE_URL)
    );
  }
}
