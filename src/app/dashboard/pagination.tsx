"use client";

import {
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  Pagination,
} from "@/components/ui/pagination";

// http://localhost:3000/dashboard?page=1&limit=10

export default function PaginationComponent({
  count,
  page,
  limit,
}: {
  count: number;
  page: number;
  limit: number;
}) {
  const totalPage = Math.ceil(count / limit);

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href={
              "dashboard?page=" + (page > 1 ? page - 1 : 1) + "&limit=" + limit
            }
          />
        </PaginationItem>
        {Array.from({ length: totalPage }).map((_, index) => {
          if (
            (index <= page + 1 && index >= page - 1) ||
            index === 0 ||
            index === totalPage - 1
          ) {
            return (
              <PaginationItem key={index}>
                <PaginationLink
                  isActive={page - 1 === index}
                  href={"dashboard?page=" + (index + 1) + "&limit=" + limit}
                >
                  {index + 1}
                </PaginationLink>
              </PaginationItem>
            );
          } else if (
            (index === page + 2 || index === page - 2) &&
            index !== totalPage - 1
          ) {
            return (
              <PaginationItem key={index}>
                <PaginationEllipsis />
              </PaginationItem>
            );
          }
          return null;
        })}
        <PaginationItem>
          <PaginationNext
            href={
              "dashboard?page=" +
              (page === totalPage ? page : page + 1) +
              "&limit=" +
              limit
            }
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
