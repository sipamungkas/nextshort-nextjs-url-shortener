import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="w-full min-h-screen p-12 relative flex flex-col items-center">
      <div className="max-w-xl">
        <Image
          src="/android-chrome-512x512.png"
          width={120}
          height={120}
          alt="YukCek!"
          className="mx-auto rounded-full"
        />
        <h1 className="font-sans font-semibold text-3xl text-center text-foreground mt-8">
          Yuk Cek!
        </h1>
        <p className="text-center mt-4">
          Server terbaik dan termurah untuk development dan production-mu!
        </p>

        <div className="w-full mt-8 grid grid-col gap-6">
          <Link href="https://yukcek.com/greencloud" target="_blank">
            <Button className="w-full p-7 text-base font-semibold rounded-sm transition-all ease-in-out duration-500 hover:scale-105">
              VPS Singapore
            </Button>
          </Link>

          <Link href="https://yukcek.com/orangevps" target="_blank">
            <Button className="w-full p-7 text-base font-semibold rounded-sm transition-all ease-in-out duration-500 hover:scale-105">
              VPS Budget Singapore
            </Button>
          </Link>

          <Link href="https://yukcek.com/fonnte" target="_blank">
            <Button className="w-full p-7 text-base font-semibold rounded-sm transition-all ease-in-out duration-500 hover:scale-105">
              Free Whatsapp API
            </Button>
          </Link>

          <Link href="https://yukcek.com/flaz" target="_blank">
            <Button className="w-full p-7 text-base font-semibold rounded-sm transition-all ease-in-out duration-500 hover:scale-105">
              VPS Indonesia Termurah
            </Button>
          </Link>

          <Link href="https://yukcek.com/onidel" target="_blank">
            <Button className="w-full p-7 text-base font-semibold rounded-sm transition-all ease-in-out duration-500 hover:scale-105">
              VPS SLA Uptime 100%
            </Button>
          </Link>

          <Link href="https://yukcek.com/contabo" target="_blank">
            <Button className="w-full p-7 text-base font-semibold rounded-sm transition-all ease-in-out duration-500 hover:scale-105">
              VPS Termurah Luar Negeri
            </Button>
          </Link>

          <Link href="https://yukcek.com/nevacloud" target="_blank">
            <Button className="w-full p-7 text-base font-semibold rounded-sm transition-all ease-in-out duration-500 hover:scale-105">
              VPS Indonesia terbaik
            </Button>
          </Link>
        </div>
        <footer className="flex flex-col items-center w-full mt-20">
          <span className="text-white/80 text-center text-sm font-semibold">
            © 2024 {""} YukCek! - All rights reserved created by{" "}
            <Link
              className="text-blue-300 "
              href="https://sipamungkas.com"
              target="_blank"
            >
              Sipamungkas
            </Link>
          </span>
        </footer>
      </div>
    </main>
  );
}
