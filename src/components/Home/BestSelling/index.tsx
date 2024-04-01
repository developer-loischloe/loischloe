"use client";

import { Swiper, SwiperSlide } from "swiper/react";

// import required modules
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import ProductCard from "@/components/Products/ProductCard";

const BestSelling = () => {
  return (
    <section>
      <h4 className="heading-1">Best Selling</h4>

      {/* products */}
      {/* 
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
      >
        <SwiperSlide>
          <ProductCard />
        </SwiperSlide>
        <SwiperSlide>
          <ProductCard />
        </SwiperSlide>
        <SwiperSlide>
          <ProductCard />
        </SwiperSlide>
        <SwiperSlide>
          <ProductCard />
        </SwiperSlide>
        <SwiperSlide>
          <ProductCard />
        </SwiperSlide>
        <SwiperSlide>
          <ProductCard />
        </SwiperSlide>
      </Swiper> */}
    </section>
  );
};

export default BestSelling;
