"use client";
import React, { Dispatch, SetStateAction, useState } from "react";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperRef } from "swiper";

// import required modules
import { Autoplay, FreeMode, Navigation, Thumbs } from "swiper/modules";

import GiftProductCard from "./GiftProductCard";

export default function GiftSlider({
  products,
  setOpen,
}: {
  products: any[];
  setOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperRef | null>(null);

  return (
    <div>
      <Swiper
        spaceBetween={10}
        navigation={true}
        // slidesPerView={1}
        autoplay={{
          delay: 2500,
          pauseOnMouseEnter: true,
        }}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Navigation, Thumbs, Autoplay]}
        className="productSlider"
      >
        {products &&
          products.map((product, p_index) => (
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
