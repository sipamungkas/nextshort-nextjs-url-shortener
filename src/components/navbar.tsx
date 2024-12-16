import Link from "next/link";
import Image from "next/image";
import { Button } from "./ui/button";
import { User } from "@supabase/supabase-js";

export const Navbar = ({ user }: { user: User }) => {
  return (
    <nav className="flex z-40 w-full h-auto items-center justify-center sticky top-0 inset-x-0 backdrop-blur-lg backdrop-saturate-150 bg-background/70">
      <header className="px-2 sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 ">
        <div className="bg-transparent  py-3 px-4 border-0 flex items-center justify-between gap-6 rounded-xl">
          <Link href="/">
            <Image
              src="/YukCek.png"
              width={157}
              height={46}
              className="h-5 w-auto"
              alt="yuk cek logo"
            />
          </Link>

          <div className="flex flex-row items-center">
            <span className="text-md font-sans capitalize">
              Hi {user?.email?.split("@")[0]} !
            </span>
            <div>
              <form action="/auth/sign-out" method="post">
                <Button className="ml-4" type="submit">
                  Sign out
                </Button>
              </form>
            </div>
          </div>
        </div>
      </header>
    </nav>
  );
};
