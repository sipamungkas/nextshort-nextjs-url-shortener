"use server";

import { createClient } from "@/lib/utils/supabase/server";
import { z } from "zod";

const schema = z.object({
  password: z.string().min(8),
  confirm_password: z.string().min(8),
});

export const updatePassword = async (prev: any, formData: FormData) => {
  try {
    const { password, confirm_password } = schema.parse(
      Object.fromEntries(formData)
    );
    if (password !== confirm_password) {
      return { success: false, message: "Passwords do not match" };
    }
    const supabase = await createClient();
    const { error } = await supabase.auth.updateUser({ password });
    if (error) {
      return { success: false, message: error.message };
    }
    return { success: true, message: "Password updated" };
  } catch (error) {
    console.log({ error });
    return { success: false, message: "An error occurred" };
  }
};
