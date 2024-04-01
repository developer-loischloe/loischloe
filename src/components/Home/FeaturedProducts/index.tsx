"use client";

import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

// import required modules
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import CategoriesList from "@/components/categories/CategoriesList";
import ProductCard from "@/components/Products/ProductCard";

const categoriesConstant = [
  {
    id: 1,
    name: "Lipstick",
  },
  {
    id: 2,
    name: "Powder",
  },
  {
    id: 3,
    name: "Mascara",
  },
  {
    id: 4,
    name: "Eyeliner",
  },
  {
    id: 5,
    name: "Brush",
  },
  {
    id: 6,
    name: "Concealer",
  },
];

const FeaturedProducts = () => {
  const [currentCategory, setCurrentCategory] = useState("");

  return (
    <section>
      <h4 className="heading-1">Featured Products</h4>

      <div className="flex flex-col md:flex-row gap-10">
        {/* categories */}
        <CategoriesList
          categories={categoriesConstant}
          currentCategory={currentCategory}
          setCurrentCategory={setCurrentCategory}
        />

        {/* products */}
        {/* <Swiper
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
      </div>
    </section>
  );
};

export default FeaturedProducts;
