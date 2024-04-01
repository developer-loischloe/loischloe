import ReactPlayer from "react-player/lazy";
import { useSwiper } from "swiper/react";

interface ItemProps {
  id: number;
  link: string;
}
const VideoCard = ({ item, play }: { item: ItemProps; play: boolean }) => {
  const swiper = useSwiper();

  return (
    <div>
      <ReactPlayer
        className="overflow-hidden"
        url={item.link}
        width="100%"
        height="100%"
        controls={true}
        playing={play}
        onEnded={() => {
          swiper.slideNext();
        }}
      />
    </div>
  );
};

export default VideoCard;
