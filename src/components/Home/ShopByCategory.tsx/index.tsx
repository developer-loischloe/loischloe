import React from "react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

import lipstick from "@/assets/category/lipstick.svg";
import powder from "@/assets/category/powder.svg";
import brush from "@/assets/category/brush.svg";
import mascara from "@/assets/category/mascara.svg";
import eyeliner from "@/assets/category/eyeliner.svg";

const ShopByCategory = () => {
  const categoriesConstant = [
    {
      icon: lipstick,
      name: "Lipsticks",
      link: "products?c_category=lips",
    },
    {
      icon: powder,
      name: "Face palette",
      link: "products?n_category=loose-powder",
    },
    {
      icon: brush,
      name: "Eye makeup",
      link: "products?c_category=tools-%26-brushes",
    },
    {
      icon: mascara,
      name: "Combo deals",
      link: "products?n_category=mascara",
    },
  ];

  return (
    <section>
      <h2 className="heading-1 text-center">Trending Categories</h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-10">
        {categoriesConstant.map((category) => (
          <div key={category.name} className="max-w-max mx-auto space-y-3">
            <Link href={category.link}>
              <div
                className={cn(
                  "w-[90px] h-[90px] md:w-[130px] md:h-[130px] rounded-full flex items-center justify-center p-3 md:p-4",
                  `bg-[#ffb662b2]`
                )}
              >
                <div className="w-full h-full bg-[#fff] rounded-full flex items-center justify-center">
                  <Image
                    src={category.icon}
                    alt="Lipstick"
                    className="w-full max-w-[40px] md:max-w-[60px]"
                  />
                </div>
              </div>
            </Link>
            <div className="w-full flex flex-col items-center justify-center">
              <h5 className="text-lg font-semibold">{category.name}</h5>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ShopByCategory;
