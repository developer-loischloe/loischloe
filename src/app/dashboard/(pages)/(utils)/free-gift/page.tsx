import React from "react";
import FreeGiftToogler from "./FreeGiftToogler";
import appwriteUtilsService from "@/appwrite/appwriteUtilsService";

const FreeGiftPage = async () => {
  const response = await appwriteUtilsService.getUtils();
  // console.log(response);

  return (
    <div>
      <FreeGiftToogler defaultValue={response?.free_gift_enable} />
    </div>
  );
};

export default FreeGiftPage;
