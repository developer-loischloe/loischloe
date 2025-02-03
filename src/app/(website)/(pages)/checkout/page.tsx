"use client";

import React from "react";
import ShippingInformation from "@/components/Checkout/ShippingInformation";
import SendGTMEvent from "@/components/GTM/SendGTMEvent";
import { useSelector } from "react-redux";
import {
  selectCartCost,
  selectCartList,
} from "@/redux/features/cart/cartSlice";

const Checkout = () => {
  const cartCost = useSelector(selectCartCost);
  const cartList = useSelector(selectCartList);

  return (
    <section className="space-y-10">
      <SendGTMEvent
        params={{ event: "InitiateCheckout", cartList, cartCost }}
      />
      <ShippingInformation />
    </section>
  );
};

export default Checkout;
