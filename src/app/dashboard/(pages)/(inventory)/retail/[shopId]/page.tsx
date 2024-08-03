import React, { Suspense } from "react";
import Image from "next/image";
import { unstable_noStore as noStore } from "next/cache";
import { Trash2 } from "lucide-react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import LoadingSpiner from "@/components/Shared/loading/LoadingSpiner";
import DeleteRetailShopItem from "@/components/inventory/DeleteRetailShopItem";
import appwriteInventoryService from "@/appwrite/appwriteInventoryService";
import { getBdDate } from "@/lib/utils";

const SingleShopPage = async ({
  params: { shopId },
}: {
  params: { shopId: string };
}) => {
  noStore();

  return (
    <div>
      <Suspense
        fallback={<LoadingSpiner />}
        key={(Math.random() * 1000 + Math.random() * 100).toString()}
      >
        <SingleShop id={shopId} />
      </Suspense>
    </div>
  );
};

export default SingleShopPage;

const SingleShop = async ({ id }: { id: string }) => {
  const shop = await appwriteInventoryService.getRetailShopDetails({
    id,
  });

  return (
    <>
      <div className="w-full max-w-5xl mx-auto ">
        <div className="w-full">
          <h1 className="text-center text-xl text-brand_primary">
            {shop?.shop_name}
          </h1>
        </div>
        <br />
        <ScrollArea className="w-full">
          <Table className="bg-white rounded-md">
            <TableHeader>
              <TableRow>
                <TableHead className="min-w-[100px]">Image</TableHead>
                <TableHead className="text-center min-w-[180px]">
                  Product
                </TableHead>
                <TableHead className="text-center">Quantity</TableHead>
                <TableHead className="text-center min-w-[150px]">
                  Date
                </TableHead>
                <TableHead className="text-center">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {shop?.shopItems?.map((item: any) => (
                <TableRow key={item?.$id}>
                  <TableCell className="font-medium">
                    <Image
                      src={item?.inventory?.product?.images[0].image_url}
                      alt={item?.inventory?.product?.name}
                      width={50}
                      height={50}
                    />
                  </TableCell>
                  <TableCell className="font-medium">
                    <p className="text-center">
                      {item?.inventory?.product?.name}
                    </p>
                  </TableCell>

                  <TableCell className="font-medium">
                    <p className="text-center">{item?.quantity}</p>
                  </TableCell>
                  <TableCell className="font-medium text-center">
                    <time className="text-brand_primary">
                      {getBdDate(item?.$createdAt)}
                    </time>
                  </TableCell>
                  <TableCell className="flex justify-center">
                    <div className="flex gap-5">
                      <DeleteRetailShopItem id={item?.$id}>
                        <Trash2
                          size={20}
                          className="text-red-500 cursor-pointer"
                        />
                      </DeleteRetailShopItem>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
    </>
  );
};
