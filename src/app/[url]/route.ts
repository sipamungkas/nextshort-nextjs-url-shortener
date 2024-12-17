import { createClient } from "@/lib/utils/supabase/server";
import { type NextRequest, NextResponse } from "next/server";
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

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
      .single();

    if (!data || error) {
      return NextResponse.redirect(new URL("/", req.url), {
        status: 302,
      });
    }
    return NextResponse.redirect(new URL(data?.original_url), {
      status: 302,
    });
  } catch (error) {
    console.log({ error });
    return NextResponse.redirect(new URL("/"), {
      status: 302,
    });
  }
}
