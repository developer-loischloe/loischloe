import React from "react";

import appwriteProductService from "@/appwrite/appwriteProductService";
import ClientWrapper from "./ClientWrapper";

const MustHaveEssentials = async () => {
  const products = await appwriteProductService.getMustEssentialsProductsByIds([
    "660906177ffa1cc98562",
    "66110b62534c53ca959f",
    "66090035745143268a80",
  ]);

  return (
    <section>
      <h1 className="heading-1 text-center">Absolute Must-Have Essentials</h1>
      <ClientWrapper products={products} />
    </section>
  );
};

export default MustHaveEssentials;
