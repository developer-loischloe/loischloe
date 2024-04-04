import React from "react";
import VideoCard from "./VideoCard";

const constant = [
  {
    id: 1,
    link: "https://www.youtube.com/embed/2XVsYWTFiCk",
  },
  {
    id: 2,
    link: "https://www.youtube.com/embed/137yHFl5HeI",
  },
  {
    id: 3,
    link: "https://www.youtube.com/embed/pKVahbOlzN0",
  },
  {
    id: 4,
    link: "https://www.youtube.com/embed/RtQWM_Gm7fw",
  },
  {
    id: 5,
    link: "https://www.youtube.com/embed/RiGCDnAOVQk",
  },
  {
    id: 6,
    link: "https://www.youtube.com/embed/_H_pMyWwUxY",
  },
];

const BeautyAdvice = () => {
  return (
    <section>
      <div className="">
        <h5 className="text-center">Explore</h5>
        <h4 className="heading-1 text-center">The Power Of Green Cosmetics</h4>

        <div className="grid grid-cols-1 gap-y-10 md:grid-cols-4 md:gap-5">
          {constant.map((item) => (
            <VideoCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default BeautyAdvice;
