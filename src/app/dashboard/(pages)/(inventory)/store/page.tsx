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
import { PaginationComponent } from "@/components/Shared/Pagination/PaginationComponent";
import ResultPerPage from "@/components/dashboard/orders/ResultPerPage";
import { getBdDate } from "@/lib/utils";
import DeleteStore from "@/components/inventory/shop/DeleteStore";
import { StoreDialog } from "@/components/inventory/shop/StoreDialog";

// Metadata
export const metadata: Metadata = {
  title: "All Store",
};

const StorePage = ({
  searchParams: { page = "1", resultPerPage = "10" },
}: {
  searchParams: { page: string; resultPerPage: string };
}) => {
  noStore();

  return (
    <div className="w-full max-w-7xl mx-auto">
      <div className="w-full flex justify-between items-center">
        <div>
          <StoreDialog heading="Create new store" type="create">
            <div className="mb-5">
              <Button>Create</Button>
            </div>
          </StoreDialog>
        </div>
        <div>
          <ResultPerPage
            basePath="/dashboard/store"
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
        <AllStore page={page} resultPerPage={resultPerPage} />
      </Suspense>
    </div>
  );
};

export default StorePage;

const AllStore = async ({
  page,
  resultPerPage,
}: {
  page: string;
  resultPerPage: string;
}) => {
  const response = await appwriteInventoryService.getAllStore({
    page,
    resultPerPage,
  });

  return (
    <main className="w-full">
      {response?.total === 0 ? (
        <div className="w-full  max-w-7xl mx-auto flex justify-center flex-col items-center gap-5 py-5">
          <h2 className="text-center">No store found.</h2>
        </div>
      ) : (
        <div>
          <ScrollArea className="w-full">
            <Table className="bg-white rounded-md">
              <TableHeader>
                <TableRow>
                  <TableHead className="">Store Name</TableHead>
                  <TableHead className="">Store Type</TableHead>
                  <TableHead className="">Website</TableHead>
                  <TableHead className="min-w-[120px]">CreatedAt</TableHead>
                  <TableHead className="min-w-[120px]">UpdatedAt</TableHead>
                  <TableHead className="text-center">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {response?.documents?.map((store) => (
                  <TableRow key={store?.$id}>
                    <TableCell className="font-medium">
                      <p className="text-base">{store?.store_name}</p>
                    </TableCell>
                    <TableCell className="font-medium">
                      <p className="text-base">{store?.store_type}</p>
                    </TableCell>
                    <TableCell className="font-medium">
                      <p className="font-medium">
                        <Link
                          href={store?.web_address}
                          target="_blank"
                          className="underline hover:text-blue-500"
                        >
                          {store?.web_address}
                        </Link>
                      </p>
                    </TableCell>
                    <TableCell className="font-medium">
                      <time className="text-brand_primary">
                        {getBdDate(store?.$createdAt)}
                      </time>
                    </TableCell>
                    <TableCell className="font-medium">
                      <time className="text-brand_primary">
                        {getBdDate(store?.$updatedAt)}
                      </time>
                    </TableCell>
                    <TableCell className="flex justify-center">
                      <div className="flex gap-5">
                        <Link href={`/dashboard/store/${store?.$id}`}>
                          <Eye
                            size={20}
                            className="text-blue-500 cursor-pointer"
                          />
                        </Link>

                        <StoreDialog
                          heading="Update store"
                          type="update"
                          id={store?.$id}
                          data={store}
                        >
                          <PencilLine
                            size={20}
                            className="text-green-500 cursor-pointer"
                          />
                        </StoreDialog>

                        <DeleteStore id={store?.$id}>
                          <Trash2
                            size={20}
                            className="text-red-500 cursor-pointer"
                          />
                        </DeleteStore>
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
            basePath="/dashboard/store"
            currentPageNumber={Number(page)}
            resultPerPage={Number(resultPerPage)}
            totalItems={response?.total}
          />
        </div>
      )}
    </main>
  );
};
