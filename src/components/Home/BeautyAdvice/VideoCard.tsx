"use client";

import { cn } from "@/lib/utils";
import React from "react";
import ReactPlayerYoutube from "react-player/youtube";

interface ItemProps {
  id: number;
  link: string;
  link2?: string;
}
const VideoCard = ({ item }: { item: ItemProps }) => {
  return (
    <div
      className={cn(
        "aspect-w-16 aspect-h-9 rounded-md overflow-hidden col-span-1",
        item.id <= 2 && "md:col-span-2"
      )}
    >
      <ReactPlayerYoutube
        url={item.link}
        controls={true}
        width="100%"
        height="100%"
      />
    </div>
  );
};

export default VideoCard;
