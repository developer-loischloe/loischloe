"use client";
import { Vegan, Check, PackageSearch, Rabbit, MilkOff } from "lucide-react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// import required modules
import { Autoplay, Scrollbar } from "swiper/modules";

const constant = [
  {
    id: 1,
    icon: <Vegan size={20} color="#002d34" />,
    title: "100% Vegan",
  },
  {
    id: 2,
    icon: <Check size={20} color="#002d34" />,
    title: "BSTI approved",
  },
  {
    id: 3,
    icon: <PackageSearch size={20} color="#002d34" />,
    title: "Australian made",
  },
  {
    id: 4,
    icon: <Rabbit size={20} color="#002d34" />,
    title: "Cruelty free",
  },
  {
    id: 5,
    icon: <MilkOff size={20} color="#002d34" />,
    title: "Chemical free",
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
        spaceBetween={10}
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
          <SwiperSlide key={item.title}>
            <div className="flex items-center gap-5">
              <div>{item.icon}</div>
              <div className="">
                <span className=" md:text-2xl text-brand_secondary">
                  {item.title}
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
