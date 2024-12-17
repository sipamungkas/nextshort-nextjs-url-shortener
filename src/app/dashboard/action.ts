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
    console.log({ form: form.getAll("name") });
    const validatedFields = createMaskSchema.safeParse({
      original_url: form.get("original_url"),
      maskUrl: form.get("mask_url"),
    });

    console.log({ validatedFields });
    // Return early if the form data is invalid
    if (!validatedFields.success) {
      console.log({ error: validatedFields.error });
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

    const { data, error } = await supabase.from("urls").insert([
      {
        title: validatedFields.data?.title,
        original_url: validatedFields.data?.original_url,
        short_url: validatedFields.data?.maskUrl,
        custom_url: validatedFields.data?.maskUrl,
      },
    ]);
    console.log({ data, error });
    if (error) {
      console.log(error);
      return { success: false, message: "something went wrong" };
    }
    return { success: true, message: "Mask created successfully" };
  } catch (error) {
    console.log(error, { catchError: "lksdfjlks" });
    return { success: false, message: "something went wrong" };
  }
};

export const getUrls = async () => {
  const supabase = createClient();
  const { data, error } = await supabase.from("urls").select("*");
  if (error) {
    console.log(error);
    return { success: false, message: "something went wrong" };
  }
  return { success: true, data };
};
