import { Heart } from "lucide-react";
import Link from "next/link";
import React from "react";

const WishListBtn = () => {
  return (
    <Link href={"/wishlist"}>
      <div className="relative">
        <Heart />
        <span className="absolute -top-2 -right-2 md:-top-3 md:-right-3 bg-brand_primary w-5 h-5 md:w-6 md:h-6 rounded-full text-sm flex items-center justify-center">
          5
        </span>
      </div>
    </Link>
  );
};

export default WishListBtn;
