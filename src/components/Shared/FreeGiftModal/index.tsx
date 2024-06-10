"use client";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import appwriteProductService from "@/appwrite/appwriteProductService";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { selectIsEligibleForFreeGift } from "@/redux/features/cart/cartSlice";
import GiftProductCard from "./GiftProductCard";

const FreeGiftModal = () => {
  const isEligibleForFreeGift = useSelector(selectIsEligibleForFreeGift);

  const [open, setOpen] = useState<boolean>(isEligibleForFreeGift);
  const [products, setProducts] = useState<null | any>(null);

  useEffect(() => {
    setOpen(isEligibleForFreeGift);
  }, [isEligibleForFreeGift]);

  useEffect(() => {
    appwriteProductService
      .getProductsByIds(["660946a0a8b365fd47ee"])
      .then((products) => {
        const modifiedProducts = products.map((product) => {
          product.sale_price = 0;
          return product;
        });

        setProducts(modifiedProducts);
      });
  }, []);

  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger className="hidden">Open</DialogTrigger>
        <DialogContent className="!z-[10000]">
          <DialogHeader>
            <DialogTitle className="mb-5 text-2xl text-center">
              Select your free gift!
            </DialogTitle>
            <DialogDescription>
              <div className="max-w-max mx-auto">
                {products?.map((product: any) => (
                  <GiftProductCard
                    key={product?.$id}
                    product={product}
                    setOpen={setOpen}
                  />
                ))}
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default FreeGiftModal;
