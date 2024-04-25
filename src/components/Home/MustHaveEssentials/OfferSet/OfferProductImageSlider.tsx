"use client";
import Image from "next/image";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// import required modules
import { Autoplay, FreeMode, Navigation, Thumbs } from "swiper/modules";

export default function OfferProductImageSlider({
  products,
  activeProduct,
  setActiveProduct,
}: {
  products: any[];
  activeProduct: string;
  setActiveProduct: React.Dispatch<React.SetStateAction<string>>;
}) {
  return (
    <div className="flex-1 overflow-hidden">
      <div className="flex flex-col lg:flex-row-reverse gap-5">
        <div className="overflow-hidden h-full">
          <Swiper
            onSlideChange={(swipper) => {
              setActiveProduct(products[swipper.realIndex].$id);
            }}
            loop={true}
            spaceBetween={10}
            navigation={true}
            autoplay={{
              delay: 2500,
              pauseOnMouseEnter: true,
            }}
            modules={[FreeMode, Navigation, Thumbs, Autoplay]}
            className="ProductImageSliderSwiper"
          >
            {products.length &&
              products.map((product) => (
                <SwiperSlide
                  key={product.$id}
                  className="flex flex-col items-center justify-center gap-5 select-none"
                >
                  <Image
                    src={product?.images[0].image_url}
                    alt={product?.images[0].alt}
                    width={500}
                    height={500}
                    className="w-full h-full max-h-[450px] md:max-h-[550px]"
                    priority
                  />
                </SwiperSlide>
              ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
}
