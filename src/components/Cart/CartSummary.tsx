"use client";
import Link from "next/link";
import { Button } from "../ui/button";
import { formatCurrency } from "@/lib/utils";
import { useSelector } from "react-redux";
import {
  selectCartCost,
  selectCartList,
} from "@/redux/features/cart/cartSlice";
import ShippingCost from "./ShippingCost";
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

  return (
    <div className="space-y-5 w-full  max-w-[350px]">
      <div className="border p-3 rounded-sm">
        {title && <h5 className="text-2xl mb-5">{title}</h5>}
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
            {cartCost.discount > 0 && (
              <>
                <div className="flex justify-between gap-20">
                  <span>Discount</span>
                  <span className="text-red-500">
                    - {formatCurrency(cartCost.discount)}
                  </span>
                </div>
                <hr className="my-5" />
              </>
            )}
            <div className="flex justify-between gap-20 font-bold text-brand_secondary">
              <span>Total</span>
              <span>{formatCurrency(cartCost.total_cost)}</span>
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
