"use client";
import React from "react";
import ProductCard from "@/components/Products/ProductCard";

import { Autoplay, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const BestSellingSlider = ({ products }: { products: any[] }) => {
  return (
    <Swiper
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
        1024: {
          slidesPerView: 4,
          spaceBetween: 30,
        },
      }}
      spaceBetween={30}
      navigation={true}
      pagination={{
        clickable: true,
      }}
      autoplay={{
        delay: 2500,
        pauseOnMouseEnter: true,
      }}
      modules={[Navigation, Autoplay]}
      className="FeaturedProductSwiper"
    >
      {products?.map((product: any, index: number) => (
        <SwiperSlide key={product.$id}>
          <ProductCard product={product} index={index} key={product?.$id} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default BestSellingSlider;
