"use client";
import { Button } from "@/components/ui/button";
import { addToCart, selectCartList } from "@/redux/features/cart/cartSlice";
import { Minus, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const CartHandler = ({ product }: { product: any }) => {
  const [quantity, setQuantity] = useState(1);

  const cartList = useSelector(selectCartList);

  const router = useRouter();

  console.log(cartList);

  useEffect(() => {
    if (cartList.length) {
      const items = cartList.find((item) => item.product.$id === product.$id);

      if (items) {
        setQuantity(items.quantity);
      }
    }
  }, []);

  const dispatch = useDispatch();

  return (
    <div className="flex flex-col md:flex-row gap-10 select-none">
      <div className="flex items-center gap-10 border max-w-max px-2 py-2 rounded-sm">
        <Minus
          size={20}
          onClick={() => {
            setQuantity((prev) => (prev >= 2 ? prev - 1 : prev));
          }}
          className="cursor-pointer"
        />
        <span>{quantity}</span>
        <Plus
          size={20}
          onClick={() => {
            setQuantity((prev) => prev + 1);
          }}
          className="cursor-pointer"
        />
      </div>
      <div className="flex gap-5">
        <Button
          onClick={() => {
            dispatch(
              addToCart({ product, price: product.sale_price, quantity })
            );

            router.push("/checkout");
          }}
        >
          Buy Now
        </Button>
        <Button
          variant="outline"
          className="text-brand_primary border-brand_primary"
          onClick={() => {
            dispatch(
              addToCart({ product, price: product.sale_price, quantity })
            );
          }}
        >
          Add to Cart
        </Button>
      </div>
    </div>
  );
};

export default CartHandler;
