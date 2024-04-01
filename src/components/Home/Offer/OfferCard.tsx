import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface OfferProps {
  title: string;
  textColor: string;
  discount: number;
  btnText: string;
  btnLink: string;
  bgImage: any;
  btnClassName?: string;
}

const OfferCard = ({ offer }: { offer: OfferProps }) => {
  return (
    <div className="relative flex-1 overflow-hidden  rounded-sm py-16 px-10">
      <Image
        src={offer.bgImage}
        alt={offer.title}
        className="absolute top-0 left-0 right-0 bottom-0 -z-50 w-full h-full"
      />
      <div className="flex flex-col gap-6 z-5  ">
        <div className={cn("flex flex-col gap-6", `text-[${offer.textColor}]`)}>
          <strong className="text-3xl">{offer.title}</strong>
          <small>
            UP TO{" "}
            <span className="text-brand_primary text-2xl font-semibold">
              {offer.discount}%{" "}
            </span>
            OFF
          </small>
        </div>
        <Link href={offer.btnLink}>
          <Button
            className={cn(
              "bg-brand_primary rounded-full text-black hover:bg-black/40 hover:text-white hover:scale-105 border border-brand_primary transition-all",
              offer.btnClassName
            )}
          >
            {offer.btnText}
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default OfferCard;
