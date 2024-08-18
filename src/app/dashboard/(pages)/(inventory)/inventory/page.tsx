import React from "react";
import Image from "next/image";
import appwriteProductService from "@/appwrite/appwriteProductService";
import appwriteInventoryService from "@/appwrite/appwriteInventoryService";
import { OverAllInventoryDataTable } from "./(components)/OverAllInventoryDataTable";
import OverAllInventoryDataPrintableComponent from "./(components)/OverAllInventoryDataPrintableComponent";
import ComponentPrint from "@/components/Shared/ComponentPrint";
import { unstable_noStore as noStore } from "next/cache";

import Logo from "@/assets/Logo-Gold.png";

export type OverAllInventoryData = {
  id: string;
  product_name: any;
  product_image_url: any;
  product_quantity: any;
  product_price: any;
  product_sale_price: any;
  product_available_quantity: number;
};

const getOverAllInventoryData = async () => {
  const { getAvailableQuantityByProductId } = appwriteInventoryService;

  try {
    const response =
      await appwriteProductService.getAllProductbyExcludeParentCategory({
        parent_category: "offer",
      });

    const results = await Promise.all(
      response?.documents?.flatMap(async (product) => {
        const availableQuantity = await getAvailableQuantityByProductId(
          product?.$id
        );

        const data = {
          id: product?.$id,
          product_name: product?.name,
          product_image_url: product?.images?.[0]?.image_url,
          product_quantity: product?.product_quantity,
          product_price: product?.price,
          product_sale_price: product?.sale_price,
          product_available_quantity: availableQuantity,
        };

        return data;
      })
    );

    return results;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const page = async () => {
  noStore();

  const overAllInventoryData = await getOverAllInventoryData();

  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-center text-xl md:text-2xl mb-2">
        Inventory Overview
      </h1>

      <ComponentPrint
        // settings={{ hidePrintAbleComponent: false }}
        documentTitle={`Inventory Overview - ${new Date(
          Date.now()
        ).toLocaleDateString()}`}
      >
        <div>
          <div className="flex justify-center items-center mb-5">
            <Image src={Logo} alt="Logo" width={150} />
          </div>

          <OverAllInventoryDataPrintableComponent
            inventoryData={overAllInventoryData}
          />
        </div>
      </ComponentPrint>

      <OverAllInventoryDataTable data={overAllInventoryData} />
    </div>
  );
};

export default page;
