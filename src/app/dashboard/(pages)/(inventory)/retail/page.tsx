import React, { Suspense } from "react";
import Link from "next/link";
import { Metadata } from "next";
import { unstable_noStore as noStore } from "next/cache";
import { Eye, PencilLine, Trash2 } from "lucide-react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Button } from "@/components/ui/button";
import LoadingSpiner from "@/components/Shared/loading/LoadingSpiner";
import appwriteInventoryService from "@/appwrite/appwriteInventoryService";
import { ShopDialog } from "@/components/inventory/shop/ShopDialog";
import DeleteShop from "@/components/inventory/shop/DeleteShop";
import { PaginationComponent } from "@/components/Shared/Pagination/PaginationComponent";
import ResultPerPage from "@/components/dashboard/orders/ResultPerPage";
import { getBdDate } from "@/lib/utils";

// Metadata
export const metadata: Metadata = {
  title: "Retail Shops",
};

const RetailShopPage = ({
  searchParams: { page = "1", resultPerPage = "10" },
}: {
  searchParams: { page: string; resultPerPage: string };
}) => {
  noStore();

  return (
    <div className="w-full max-w-7xl mx-auto">
      <div className="w-full flex justify-between items-center">
        <div>
          <ShopDialog heading="Create new shop" type="create">
            <div className="mb-5">
              <Button>Create</Button>
            </div>
          </ShopDialog>
        </div>
        <div>
          <ResultPerPage
            basePath="/dashboard/retail"
            resultPerPage={resultPerPage}
            extraSearchParams={{ page }}
          />
        </div>
      </div>

      <br />

      <Suspense
        fallback={<LoadingSpiner />}
        key={(Math.random() * 1000 + Math.random() * 100).toString()}
      >
        <AllRetailShop page={page} resultPerPage={resultPerPage} />
      </Suspense>
    </div>
  );
};

export default RetailShopPage;

const AllRetailShop = async ({
  page,
  resultPerPage,
}: {
  page: string;
  resultPerPage: string;
}) => {
  const response = await appwriteInventoryService.getAllRetailShop({
    page,
    resultPerPage,
  });

  return (
    <main className="w-full">
      {response.total === 0 ? (
        <div className="w-full  max-w-7xl mx-auto flex justify-center flex-col items-center gap-5 py-5">
          <h2 className="text-center">No shop found</h2>
        </div>
      ) : (
        <div>
          <ScrollArea className="w-full">
            <Table className="bg-white rounded-md">
              <TableHeader>
                <TableRow>
                  <TableHead className="">Shop</TableHead>
                  <TableHead className="">Website</TableHead>
                  <TableHead className="min-w-[120px]">CreatedAt</TableHead>
                  <TableHead className="text-center">Total Items</TableHead>
                  <TableHead className="text-center">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {response?.documents?.map((shop) => (
                  <TableRow key={shop?.$id}>
                    <TableCell className="font-medium">
                      <p className="text-base">{shop?.shop_name}</p>
                    </TableCell>
                    <TableCell className="font-medium">
                      <p className="font-medium">
                        <Link
                          href={shop?.website}
                          target="_blank"
                          className="underline hover:text-blue-500"
                        >
                          {shop?.website}
                        </Link>
                      </p>
                    </TableCell>
                    <TableCell className="font-medium">
                      <time className="text-brand_primary">
                        {getBdDate(shop?.$createdAt)}
                      </time>
                    </TableCell>
                    <TableCell className="font-medium text-center">
                      <p className="text-base">{shop?.shopItems?.length}</p>
                    </TableCell>
                    <TableCell className="flex justify-center">
                      <div className="flex gap-5">
                        <Link href={`/dashboard/retail/${shop?.$id}`}>
                          <Eye
                            size={20}
                            className="text-blue-500 cursor-pointer"
                          />
                        </Link>

                        <ShopDialog
                          heading="Edit shop"
                          type="update"
                          id={shop?.$id}
                          data={shop}
                        >
                          <PencilLine
                            size={20}
                            className="text-green-500 cursor-pointer"
                          />
                        </ShopDialog>

                        <DeleteShop id={shop?.$id}>
                          <Trash2
                            size={20}
                            className="text-red-500 cursor-pointer"
                          />
                        </DeleteShop>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            <ScrollBar orientation="horizontal" />
          </ScrollArea>

          <br />
          <PaginationComponent
            basePath="/dashboard/retail"
            currentPageNumber={Number(page)}
            resultPerPage={Number(resultPerPage)}
            totalItems={response.total}
          />
        </div>
      )}
    </main>
  );
};
