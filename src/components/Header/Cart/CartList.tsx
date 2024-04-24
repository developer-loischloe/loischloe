import { Button } from "@/components/ui/button";
import { selectCartList } from "@/redux/features/cart/cartSlice";
import Link from "next/link";
import React from "react";
import { useSelector } from "react-redux";
import CartItem from "./CartItem";

const CartList = () => {
  const cartList = useSelector(selectCartList);

  return (
    <div className="flex-1 space-y-5 ">
      {cartList.map((item) => (
        <CartItem key={item.product.$id} {...item} />
      ))}
    </div>
  );
};

export default CartList;
