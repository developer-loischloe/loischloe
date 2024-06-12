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
    <div className="w-full max-w-[300px] sm:max-w-[450px] md:max-w-[650px] mx-auto">
      <Swiper
        spaceBetween={10}
        navigation={true}
        slidesPerView={1}
        breakpoints={{
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 30,
          },
        }}
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
