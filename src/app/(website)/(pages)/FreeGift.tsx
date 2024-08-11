"use client";
import React from "react";
import FreeGiftPopUp from "@/components/FreeGiftPopUp";
import FreeGiftModal from "@/components/Shared/FreeGiftModal";
import { selectUtils } from "@/redux/features/cart/cartSlice";
import { useSelector } from "react-redux";

const FreeGift = () => {
  const { isfreeGiftEnable, discountPercentage } = useSelector(selectUtils);

  if (isfreeGiftEnable && discountPercentage === 0) {
    return (
      <div>
        <FreeGiftModal />
        <FreeGiftPopUp />
      </div>
    );
  }

  return null;
};

export default FreeGift;
