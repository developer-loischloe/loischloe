"use client";
import React, { useState } from "react";
import Image from "next/image";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperRef } from "swiper";

// import required modules
import { Autoplay, FreeMode, Navigation, Thumbs } from "swiper/modules";

import "./styles.css";

interface Image {
  image_id: string;
  image_url: string;
  alt: string;
}

export default function TestSlider({ images }: { images: Image[] }) {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperRef | null>(null);

  return (
    <div>
      <Swiper
        loop={true}
        spaceBetween={10}
        navigation={true}
        autoplay={{
          delay: 2500,
          pauseOnMouseEnter: true,
        }}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Navigation, Thumbs, Autoplay]}
        className="productSlider"
      >
        {images &&
          images.map((image) => (
            <SwiperSlide
              key={image.image_id}
              className="flex flex-col items-center justify-center gap-5 select-none"
            >
              <Image
                src={image.image_url}
                alt={image.alt}
                width={500}
                height={500}
                priority
                className=" max-h-[500px]"
              />
            </SwiperSlide>
          ))}
      </Swiper>
      <Swiper
        onSwiper={setThumbsSwiper}
        loop={true}
        spaceBetween={10}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="productSliderThumb"
      >
        {images &&
          images.map((image) => (
            <SwiperSlide key={image.image_id}>
              <Image
                src={image.image_url}
                alt={image.alt}
                width={150}
                height={150}
              />
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
}
