"use client";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// import required modules
import { EffectCoverflow, Navigation, Pagination } from "swiper/modules";

import VideoCard from "./VideoCard";

const constants = [
  {
    id: 1,
    link: "https://cloud.appwrite.io/v1/storage/buckets/65f44a5392dad52d3c99/files/65f4761a2a5e6de82556/view?project=65ed75e73895ca457661",
  },
  {
    id: 2,
    link: "https://cloud.appwrite.io/v1/storage/buckets/65f44a5392dad52d3c99/files/65f4761a2a5e6de82556/view?project=65ed75e73895ca457661",
  },
  {
    id: 3,
    link: "https://cloud.appwrite.io/v1/storage/buckets/65f44a5392dad52d3c99/files/65f4761a2a5e6de82556/view?project=65ed75e73895ca457661",
  },
  {
    id: 4,
    link: "https://cloud.appwrite.io/v1/storage/buckets/65f44a5392dad52d3c99/files/65f4761a2a5e6de82556/view?project=65ed75e73895ca457661",
  },
  {
    id: 5,
    link: "https://cloud.appwrite.io/v1/storage/buckets/65f44a5392dad52d3c99/files/65f4761a2a5e6de82556/view?project=65ed75e73895ca457661",
  },
  {
    id: 6,
    link: "https://cloud.appwrite.io/v1/storage/buckets/65f44a5392dad52d3c99/files/65f4761a2a5e6de82556/view?project=65ed75e73895ca457661",
  },
  {
    id: 7,
    link: "https://cloud.appwrite.io/v1/storage/buckets/65f44a5392dad52d3c99/files/65f4761a2a5e6de82556/view?project=65ed75e73895ca457661",
  },
  {
    id: 8,
    link: "https://cloud.appwrite.io/v1/storage/buckets/65f44a5392dad52d3c99/files/65f4761a2a5e6de82556/view?project=65ed75e73895ca457661",
  },
];

export default function Reels() {
  return (
    <section>
      <h4 className="heading-1">Beauty Reels</h4>
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
              return <VideoCard item={reels} isActive={isActive} />;
            }}
          </SwiperSlide>
        ))}
      </Swiper>

      {/* <blockquote
        className="tiktok-embed"
        cite="https://www.tiktok.com/@loischloe.bangladesh/video/7330688921493343490"
        data-video-id="7330688921493343490"
        // style="max-width: 605px;min-width: 325px;"
      >
        {" "}
        <section>
          {" "}
          <a
            target="_blank"
            title="@loischloe.bangladesh"
            href="https://www.tiktok.com/@loischloe.bangladesh?refer=embed"
          >
            @loischloe.bangladesh
          </a>{" "}
          <p>
            📣📣BACK IN STOCK📣📣 ALL IN ONE CUSHION FOUNDATION WITH SPF50++
            (with refill unit) Designed for hydration and buildable coverage,
            this lightweight portable foundation ensures a luminous complexion
            that stays fresh &#38; radiant from morning to night✨🥂 It
            nourishes, perfects, and gives your skin a natural, dewy glow🥰❤️
            Purchase now:
            https:&#47;&#47;loischloe.com.bd&#47;product&#47;uv-waterful-cushion-foundation-spf50-pa&#47;
            Made in Australia 🇦🇺 | 100% vegan | Chemical free
          </p>{" "}
          <a
            target="_blank"
            title="♬ original sound - Lois Chloe Bangladesh"
            href="https://www.tiktok.com/music/original-sound-7330689016557964034?refer=embed"
          >
            ♬ original sound - Lois Chloe Bangladesh
          </a>{" "}
        </section>{" "}
      </blockquote>{" "}
      <script async src="https://www.tiktok.com/embed.js"></script> */}
    </section>
  );
}
