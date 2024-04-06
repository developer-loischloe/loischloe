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
      "66110b62534c53ca959f",
      {
        images: [
          "66110bee40494439a503",
          "66110c0dbff5279bc5dc",
          "",
          "",
          "",
          "",
          "",
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
