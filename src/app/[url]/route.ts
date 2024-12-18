import { createClient } from "@/lib/utils/supabase/server";
import { type NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ url: string }> }
) {
  console.log({ requrl: req.url, next: req.nextUrl });
  try {
    const maskUrl = (await params).url;
    const supabase = await createClient();

    const { data, error } = await supabase
      .from("urls")
      .select("original_url")
      .eq("custom_url", maskUrl)
      .eq("is_active", true)
      .single();

    if (!data || error) {
      return NextResponse.redirect(new URL("/", req.nextUrl), {
        status: 302,
      });
    }
    return NextResponse.redirect(new URL(data?.original_url), {
      status: 302,
    });
  } catch (error) {
    console.log({ error });
    return NextResponse.redirect(new URL("/", req.nextUrl), {
      status: 302,
    });
  }
}
