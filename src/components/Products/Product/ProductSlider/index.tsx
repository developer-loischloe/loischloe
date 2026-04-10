"use client";
import React, { useState } from "react";
import Image from "next/image";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperRef } from "swiper";

// import required modules
import { Autoplay, FreeMode, Navigation, Thumbs } from "swiper/modules";

import "./styles.css";
import { cn } from "@/lib/utils";
import Fancybox from "@/components/Shared/FancyBox";

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
        // slidesPerView={1}
        autoplay={{
          delay: 2500,
          pauseOnMouseEnter: true,
        }}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Navigation, Thumbs, Autoplay]}
        className="productSlider"
      >
        {images &&
          images.map((_, p_index) => (
            <SwiperSlide
              key={_.image_id}
              className="flex flex-col items-center justify-center gap-5 select-none"
            >
              <Fancybox
                options={{
                  Carousel: {
                    infinite: false,
                  },
                }}
              >
                {images &&
                  images.map((c_image, c_index) => (
                    <a
                      key={c_image.image_url}
                      data-fancybox={`product-images-${p_index}`}
                      href={c_image.image_url}
                      className={cn(p_index === c_index ? "block" : "hidden")}
                    >
                      <Image
                        src={c_image.image_url}
                        alt={c_image.alt}
                        width={500}
                        height={500}
                        priority={p_index === 0}
                        loading={p_index === 0 ? "eager" : "lazy"}
                        sizes="(max-width: 768px) 100vw, 500px"
                        className="mx-auto max-h-[500px]"
                      />
                    </a>
                  ))}
              </Fancybox>
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
                loading="lazy"
                sizes="150px"
              />
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
}
