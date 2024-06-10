"use client";
import React from "react";
import { useDispatch } from "react-redux";
import { addToCart, setShowCartSidebar } from "@/redux/features/cart/cartSlice";
import { Button } from "@/components/ui/button";

const AddGiftToCartButton = ({ product }: { product: any }) => {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(addToCart({ product, price: product?.sale_price, quantity: 1 }));
    dispatch(setShowCartSidebar({ show: true }));
  };

  return (
    <Button className="w-full" onClick={handleClick}>
      Add To Cart
    </Button>
  );
};

export default AddGiftToCartButton;
