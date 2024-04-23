import React from "react";
import ClientWrapper from "./ClientWrapper";
import appwriteProductService from "@/appwrite/appwriteProductService";

const LipStickSet = async () => {
  const products = await appwriteProductService.getProductsByIds([
    "660906177ffa1cc98562",
    "66110b62534c53ca959f",
    "66090035745143268a80",
  ]);

  return <ClientWrapper products={products} />;
};

export default LipStickSet;
