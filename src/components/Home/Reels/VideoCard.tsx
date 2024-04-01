import { useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player/lazy";
import { useSwiper } from "swiper/react";

interface ItemProps {
  id: number;
  link: string;
}
const VideoCard = ({
  item,
  isActive,
}: {
  item: ItemProps;
  isActive: boolean;
}) => {
  const swiper = useSwiper();
  const videoCardRef = useRef(null);

  const [play, setPlay] = useState(false);

  // useEffect(() => {
  //   let options = {
  //     root: videoCardRef.current,
  //     rootMargin: "0px",
  //     threshold: 1.0,
  //   };

  //   const observerFn = () => {};

  //   let observer = new IntersectionObserver(observerFn, options);

  //   videoCardRef.current && observer.observe(videoCardRef.current);
  // }, [videoCardRef]);

  return (
    <ReactPlayer
      ref={videoCardRef}
      className="overflow-hidden"
      url={item.link}
      width="100%"
      height="100%"
      controls={true}
      playing={isActive}
      onEnded={() => {
        swiper.slideNext();
      }}
    />
  );
};

export default VideoCard;
