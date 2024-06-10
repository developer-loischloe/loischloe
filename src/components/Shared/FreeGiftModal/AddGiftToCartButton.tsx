"use client";
import React, { Dispatch, SetStateAction } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "@/redux/features/cart/cartSlice";
import { Button } from "@/components/ui/button";

const AddGiftToCartButton = ({
  product,
  setOpen,
}: {
  product: any;
  setOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(addToCart({ product, price: product?.sale_price, quantity: 1 }));
    setOpen(false);
  };

  return (
    <Button className="w-full" onClick={handleClick}>
      Add To Cart
    </Button>
  );
};

export default AddGiftToCartButton;
