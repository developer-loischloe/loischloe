import React, { Suspense } from "react";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import Image from "next/image";
import { unstable_noStore as noStore } from "next/cache";
import { Button } from "@/components/ui/button";
import LoadingSpiner from "@/components/Shared/loading/LoadingSpiner";
import { AllocateProductDialog } from "@/components/inventory/AllocateProductDialog";
import SelectStore from "@/components/inventory/SelectStore";
import { SelectDateRangePicker } from "@/components/inventory/SelectDateRangePicker";
import ComponentPrint from "@/components/Shared/ComponentPrint";
import appwriteInventoryService from "@/appwrite/appwriteInventoryService";
import { StoreDialog } from "@/components/inventory/shop/StoreDialog";
import SingleStoreInventoryDataPrintAbleComponent from "../(components)/SingleStoreInventoryDataPrintAbleComponent";
import { SingleStoreInventoryDataTable } from "../(components)/SingleStoreInventoryDataTable";
import { generateParams } from "@/lib/utils";
import Logo from "@/assets/Logo-Gold.png";

// Metadata
export const metadata: Metadata = {
  title: "Inventory",
};

// Type
export type InventoryItem = {
  id: string;
  product_id: any;
  product_name: any;
  product_image: any;
  store: {
    id: any;
    store_name: any;
    store_type: any;
  };
  total_allocation_quantity: number;
  total_sell_quantity: number;
  total_damage_quantity: number;
  total_return_quantity: number;
  available_quantity: number;
  createdAt: string;
  updatedAt: string;
};

// Utils
const getInventoryDataBetweenDateByStoreId = async ({
  storeId,
  fromDate,
  toDate,
}: {
  storeId: string;
  fromDate: string;
  toDate: string;
}) => {
  // Utility function
  const findDocumentsBetweenDates = (
    documents: any[],
    startDate: string,
    endDate: string
  ) => {
    return documents?.filter((doc) => {
      const createdAt = new Date(doc?.$createdAt);
      return createdAt >= new Date(startDate) && createdAt <= new Date(endDate);
    });
  };

  const response = await appwriteInventoryService.getInventory({
    page: 1,
    resultPerPage: 50000,
    searchString: "",
    storeId,
  });

  return response?.documents?.flatMap((inventory) => {
    // Calculate
    const total_allocation_quantity = findDocumentsBetweenDates(
      inventory?.inventoryAllocations,
      fromDate,
      toDate
    )?.reduce(
      (acc: number, allocation: any) => acc + allocation?.quantity_allocated,
      0
    ) as number;

    const total_sell_quantity = findDocumentsBetweenDates(
      inventory?.inventorySales,
      fromDate,
      toDate
    )?.reduce(
      (acc: number, sale: any) => acc + sale?.quantity_sold,
      0
    ) as number;

    const total_damage_quantity = findDocumentsBetweenDates(
      inventory?.inventoryDamages,
      fromDate,
      toDate
    )?.reduce(
      (acc: number, damage: any) => acc + damage?.quantity_damaged,
      0
    ) as number;

    const total_return_quantity = findDocumentsBetweenDates(
      inventory?.inventoryReturn,
      fromDate,
      toDate
    )?.reduce(
      (acc: number, returnItem: any) => acc + returnItem?.quantity_return,
      0
    ) as number;

    const available_quantity =
      total_allocation_quantity -
      (total_sell_quantity + total_damage_quantity + total_return_quantity);

    const data = {
      id: inventory.$id,
      product_id: inventory?.product?.$id,
      product_name: inventory?.product?.name,
      product_image: inventory?.product?.images[0].image_url,
      store: {
        id: inventory?.storeDetails?.$id,
        store_name: inventory?.storeDetails?.store_name,
        store_type: inventory?.storeDetails?.store_type,
      },
      total_allocation_quantity: total_allocation_quantity,
      total_sell_quantity: total_sell_quantity,
      total_damage_quantity: total_damage_quantity,
      total_return_quantity: total_return_quantity,
      available_quantity: available_quantity,
      createdAt: inventory.$createdAt,
      updatedAt: inventory.$updatedAt,
    };

    return data;
  });
};

const getPreviousYearDate = () => {
  const now = new Date();
  const previousYearDate = new Date(now);

  // Subtract one year from the current year
  previousYearDate.setFullYear(now.getFullYear() - 1);
  return previousYearDate.toISOString();
};

const InventoryPage = async ({
  searchParams: {
    storeId,
    fromDate = getPreviousYearDate(),
    toDate = new Date().toISOString(),
  },
}: {
  searchParams: {
    storeId: string;
    fromDate: string;
    toDate: string;
  };
}) => {
  noStore();

  // if have not store id, then redirect to a store
  if (!storeId) {
    const storeId = await appwriteInventoryService.getAStoreId();

    if (storeId) {
      // generate path
      const path = generateParams({
        storeId,
        fromDate,
        toDate,
      });

      redirect(`/dashboard/inventory/store?${path}`);
    } else {
      return (
        <div className="w-full max-w-7xl mx-auto flex flex-col items-center justify-center gap-10 min-h-[30vh]">
          <h1 className="text-red-500">Create a store first.</h1>

          <div>
            <StoreDialog heading="Create new store" type="create">
              <div className="mb-5">
                <Button>Create</Button>
              </div>
            </StoreDialog>
          </div>
        </div>
      );
    }
  }

  return (
    <div className="w-full max-w-7xl mx-auto ">
      <div className="w-full flex flex-wrap justify-between items-center gap-5 lg:gap-10">
        <AllocateProductDialog heading="Allocate Product">
          <Button>Allocate Product</Button>
        </AllocateProductDialog>
        <SelectStore
          basePath="/dashboard/inventory/store"
          storeId={storeId}
          extraSearchParams={{ fromDate, toDate }}
        />
        <SelectDateRangePicker
          basePath="/dashboard/inventory/store"
          dateData={{ from: new Date(fromDate), to: new Date(toDate) }}
          extraSearchParams={{ storeId }}
        />
      </div>
      <br />

      <Suspense
        fallback={<LoadingSpiner />}
        key={(Math.random() * 1000 + Math.random() * 100).toString()}
      >
        <AllInventoryItem
          storeId={storeId}
          fromDate={fromDate}
          toDate={toDate}
        />
      </Suspense>
    </div>
  );
};

export default InventoryPage;

const AllInventoryItem = async ({
  storeId,
  fromDate,
  toDate,
}: {
  storeId: string;
  fromDate: string;
  toDate: string;
}) => {
  // get inventoryData
  const inventoryData = await getInventoryDataBetweenDateByStoreId({
    storeId,
    fromDate,
    toDate,
  });

  return (
    <div>
      <ComponentPrint
        // settings={{ hidePrintAbleComponent: false }}
        documentTitle={`Store Report - ${
          inventoryData[0]?.store?.store_name
        } - ${new Date(Date.now()).toLocaleDateString()}`}
      >
        <div>
          <div>
            <div className="flex justify-center items-center mb-2">
              <Image src={Logo} alt="Logo" width={150} />
            </div>
            <h1 className="text-center">
              {new Date(fromDate).toLocaleDateString()}
              {" - "}
              {new Date(toDate).toLocaleDateString()}
            </h1>
          </div>
          <br />
          <SingleStoreInventoryDataPrintAbleComponent
            inventoryData={inventoryData}
          />
        </div>
      </ComponentPrint>
      <SingleStoreInventoryDataTable data={inventoryData} />
    </div>
  );
};
