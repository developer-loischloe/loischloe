"use client";
import React from "react";
import { databases } from "@/appwrite/appwriteConfig";
import config from "@/config";
import { Button } from "@/components/ui/button";

const UpdateProductImage = () => {
  const handleClick = async () => {
    const response = await databases.updateDocument(
      config.appwriteDatabaseId,
      config.appwriteCollectionId.product,
      "6660879b0029fb3c020a",
      {
        images: [
          "66608942002df072a753",
          "666089670037fdc707a3",
          "666168ab000426b029c2",
          "666168d400030f913e5e",
          "6661690d00046e932d8d",
          "6661693a00398007f703",
          "6661697b0012371e28fa",
          "",
          "",
        ],
      }
    );

    console.log(response);
  };
  return (
    <div>
      <Button onClick={handleClick}>update</Button>
    </div>
  );
};

export default UpdateProductImage;
