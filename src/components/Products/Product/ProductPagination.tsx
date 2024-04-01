import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from "@/components/ui/pagination";
import { cn, generateParams } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

const ProductPagination = ({
  total,
  productPerPage,
  p_cat,
  c_cat,
  n_cat,
  keyword,
  page,
}: {
  total: number;
  productPerPage: number;
  p_cat: string;
  c_cat: string;
  n_cat: string;
  keyword: string;
  page: string;
}) => {
  // Client side pagination
  let total_page = Math.ceil(total / productPerPage);
  let pagination = [];
  for (let i = 1; i <= total_page; i++) {
    pagination.push(i);
  }

  return (
    <Pagination>
      <PaginationContent className="flex flex-wrap">
        <PaginationItem className={cn(Number(page) <= 1 && "hidden")}>
          <Link
            href={`/products?${generateParams({
              p_cat,
              c_cat,
              n_cat,
              keyword,
              page: Number(page) - 1,
            })}`}
          >
            <Button variant={"outline"} className="space-x-1">
              <ChevronLeft size={16} /> <span>Prev</span>
            </Button>
          </Link>
        </PaginationItem>
        {pagination.map((pageNumber) => (
          <PaginationItem key={pageNumber}>
            <Link
              href={`/products?${generateParams({
                p_cat,
                c_cat,
                n_cat,
                keyword,
                page: pageNumber,
              })}`}
            >
              <Button
                variant={"ghost"}
                className={cn(
                  Number(page) == pageNumber &&
                    "bg-brand_secondary hover:bg-brand_secondary text-white hover:text-white transition-all"
                )}
              >
                {pageNumber}
              </Button>
            </Link>
          </PaginationItem>
        ))}
        <PaginationItem className={cn(Number(page) >= total_page && "hidden")}>
          <Link
            href={`/products?${generateParams({
              p_cat,
              c_cat,
              n_cat,
              keyword,
              page: Number(page) + 1,
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

export default ProductPagination;
