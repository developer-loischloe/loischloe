"use client";
import ProductCard from "@/components/Products/ProductCard";
import React from "react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const FeaturedProductsSlider = ({ products }: { products: any[] }) => {
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
        disableOnInteraction: true,
        pauseOnMouseEnter: true,
      }}
      modules={[Pagination, Navigation, Autoplay]}
      className="FeaturedProductSwiper"
    >
      {products?.map((product: any) => (
        <SwiperSlide key={product.$id}>
          <ProductCard product={product} key={product?.$id} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default FeaturedProductsSlider;
