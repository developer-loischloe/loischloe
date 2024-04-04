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
      "660e6311cf219172e64a",
      {
        images: [
          "660e60ac889943d27b72",
          "660ec023ac46f7efafc3",
          "660ec05b8e9b719e203c",
          "660ec09e61076e1db502",
          "660ec0d932413762616e",
          "660ec0efb8cf55d253ca",
          "660ec11c23a8dc0aa762",
          "660ec148d0da1f01afbe",
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
