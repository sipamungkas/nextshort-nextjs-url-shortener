import { TableUrl } from "./table";
import { CreateForm } from "./create-from";
import { getUrls } from "./action";
import { Suspense } from "react";

export default async function Page() {
  const res = await getUrls();

  return (
    <div className="p-1">
      <h3 className="text-foreground text-2xl mb-4 lg:mb-10 text-center capitalize">
        Masking your link and make money!
      </h3>
      <CreateForm />
      <div className="mt-10">
        <Suspense fallback={<div>Loading...</div>}>
          <TableUrl data={res.data} />
        </Suspense>
      </div>
    </div>
  );
}
