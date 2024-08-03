import React, { Suspense } from "react";
import Image from "next/image";
import { unstable_noStore as noStore } from "next/cache";
import { PencilLine, Plus, Trash2 } from "lucide-react";
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
import { PaginationComponent } from "@/components/Shared/Pagination/PaginationComponent";
import ResultPerPage from "@/components/dashboard/orders/ResultPerPage";
import { InventoryDialog } from "@/components/inventory/InventoryDialog";
import DeleteInventory from "@/components/inventory/DeleteInventory";
import { DispatchInventoryItemDialog } from "@/components/inventory/DispatchInventoryItemDialog";
import appwriteInventoryService from "@/appwrite/appwriteInventoryService";
import { UpdateDispatchItemQuantityDialog } from "@/components/inventory/UpdateDispatchItemQuantityDialog";
import SearchBar from "@/components/inventory/SearchBar";
import { getBdDate, getBdtime } from "@/lib/utils";

const InventoryPage = async ({
  searchParams: { page = "1", resultPerPage = "10", product = "" },
}: {
  searchParams: { page: string; resultPerPage: string; product: string };
}) => {
  noStore();

  return (
    <div>
      <Suspense
        fallback={<LoadingSpiner />}
        key={(Math.random() * 1000 + Math.random() * 100).toString()}
      >
        <AllInventoryItem
          page={page}
          resultPerPage={resultPerPage}
          product={product}
        />
      </Suspense>
    </div>
  );
};

export default InventoryPage;

const AllInventoryItem = async ({
  page,
  resultPerPage,
  product,
}: {
  page: string;
  resultPerPage: string;
  product: string;
}) => {
  const response = await appwriteInventoryService.getInventory({
    page,
    resultPerPage,
    product,
  });

  const existingProduct = response?.documents?.map(
    (inventoryItem) => inventoryItem?.product?.$id
  );

  return (
    <>
      <div className="w-full max-w-5xl mx-auto ">
        <div className="w-full flex justify-between items-center">
          <div>
            <InventoryDialog
              heading="Create New Inventory Item"
              type="create"
              existingProduct={existingProduct}
              retailShopTotalQuantity={0}
            >
              <Button>Create</Button>
            </InventoryDialog>
          </div>
          <SearchBar product={product} />
          <div>
            <ResultPerPage
              basePath="/dashboard/inventory"
              resultPerPage={resultPerPage}
              extraSearchParams={{ page }}
            />
          </div>
        </div>
        <br />
        {response.total === 0 ? (
          <div className="w-full  max-w-7xl mx-auto flex justify-center flex-col items-center gap-5 py-5">
            <h2 className="text-center">Inventory is empty.</h2>
          </div>
        ) : (
          <div>
            <ScrollArea className="w-full">
              <Table className="bg-white rounded-md">
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-center min-w-[100px]">
                      Image
                    </TableHead>
                    <TableHead className="text-center min-w-[180px]">
                      Product
                    </TableHead>
                    <TableHead className="text-center">
                      Total Quantity
                    </TableHead>
                    <TableHead className="text-center">Store Sell</TableHead>
                    <TableHead className="text-center">Damage</TableHead>
                    <TableHead className="text-center min-w-[150px]">
                      Retail Shop
                    </TableHead>
                    <TableHead className="text-center">Stock</TableHead>
                    <TableHead className="text-center min-w-[200px]">
                      Last Update
                    </TableHead>
                    <TableHead className="text-center">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {response?.documents?.map((inventory) => {
                    const totalQuantity = inventory?.total_quantity;
                    const retailShopTotalQuantity =
                      inventory?.shopItems?.reduce(
                        (prev: number, item: any) => prev + item?.quantity,
                        0
                      );
                    const storeSell = inventory?.store_sell;
                    const damage = inventory?.damage;
                    const availableQuantity =
                      totalQuantity -
                      (retailShopTotalQuantity + storeSell + damage);

                    return (
                      <TableRow key={inventory?.$id}>
                        <TableCell className="font-medium">
                          <Image
                            src={inventory?.product?.images[0].image_url}
                            alt={inventory?.product?.name}
                            width={100}
                            height={100}
                          />
                        </TableCell>
                        <TableCell className="font-medium">
                          <p className="text-center">
                            {inventory?.product?.name}
                          </p>
                        </TableCell>

                        <TableCell className="font-medium">
                          <p className="text-center">
                            {inventory?.total_quantity}
                          </p>
                        </TableCell>
                        <TableCell className="font-medium">
                          <p className="text-center">{inventory?.store_sell}</p>
                        </TableCell>
                        <TableCell className="font-medium">
                          <p className="text-center">{inventory?.damage}</p>
                        </TableCell>
                        <TableCell className="font-medium">
                          <div className="text-center space-x-2 space-y-2">
                            <div>
                              <p>Total: {retailShopTotalQuantity}</p>
                            </div>
                            <div>
                              {inventory?.shopItems?.map(
                                (item: any, index: number) => (
                                  <UpdateDispatchItemQuantityDialog
                                    key={item?.$id}
                                    heading="Update shop quantity"
                                    id={item?.$id}
                                    quantity={item?.quantity}
                                    shop={item?.shop}
                                    availableQuantity={availableQuantity}
                                  >
                                    <span className="text-xs">
                                      {item?.shop?.shop_name}
                                      {index + 1 !==
                                        inventory?.shopItems?.length && ","}
                                    </span>
                                  </UpdateDispatchItemQuantityDialog>
                                )
                              )}
                            </div>
                            <div className="">
                              <DispatchInventoryItemDialog
                                heading="Dispatch Item"
                                id={inventory?.$id}
                                existingShop={inventory?.shopItems?.map(
                                  (item: any) => item?.shop?.shop_name
                                )}
                                availableQuantity={availableQuantity}
                              >
                                <Button
                                  variant={"outline"}
                                  size={"sm"}
                                  className="w-full flex gap-1 items-center"
                                >
                                  <Plus
                                    size={10}
                                    className="text-blue-500 cursor-pointer"
                                  />
                                  <span className="text-xs">add shop</span>
                                </Button>
                              </DispatchInventoryItemDialog>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="font-medium">
                          <p className="text-center">{availableQuantity}</p>
                        </TableCell>
                        <TableCell className="font-medium space-x-2">
                          <time className="text-brand_primary">
                            {getBdDate(inventory?.$updatedAt)}
                          </time>
                          <span>-</span>
                          <time className="text-brand_primary">
                            {getBdtime(inventory?.$updatedAt)}
                          </time>
                        </TableCell>

                        <TableCell className="h-full flex justify-center">
                          <div className=" h-full flex items-center gap-5">
                            <InventoryDialog
                              heading="Edit Inventory Item"
                              type="update"
                              id={inventory?.$id}
                              existingProduct={existingProduct}
                              data={inventory}
                              retailShopTotalQuantity={retailShopTotalQuantity}
                            >
                              <PencilLine
                                size={20}
                                className="text-green-500 cursor-pointer"
                              />
                            </InventoryDialog>

                            <DeleteInventory id={inventory?.$id}>
                              <Trash2
                                size={20}
                                className="text-red-500 cursor-pointer"
                              />
                            </DeleteInventory>
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>

              <ScrollBar orientation="horizontal" />
            </ScrollArea>

            <br />
            <PaginationComponent
              basePath="/dashboard/inventory"
              currentPageNumber={Number(page)}
              resultPerPage={Number(resultPerPage)}
              totalItems={response.total}
            />
          </div>
        )}
      </div>
    </>
  );
};
