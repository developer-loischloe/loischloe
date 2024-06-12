"use client";
import React, { Dispatch, SetStateAction } from "react";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// import required modules
import { Autoplay, FreeMode, Navigation } from "swiper/modules";

import GiftProductCard from "./GiftProductCard";

export default function GiftSlider({
  products,
  setOpen,
}: {
  products: any[];
  setOpen: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <div className="w-full max-w-[280px] mx-auto">
      <Swiper
        spaceBetween={10}
        navigation={true}
        slidesPerView={1}
        autoplay={{
          delay: 2500,
          pauseOnMouseEnter: true,
        }}
        modules={[FreeMode, Navigation, Autoplay]}
        className="w-full"
      >
        {products &&
          products.map((product) => (
            <SwiperSlide
              key={product.$id}
              className="flex flex-col items-center justify-center gap-5 select-none"
            >
              <GiftProductCard
                key={product?.$id}
                product={product}
                setOpen={setOpen}
              />
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
}
