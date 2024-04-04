import React from "react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

import Lipstick from "@/assets/category/lipstick.webp";
import FacePallette from "@/assets/category/Face-Pallette.png";
import Mascara from "@/assets/category/Mascara.webp";
import mascara from "@/assets/category/mascara.svg";

const TrendingCategories = () => {
  const categoriesConstant = [
    {
      icon: Lipstick,
      name: "Lipsticks",
      link: "products?p_category=makeup&c_category=lips",
    },
    {
      icon: FacePallette,
      name: "Face palette",
      link: "products?p_category=makeup&c_category=face&n_category=face-pallete",
    },
    {
      icon: Mascara,
      name: "Eye makeup",
      link: "products?p_category=makeup&c_category=eyes",
    },
    {
      icon: mascara,
      name: "Combo deals",
      link: "/offer",
    },
  ];

  return (
    <section>
      <h2 className="heading-1 text-center">Trending Categories</h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
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
                    className="w-full max-w-[60px] md:max-w-[80px]"
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

export default TrendingCategories;
