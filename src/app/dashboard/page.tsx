import { TableUrl } from "./table";
import { CreateForm } from "./create-from";
import { getUrls } from "./action";
import { Suspense } from "react";
import PaginationComponent from "./pagination";

type Params = Promise<{ slug: string }>;
type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

// dashboard?page=2&limit=1

export default async function Page({
  searchParams,
}: {
  params: Params;
  searchParams: SearchParams;
}) {
  const sp = await searchParams;
  const page = sp.page;
  const limit = sp.limit;

  const res = await getUrls(Number(page) || 1, Number(limit) || 10);

  return (
    <div className="p-1">
      <h3 className="text-foreground text-2xl mb-4 lg:mb-10 text-center capitalize">
        Masking your link and make money!
      </h3>
      <CreateForm />
      <div className="mt-10">
        <Suspense fallback={<div>Loading...</div>}>
          <TableUrl data={res.data} />
          {res.count}
          <PaginationComponent
            count={res.count as number}
            page={Number(page) || 1}
            limit={Number(limit) || 10}
          />
        </Suspense>
      </div>
    </div>
  );
}
