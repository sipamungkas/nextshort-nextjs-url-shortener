"use server";

import { createClient as createSupaServer } from "@/lib/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const createMaskSchema = z.object({
  original_url: z.string().url().min(5, "Original url is required"),
  maskUrl: z.string().min(1, "Mask url is required"),
  title: z.string().optional().default(""),
  qrCode: z.string().optional().default(""),
});

export const createMask = async (prevState: any, form: FormData) => {
  try {
    const validatedFields = createMaskSchema.safeParse({
      original_url: form.get("original_url"),
      maskUrl: form.get("mask_url"),
    });

    // Return early if the form data is invalid
    if (!validatedFields.success) {
      return {
        success: false,
        message: validatedFields.error.errors[0].message,
      };
    }

    const supabase = await createSupaServer();
    const { data: urls } = await supabase
      .from("urls")
      .select("short_url")
      .eq("short_url", validatedFields.data.maskUrl);

    if ((urls ?? []).length > 0) {
      return { success: false, message: "Mask url already exists" };
    }

    const user = await supabase.auth.getUser();

    const { error } = await supabase.from("urls").insert([
      {
        title: validatedFields.data?.title,
        original_url: validatedFields.data?.original_url,
        short_url: validatedFields.data?.maskUrl,
        custom_url: validatedFields.data?.maskUrl,
        user_id: user?.data.user?.id,
      },
    ]);
    if (error) {
      console.log({ error });
      return { success: false, message: "something went wrong" };
    }
    revalidatePath("/dashboard");
    return { success: true, message: "Mask created successfully" };
  } catch (error) {
    console.log(error);
    return { success: false, message: "something went wrong" };
  }
};

export const getUrls = async (page: number = 1, limit: number = 10) => {
  try {
    const supabase = await createSupaServer();
    const { data, error, count } = await supabase
      .from("urls")
      .select(
      `
      *,  
      daily_clicks (
        click_count
      )`,
        { count: "exact" }
      )
      .eq("daily_clicks.click_date", new Date().toISOString().split("T")[0])
      .neq("custom_url", null)
      .neq("original_url", null)
      .neq("short_url", null)
      .neq("original_url", "")
      .range((page - 1) * limit, page * limit - 1);

    if (error) {
      console.log(error);
      return { success: false, message: "something went wrong", data: [] };
    }
    return { success: true, message: "Masked List Data", data, count };
  } catch (error) {
    console.log(error);
    return { success: false, message: "something went wrong", data: [] };
  }
};

export const disableUrl = async ({
  id,
  isActive,
}: {
  id: string;
  isActive: boolean;
}) => {
  try {
    const supabase = await createSupaServer();

    const { error } = await supabase
      .from("urls")
      .update({ is_active: isActive })
      .eq("id", id);

    if (error) {
      console.log(error);
      return { success: false, message: "something went wrong" };
    }
    revalidatePath("/dashboard");
    return { success: true, message: "Update success" };
  } catch (error) {
    console.log(error);
    return { success: false, message: "something went wrong" };
  }
};

export const deleteurl = async (id: string) => {
  try {
    const supabase = await createSupaServer();
    const { error } = await supabase.from("urls").delete().eq("id", id);
    if (error) {
      console.log(error);
      return { success: false, message: "something went wrong" };
    }
    revalidatePath("/dashboard");
    return { success: true, message: "Delete success" };
  } catch (error) {
    console.log(error);
    return { success: false, message: "something went wrong" };
  }
};
