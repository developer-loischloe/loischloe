"use client";
import React, { useEffect, useState } from "react";
import appwriteProductService from "@/appwrite/appwriteProductService";
import { useSelector, useDispatch } from "react-redux";
import {
  selectCartList,
  addToCart,
  checkItemExistOrNot,
} from "@/redux/features/cart/cartSlice";
import Image from "next/image";
import Link from "next/link";
import { formatCurrency } from "@/lib/utils";
import { ShoppingBag, Sparkles } from "lucide-react";
import { toast } from "sonner";

const YouMayAlsoLike = () => {
  const cartList = useSelector(selectCartList);
  const dispatch = useDispatch();
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!cartList.length) return;
    const topItem = cartList[0];
    const category = topItem?.product?.child_category || "";
    if (!category) return;

    setLoading(true);
    appwriteProductService
      .getRelatedProductsByCategory(category)
      .then((res) => {
        // Exclude items already in cart
        const cartIds = new Set(cartList.map((i) => i.product.$id));
        const filtered = (res?.documents || [])
          .filter((p: any) => !cartIds.has(p.$id))
          .slice(0, 4);
        setSuggestions(filtered);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [cartList]);

  if (!suggestions.length && !loading) return null;

  return (
    <div className="mt-6 border-t pt-5">
      <div className="flex items-center gap-2 mb-4">
        <Sparkles size={16} className="text-brand_primary" />
        <h6 className="font-semibold text-sm uppercase tracking-wide text-brand_secondary">
          Complete Your Routine
        </h6>
      </div>

      {loading ? (
        <div className="grid grid-cols-2 gap-3">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="h-[130px] bg-gray-100 rounded-lg animate-pulse"
            />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-3">
          {suggestions.map((product) => {
            const inCart = checkItemExistOrNot({
              items: cartList,
              currentProductId: product.$id,
            });
            return (
              <div
                key={product.$id}
                className="border rounded-lg p-2 flex flex-col gap-2 hover:border-brand_primary transition-all group"
              >
                <Link href={`/products/${product.slug}`}>
                  <div className="relative overflow-hidden rounded-md bg-[#fdf8f3]">
                    <Image
                      src={product?.images?.[0]?.image_url || "/placeholder.svg"}
                      alt={product.name}
                      width={120}
                      height={100}
                      className="w-full h-[80px] object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <p className="text-xs font-medium line-clamp-2 mt-1 leading-snug">
                    {product.name}
                  </p>
                </Link>
                <div className="flex items-center justify-between mt-auto">
                  <span className="text-xs font-semibold text-brand_secondary">
                    {formatCurrency(product.sale_price)}
                  </span>
                  {inCart ? (
                    <span className="text-xs text-green-600 font-medium">
                      ✓ Added
                    </span>
                  ) : (
                    <button
                      onClick={() => {
                        dispatch(
                          addToCart({
                            product,
                            price: product.sale_price,
                            quantity: 1,
                          })
                        );
                        toast(`${product.name} added to cart!`);
                      }}
                      className="bg-brand_secondary text-white text-[10px] px-2 py-1 rounded flex items-center gap-1 hover:bg-brand_primary hover:text-brand_secondary transition-all"
                    >
                      <ShoppingBag size={10} />
                      Add
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default YouMayAlsoLike;
