"use client";
import React from "react";
import { Button } from "../ui/button";
import { useDispatch } from "react-redux";
import { addToCart, setShowCartSidebar } from "@/redux/features/cart/cartSlice";

const AddToCartButton = ({ product }: { product: any }) => {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(addToCart({ product, price: product?.price, quantity: 1 }));
    dispatch(setShowCartSidebar({ show: true }));
  };

  return (
    <Button className="w-full" onClick={handleClick}>
      Add To Cart
    </Button>
  );
};

export default AddToCartButton;
