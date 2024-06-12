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
  DialogOverlay,
} from "@/components/ui/dialog";
import GiftSlider from "./GiftSlider";
import { selectIsEligibleForFreeGift } from "@/redux/features/cart/cartSlice";

const FreeGiftModal = () => {
  const isEligibleForFreeGift = useSelector(selectIsEligibleForFreeGift);

  const [open, setOpen] = useState<boolean>(isEligibleForFreeGift);
  const [products, setProducts] = useState<null | any>(null);

  // =>>>>>>>>
  useEffect(() => {
    if (isEligibleForFreeGift) {
      setTimeout(() => {
        setOpen(isEligibleForFreeGift);
      }, 3000);
    } else {
      setOpen(isEligibleForFreeGift);
    }
  }, [isEligibleForFreeGift]);

  // => Fetch free products
  useEffect(() => {
    appwriteProductService
      .getProductsByIds([
        "66093fc505cd2ff14361",
        "660946a0a8b365fd47ee",
        "6609442884933e6e60c0",
      ])
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
        {/* <DialogTrigger className="">Open</DialogTrigger> */}
        <DialogOverlay className="bg-black  !z-[9999]">
          <DialogContent className="!z-[10000]">
            <DialogHeader>
              <DialogTitle className="mb-5 text-2xl text-center">
                Select your free gift!
              </DialogTitle>
              <DialogDescription>
                <GiftSlider products={products} setOpen={setOpen} />
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </DialogOverlay>
      </Dialog>
    </div>
  );
};

export default FreeGiftModal;
