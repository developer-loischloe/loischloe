import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
} from "@/components/ui/pagination";
import { cn, generateParams } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";

export const PaginationComponent = ({
  currentPageNumber,
  resultPerPage,
  totalItems,
  basePath,
  extraSearchParams = {},
}: {
  currentPageNumber: number;
  resultPerPage: number;
  totalItems: number;
  basePath: string;
  extraSearchParams?: object;
}) => {
  const totalPage = Math.ceil(totalItems / resultPerPage);

  const pagination = () => {
    const pages = [];

    for (let i = 1; i <= totalPage; i++) {
      pages.push(i);
    }

    return pages;
  };

  return (
    <Pagination>
      <PaginationContent className="flex flex-wrap">
        <PaginationItem
          className={cn(Number(currentPageNumber) <= 1 && "hidden")}
        >
          <Link
            href={`${basePath}?${generateParams({
              page: Number(currentPageNumber) - 1,
              resultPerPage,
              ...extraSearchParams,
            })}`}
          >
            <Button variant={"outline"} className="space-x-1">
              <ChevronLeft size={16} /> <span>Prev</span>
            </Button>
          </Link>
        </PaginationItem>

        {Number(currentPageNumber) >= 1 && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}

        {pagination()
          .slice(
            currentPageNumber - 3 < 0 ? 0 : currentPageNumber - 3,
            currentPageNumber + 2
          )
          .map((pageNumber: number) => (
            <PaginationItem key={pageNumber}>
              <Link
                href={`${basePath}?${generateParams({
                  page: Number(pageNumber),
                  resultPerPage,
                  ...extraSearchParams,
                })}`}
              >
                <Button
                  variant={"ghost"}
                  className={cn(
                    Number(currentPageNumber) == pageNumber &&
                      "bg-brand_secondary hover:bg-brand_secondary text-white hover:text-white transition-all"
                  )}
                >
                  {pageNumber}
                </Button>
              </Link>
            </PaginationItem>
          ))}

        {Number(currentPageNumber) < totalPage && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}

        <PaginationItem
          className={cn(Number(currentPageNumber) >= totalPage && "hidden")}
        >
          <Link
            href={`${basePath}?${generateParams({
              page: Number(currentPageNumber) + 1,
              resultPerPage,
              ...extraSearchParams,
            })}`}
          >
            <Button variant={"outline"} className="space-x-1">
              <span>Next</span> <ChevronRight size={16} />
            </Button>
          </Link>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};
