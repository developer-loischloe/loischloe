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
      "660e6311cf219172e64a",
      {
        images: [
          "660e60ac889943d27b72",
          "660e5a383ce39c1e941e",
          "660e5a5c3d88d473107a",
          "660e5a77b920ecd81382",
          "660e5aeb1bad3b1c4527",
          "660e5ab7d217a760f801",
          "660e5a999b2befc79efe",
          "660e5b05e021a33faba9",
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
