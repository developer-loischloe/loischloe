"use client";

import React from "react";
import { useDispatch } from "react-redux";
import { addToCart, setShowCartSidebar } from "@/redux/features/cart/cartSlice";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const PreOrderButton = ({
  product,
  className,
}: {
  product: any;
  className?: string;
}) => {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(addToCart({ product, price: product?.price, quantity: 1 }));
    dispatch(setShowCartSidebar({ show: true }));
  };

  return (
    <Button className={cn("w-full", className)} onClick={handleClick}>
      Pre-Order Now
    </Button>
  );
};

export default PreOrderButton;
