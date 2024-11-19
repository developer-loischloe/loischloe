import React from "react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

import Lipstick from "@/assets/category/lipstick.jpeg";
import FacePallette from "@/assets/category/Face-Pallete.jpeg";
import Mascara from "@/assets/category/Mascara.jpeg";
import mascara from "@/assets/category/Combo.jpeg";

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
      link: "products?p_category=makeup&c_category=face",
    },
    {
      icon: Mascara,
      name: "Eye makeup",
      link: "products?p_category=makeup&c_category=eyes",
    },
    {
      icon: mascara,
      name: "Combo deals",
      link: "/combo-deals",
    },
  ];

  return (
    <section>
      <h5 className="text-center subHeading">Explore</h5>
      <h2 className="heading-1 text-center">Trending Categories</h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
        {categoriesConstant.map((category) => (
          <div key={category.name} className="max-w-max mx-auto space-y-3">
            <Link href={category.link}>
              <div
                className={cn(
                  "w-[90px] h-[90px] md:w-[130px] md:h-[130px] lg:w-[140px] lg:h-[140px] rounded-full flex items-center justify-center p-2",
                  `bg-[#ffb662b2]`,
                  `hover:scale-110 transition-all duration-300`
                )}
              >
                <div className="w-full h-full bg-[#fff] rounded-full flex items-center justify-center">
                  <Image
                    src={category.icon}
                    alt="Lipstick"
                    className="w-full h-full rounded-full"
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
