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
      "6660577c001a50ab27dc",
      {
        images: [
          "666058e30025b8f89c10",
          "66605a44003cadae6ddd",
          "66605a5e002c4c2bacdd",
          "66605a750003a6e09fdd",
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
