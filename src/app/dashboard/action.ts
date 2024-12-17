import { createClient } from "@/lib/utils/supabase/client";
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

    const supabase = createClient();
    const { data: urls } = await supabase
      .from("urls")
      .select("short_url")
      .eq("short_url", validatedFields.data.maskUrl);

    if ((urls ?? []).length > 0) {
      return { success: false, message: "Mask url already exists" };
    }

    const { error } = await supabase.from("urls").insert([
      {
        title: validatedFields.data?.title,
        original_url: validatedFields.data?.original_url,
        short_url: validatedFields.data?.maskUrl,
        custom_url: validatedFields.data?.maskUrl,
      },
    ]);
    if (error) {
      return { success: false, message: "something went wrong" };
    }
    return { success: true, message: "Mask created successfully" };
  } catch (error) {
    console.log(error);
    return { success: false, message: "something went wrong" };
  }
};

export const getUrls = async () => {
  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("urls")
      .select("*")
      .neq("custom_url", null)
      .neq("original_url", null)
      .neq("short_url", null)
      .neq("original_url", "");
    if (error) {
      console.log(error);
      return { success: false, message: "something went wrong" };
    }
    return { success: true, data };
  } catch (error) {
    console.log(error);
    return { success: false, message: "something went wrong" };
  }
};
