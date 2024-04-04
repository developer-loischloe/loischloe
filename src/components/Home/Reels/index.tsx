"use client";
import { useEffect, useRef, useState } from "react";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// import required modules
import { EffectCoverflow, Navigation, Pagination } from "swiper/modules";

import VideoCard from "./VideoCard";

const constants = [
  {
    id: 1,
    link: "https://cloud.appwrite.io/v1/storage/buckets/65f44a5392dad52d3c99/files/660e8220f02e73a09e21/view?project=65ed75e73895ca457661&mode=admin",
  },
  {
    id: 2,
    link: "https://cloud.appwrite.io/v1/storage/buckets/65f44a5392dad52d3c99/files/660e82857a904d16610f/view?project=65ed75e73895ca457661&mode=admin",
  },
  {
    id: 3,
    link: "https://cloud.appwrite.io/v1/storage/buckets/65f44a5392dad52d3c99/files/660e82a6d2c4cc1199b0/view?project=65ed75e73895ca457661&mode=admin",
  },
  {
    id: 4,
    link: "https://cloud.appwrite.io/v1/storage/buckets/65f44a5392dad52d3c99/files/660e82bfc810e3a9c424/view?project=65ed75e73895ca457661&mode=admin",
  },
  {
    id: 5,
    link: "https://cloud.appwrite.io/v1/storage/buckets/65f44a5392dad52d3c99/files/660e82ecd096f2dba9c6/view?project=65ed75e73895ca457661&mode=admin",
  },
];

export default function Reels() {
  const [isVisible, setIsVisible] = useState(false);

  const reelsRef = useRef(null);

  useEffect(() => {
    if (reelsRef.current) {
      const observerFn = (entries: any, observer: any) => {
        setIsVisible(entries[0]?.isIntersecting);
      };

      let observer = new IntersectionObserver(observerFn);
      observer.observe(reelsRef.current);
    }
  }, [reelsRef]);

  return (
    <section ref={reelsRef}>
      <h5 className="text-center">Find Out</h5>
      <h4 className="heading-1 text-center">What's Trendings On Instagram</h4>
      <Swiper
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={1}
        spaceBetween={30}
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
        coverflowEffect={{
          rotate: 40,
          stretch: 0,
          depth: 50,
          modifier: 1,
          slideShadows: true,
        }}
        modules={[EffectCoverflow, Pagination, Navigation]}
        loop={true}
        navigation={true}
        pagination={{
          clickable: true,
        }}
      >
        {constants.map((reels) => (
          <SwiperSlide key={reels.id}>
            {({ isActive }) => {
              return <VideoCard item={reels} play={isVisible && isActive} />;
            }}
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
