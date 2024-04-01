"use client";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "./style.css";

// import required modules
import { Autoplay, FreeMode, Navigation } from "swiper/modules";
import Image from "next/image";
import Link from "next/link";

import review1 from "@/assets/review/review-1.png";
import review2 from "@/assets/review/review-2.png";
import review3 from "@/assets/review/review-3.png";
import review4 from "@/assets/review/review-4.png";
import review5 from "@/assets/review/review-5.png";
import review6 from "@/assets/review/review-6.png";
import review7 from "@/assets/review/review-7.png";
import review8 from "@/assets/review/review-8.png";
import review9 from "@/assets/review/review-9.png";

const feedBacks = [
  {
    id: 1,
    image: review1,
    link: "https://www.facebook.com/permalink.php?story_fbid=pfbid0BUsKBLCWUYAwYN3DZZjfRMmD9x4NE9ZRt1d6y7F1yfBuJ5mHQaEQpLLJJxDKdojSl&id=61551242663623",
  },
  {
    id: 2,
    image: review2,
    link: "https://www.facebook.com/punam.tasnim/posts/pfbid02ia31CMjDMZQkhZuPDAL1YVZJ7aGk2xaKTKXbsgdMGkCMPCESeuXp8LSmbJbdsn5wl",
  },
  {
    id: 3,
    image: review3,
    link: "https://www.facebook.com/kashfiya.koli/posts/pfbid0QQpAu3xsbBsCg9YMi2iN5oEVivwG9fPuGyQUvfmNkTRv3c9FatdFsneTkie3Q5nol",
  },
  {
    id: 4,
    image: review4,
    link: "https://www.facebook.com/TinkerBell.PixieHollow/posts/pfbid02VJkzimNjvJpix9UmX7AHF6Ha6wx4ehM5ifM7Bzqxdq5GScKC35HoFbTK5YtBtqdcl",
  },
  {
    id: 5,
    image: review5,
    link: "https://www.facebook.com/animal.lover555/posts/pfbid0pPc2v2WkNurwM4QvHheEWofQY8r5S7GRhtNrfM4q1YfX4qYAvraVQP5VA628FzHZl",
  },
  {
    id: 6,
    image: review6,
    link: "https://www.facebook.com/permalink.php?story_fbid=pfbid02VmJBJn8sgBXja5c8pNHcZWQBggPM91oNx7NDcK6zeWyACsFAZGZkeQpvqHm7zJgNl&id=100093537195061",
  },
  {
    id: 7,
    image: review7,
    link: "https://www.facebook.com/permalink.php?story_fbid=pfbid02rV9u58zeP9nDKrxx3U5kERdyn4dsXaTedV12QvBK4FbU6upH6xgyPnrWvVh7nx5Tl&id=100078751501478",
  },
  {
    id: 8,
    image: review8,
    link: "https://www.facebook.com/kamrun.nah.3/posts/pfbid0mevThYtDTYCbUu7YGYgFFt7wqhcSwqXKeZKtkRTedLxY9okYc2mw2qeYPAfCwBHZl",
  },
  {
    id: 9,
    image: review9,
    link: "https://www.facebook.com/mifta.muntaha.5/posts/pfbid02WjDHJYZUzrFf89DpFU9nFyBhT1KqqMwr6dfRGWBXSGrgkSWWDf9x8PhEPPQonKLKl",
  },
];

export default function CustomerFeedback() {
  return (
    <section>
      <h4 className="heading-1 text-center">Customer Feedback</h4>

      {/* Customer FeedBack */}
      <Swiper
        loop={true}
        spaceBetween={10}
        navigation={true}
        autoplay={{
          delay: 2500,
          pauseOnMouseEnter: true,
        }}
        modules={[FreeMode, Navigation, Autoplay]}
        className="CustomerFeedbackSwiper"
      >
        {feedBacks.map((review) => (
          <SwiperSlide
            key={review.id}
            className="flex flex-col items-center justify-center gap-5"
          >
            <Link href={review.link}>
              <Image
                src={review.image}
                alt={"Customer review"}
                className="rounded-lg"
              />
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
