import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TableUrl } from "./table";

export default function Page() {
  return (
    <div>
      <h3 className="text-foreground text-2xl mb-4 lg:mb-10 text-center capitalize">
        Masking your link and make money!
      </h3>
      <div className="flex w-full items-center gap-1.5">
        <Input
          className="rounded-xl h-10"
          type="url"
          id="url"
          name="url"
          placeholder="Enter long url"
        />
        <Input
          className="rounded-xl h-10"
          type="url"
          id="short_url"
          name="short_url"
          placeholder="Enter path url"
        />
        <Button>Shorten</Button>
      </div>
      <div className="mt-10">
        <TableUrl />
      </div>
    </div>
  );
}
