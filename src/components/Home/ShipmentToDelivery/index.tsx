"use client";
import { BadgeCheck, CornerDownLeft, Headset, Truck } from "lucide-react";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// import required modules
import { Autoplay, Scrollbar } from "swiper/modules";

const constant = [
  {
    id: 1,
    icon: <BadgeCheck size={25} color="#002d34" />,
    title: "100% Authentic",
    subTitle: "All Products Sourced Directly",
  },
  {
    id: 2,
    icon: <Headset size={25} color="#002d34" />,
    title: "Free Support",
    subTitle: "+880 99999999",
  },
  {
    id: 3,
    icon: <Truck size={25} color="#002d34" />,
    title: "Fast Shipping",
    subTitle: "2 Days Delivery",
  },
  {
    id: 4,
    icon: <CornerDownLeft size={25} color="#002d34" />,
    title: "Easy Returns",
    subTitle: "Hassle-Free Pick-ups & Returns",
  },
];

const ShipmentToDelivery = () => {
  return (
    <section>
      <Swiper
        slidesPerView={2}
        breakpoints={{
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
        autoplay={{
          delay: 2500,
          pauseOnMouseEnter: true,
        }}
        scrollbar={{
          hide: true,
        }}
        modules={[Scrollbar, Autoplay]}
        className="mySwiper"
      >
        {constant.map((item) => (
          <SwiperSlide key={item.subTitle}>
            <div className="flex items-center gap-5">
              <div>{item.icon}</div>
              <div className="flex flex-col space-y-2 ">
                <span className="text-xl md:text-2xl text-brand_secondary">
                  {item.title}
                </span>
                <span className="text-brand_gray text-xs md:text-sm">
                  {item.subTitle}
                </span>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default ShipmentToDelivery;
