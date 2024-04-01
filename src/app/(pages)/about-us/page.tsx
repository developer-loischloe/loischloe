"use client";
import appwriteCategoryService from "@/appwrite/appwriteCategoryService";
import { databases } from "@/appwrite/appwriteConfig";
import { Button } from "@/components/ui/button";
import config from "@/config";
import React from "react";

const page = async () => {
  const handleClick = async () => {
    const response = await databases.updateDocument(
      config.appwriteDatabaseId,
      config.appwriteCollectionId.product,
      "6609242905c07b4313df",
      {
        images: [
          "6609229879ce714edd75",
          "660922b4e04758235c12",
          "660922d1d582c917a309",
          "660922f48b0147617d9d",
          "",
          "",
        ],
      }
    );

    console.log(response);
  };

  return (
    <section>
      <Button onClick={handleClick}>update</Button>
    </section>
  );
};

export default page;
