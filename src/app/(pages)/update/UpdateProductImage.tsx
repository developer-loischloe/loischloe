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
      "6627625f952164a7221d",
      {
        images: [
          "66276487e399c66ab595",
          "662764a47b0ce2cabc2d",
          "662764b90f9e2049a62b",
          "662764d3420c7096f0d0",
          "662764e9dffb27c3b794",
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
