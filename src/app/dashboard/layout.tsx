import { Navbar } from "@/components/navbar";
import { Toaster } from "@/components/ui/sonner";
import { createClient } from "@/lib/utils/supabase/server";

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="mx-auto relative w-full">
      <Navbar user={user!} />
      <main className="container max-w-5xl mx-auto mt-8 md:mt-20">
        {children}
      </main>
      <Toaster position="top-center" closeButton className="bg-background"/>
    </div>
  );
}
