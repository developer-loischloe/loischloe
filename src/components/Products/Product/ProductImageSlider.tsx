"use client";
import React, { useState } from "react";
import Image from "next/image";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { type Swiper as SwiperRef } from "swiper";

// Import Swiper styles
import "./style.css";

// import required modules
import { Autoplay, FreeMode, Navigation, Thumbs } from "swiper/modules";

const feedBacks = [
  {
    id: 1,
    author: "John Doe",
    avatar: "/review/review.jpg",
    rating: 4,
    review:
      "“OHSOGO is my go-to for exclusive brands and 100% original products that never disappoint”",
  },
  {
    id: 2,
    author: "John Doe",
    avatar: "/review/review.jpg",
    rating: 4,
    review:
      "“OHSOGO is my go-to for exclusive brands and 100% original products that never disappoint”",
  },
  {
    id: 3,
    author: "John Doe",
    avatar: "/review/review.jpg",
    rating: 4,
    review:
      "“OHSOGO is my go-to for exclusive brands and 100% original products that never disappoint”",
  },
  {
    id: 4,
    author: "John Doe",
    avatar: "/review/review.jpg",
    rating: 4,
    review:
      "“OHSOGO is my go-to for exclusive brands and 100% original products that never disappoint”",
  },
  {
    id: 5,
    author: "John Doe",
    avatar: "/review/review.jpg",
    rating: 4,
    review:
      "“OHSOGO is my go-to for exclusive brands and 100% original products that never disappoint”",
  },
  {
    id: 6,
    author: "John Doe",
    avatar: "/review/review.jpg",
    rating: 4,
    review:
      "“OHSOGO is my go-to for exclusive brands and 100% original products that never disappoint”",
  },
  {
    id: 7,
    author: "John Doe",
    avatar: "/review/review.jpg",
    rating: 4,
    review:
      "“OHSOGO is my go-to for exclusive brands and 100% original products that never disappoint”",
  },
  {
    id: 8,
    author: "John Doe",
    avatar: "/review/review.jpg",
    rating: 4,
    review:
      "“OHSOGO is my go-to for exclusive brands and 100% original products that never disappoint”",
  },
  {
    id: 9,
    author: "John Doe",
    avatar: "/review/review.jpg",
    rating: 4,
    review:
      "“OHSOGO is my go-to for exclusive brands and 100% original products that never disappoint”",
  },
];

interface Image {
  image_id: string;
  image_url: string;
  alt: string;
}
export default function ProductImageSlider({ images }: { images: Image[] }) {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperRef | null>(null);

  return (
    <div className="flex-1 overflow-hidden">
      <div className="flex flex-col lg:flex-row-reverse gap-5">
        <div className="overflow-hidden h-full">
          <Swiper
            loop={true}
            spaceBetween={10}
            navigation={true}
            autoplay={{
              delay: 2500,
              disableOnInteraction: true,
              pauseOnMouseEnter: true,
            }}
            thumbs={{ swiper: thumbsSwiper }}
            modules={[FreeMode, Navigation, Thumbs, Autoplay]}
            className="ProductImageSliderSwiper"
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
                  />
                </SwiperSlide>
              ))}
          </Swiper>
        </div>

        {/* Thumbs */}
        <div className="overflow-hidden min-w-min h-full">
          <Swiper
            onSwiper={setThumbsSwiper}
            loop={true}
            spaceBetween={10}
            slidesPerView={4}
            freeMode={true}
            watchSlidesProgress={true}
            modules={[FreeMode, Navigation]}
            breakpoints={{
              1024: {
                direction: "vertical",
              },
            }}
            className="ProductImageSliderSwiperThumb"
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
      </div>
    </div>
  );
}
