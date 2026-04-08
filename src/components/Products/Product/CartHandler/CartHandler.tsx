"use client";
import { Button } from "@/components/ui/button";
import {
  addToCart,
  selectCartList,
  setShowCartSidebar,
} from "@/redux/features/cart/cartSlice";
import { Minus, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { trackAddToCart } from "@/lib/meta-pixel";

const CartHandler = ({ product }: { product: any }) => {
  const [quantity, setQuantity] = useState(1);
  const cartList = useSelector(selectCartList);
  const router = useRouter();

  useEffect(() => {
    if (cartList.length) {
      const items = cartList.find((item) => item.product.$id === product.$id);
      if (items) {
        setQuantity(items.quantity);
      }
    }
  }, []);

  const dispatch = useDispatch();

  const fireAddToCart = () => {
    trackAddToCart({
      content_ids: [product.$id],
      content_name: product.name,
      content_type: "product",
      contents: [
        {
          id: product.$id,
          quantity,
          item_price: product.sale_price || product.price,
        },
      ],
      currency: "BDT",
      value: (product.sale_price || product.price) * quantity,
      num_items: quantity,
    });
  };

  return (
    <div className="flex flex-col lg:flex-row gap-10 select-none">
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
              addToCart({ product, price: product.price, quantity })
            );
            fireAddToCart();
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
              addToCart({ product, price: product.price, quantity })
            );
            fireAddToCart();
            dispatch(setShowCartSidebar({ show: true }));
          }}
        >
          Add to Cart
        </Button>
      </div>
    </div>
  );
};
export default CartHandler;
"use client";
import { Button } from "@/components/ui/button";
import {
    addToCart,
    selectCartList,
    setShowCartSidebar,
} from "@/redux/features/cart/cartSlice";
import { Minus, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { trackAddToCart } from "@/lib/meta-pixel";

const CartHandler = ({ product }: { product: any }) => {
    const [quantity, setQuantity] = useState(1);
    const cartList = useSelector(selectCartList);
    const router = useRouter();

    useEffect(() => {
          if (cartList.length) {
                  const items = cartList.find((item) => item.product.$id === product.$id);
                  if (items) {
                            setQuantity(items.quantity);
                  }
          }
    }, []);

    const dispatch = useDispatch();

    const fireAddToCart = () => {
          trackAddToCart({
                  content_ids: [product.$id],
                  content_name: product.name,
                  content_type: "product",
                  contents: [{ id: product.$id, quantity, item_price: product.sale_price || product.price }],
                  currency: "BDT",
                  value: (product.sale_price || product.price) * quantity,
                  num_items: quantity,
          });
    };

    return (
          <div className="flex flex-col lg:flex-row gap-10 select-none">
                <div className="flex items-center gap-10 border max-w-max px-2 py-2 rounded-sm">
                        <Minus
                                    size={20}
                                    onClick={() => {
                                                  setQuantity((prev) => (prev >= 2 ? prev - 1 : prev));
                                    }}
                                    className="cursor-pointer"
                                  />
                        <span>{quantity}</span>span>
                        <Plus
                                    size={20}
                                    onClick={() => {
                                                  setQuantity((prev) => prev + 1);
                                    }}
                                    className="cursor-pointer"
                                  />
                </div>div>
          
                <div className="flex gap-5">
                        <Button
                                    onClick={() => {
                                                  dispatch(addToCart({ product, price: product.price, quantity }));
                                                  fireAddToCart();
                                                  router.push("/checkout");
                                    }}
                                  >
                                  Buy Now
                        </Button>Button>
                
                        <Button
                                    variant="outline"
                                    className="text-brand_primary border-brand_primary"
                                    onClick={() => {
                                                  dispatch(addToCart({ product, price: product.price, quantity }));
                                                  fireAddToCart();
                                                  dispatch(setShowCartSidebar({ show: true }));
                                    }}
                                  >
                                  Add to Cart
                        </Button>Button>
                </div>div>
          </div>div>
        );
};

export default CartHandler;</div>
