"use client";
import appwriteCategoryService from "@/appwrite/appwriteCategoryService";
import { databases } from "@/appwrite/appwriteConfig";
import { Button } from "@/components/ui/button";
import config from "@/config";
import { Client, Databases, Query } from "appwrite";
import React from "react";

const page = async () => {
  // const handleClick = async () => {
  //   const response = await databases.updateDocument(
  //     config.appwriteDatabaseId,
  //     config.appwriteCollectionId.product,
  //     "6609242905c07b4313df",
  //     {
  //       images: [
  //         "6609229879ce714edd75",
  //         "660922b4e04758235c12",
  //         "660922d1d582c917a309",
  //         "660922f48b0147617d9d",
  //         "",
  //         "",
  //       ],
  //     }
  //   );

  //   console.log(response);
  // };
  // const response = await fetch(
  //   "https://digimart-ecommerce.onrender.com/api/v1/products"
  // );
  // console.log(await response.json());

  const client = new Client();

  client
    .setEndpoint("https://cloud.appwrite.io/v1")
    .setProject("660ad726d063e9772949");

  const databases = new Databases(client);

  const response = await databases.listDocuments(
    "660b656a7f0e0cfd80b4",
    "660b658574b7a2261477",
    [Query.search("categories", "lips")]
  );

  console.log(response);

  return (
    <section>
      <Button>update</Button>
    </section>
  );
};

export default page;
