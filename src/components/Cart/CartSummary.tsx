"use client";
import { Button } from "../ui/button";
import Link from "next/link";
import { formatCurrency } from "@/lib/utils";
import { useSelector } from "react-redux";
import { selectCartCost } from "@/redux/features/cart/cartSlice";
import ShippingCost from "./ShippingCost";
import useProductPrice from "@/lib/hooks/useProductPrice";
import useShippingCost from "@/lib/hooks/useShippingCost";

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
              <span>Total</span>
              <span> {formatCurrency(cartCost.total_cost)}</span>
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
