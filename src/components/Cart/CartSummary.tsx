"use client";
import { Button } from "../ui/button";
import Link from "next/link";
import { formatCurrency } from "@/lib/utils";
import { useSelector } from "react-redux";
import {
  selectCartCost,
  selectCartList,
} from "@/redux/features/cart/cartSlice";
import ShippingCost from "./ShippingCost";
import useProductPrice from "@/lib/hooks/useProductPrice";
import useShippingCost from "@/lib/hooks/useShippingCost";
import { sendGTMEvent } from "@next/third-parties/google";

const CartSummary = ({
  title,
  showBtn,
  hideSideBar,
}: {
  title?: string;
  showBtn?: boolean;
  hideSideBar?: () => void;
}) => {
  const cartCost = useSelector(selectCartCost);
  const cartList = useSelector(selectCartList);

  // calculate product price and shipping cost
  useProductPrice();
  useShippingCost("");

  return (
    <div className="space-y-5 w-full  max-w-[350px]">
      <div className="border p-5 rounded-sm">
        <h5 className="text-2xl mb-5">{title}</h5>
        <div>
          <div className="flex justify-between gap-20">
            <span>Product price</span>
            <span className="text-sm">
              {formatCurrency(cartCost.product_price)}
            </span>
          </div>

          <div>
            <ShippingCost />
          </div>
          <hr className="my-5" />
          <div>
            <div className="flex justify-between gap-20">
              <span>Discount</span>
              <span className="text-red-500">
                - {formatCurrency(cartCost.discount)}
              </span>
            </div>
            <hr className="my-5" />
            <div className="flex justify-between gap-20">
              <span className="font-bold text-brand_secondary">Total</span>
              <span className="text-brand_primary">
                {formatCurrency(cartCost.total_cost)}
              </span>
            </div>
          </div>
        </div>
      </div>
      {showBtn && (
        <div>
          <Link href={"/checkout"}>
            <Button
              className="w-full"
              onClick={() => {
                sendGTMEvent({ event: "InitiateCheckout", cartList, cartCost });

                hideSideBar && hideSideBar();
              }}
            >
              PROCEED TO CHECKOUT
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default CartSummary;
