"use client";
import React from "react";
import { Button } from "../ui/button";
import { useDispatch } from "react-redux";
import { addToCart, setShowCartSidebar } from "@/redux/features/cart/cartSlice";
import { sendGTMEvent } from "@next/third-parties/google";

const AddToCartButton = ({ product }: { product: any }) => {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(addToCart({ product, price: product?.sale_price, quantity: 1 }));
    dispatch(setShowCartSidebar({ show: true }));

    sendGTMEvent({ event: "AddToCart", value: product?.sale_price });
  };

  return (
    <Button className="w-full" onClick={handleClick}>
      Add To Cart
    </Button>
  );
};

export default AddToCartButton;
