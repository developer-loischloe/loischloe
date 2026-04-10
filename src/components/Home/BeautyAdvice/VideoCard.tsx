"use client";

import { cn } from "@/lib/utils";
import React, { useRef, useState, useEffect } from "react";
import ReactPlayerYoutube from "react-player/youtube";

interface ItemProps {
  id: number;
  link: string;
  link2?: string;
}
const VideoCard = ({ item }: { item: ItemProps }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "100px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={cn(
        "aspect-video rounded-md overflow-hidden col-span-1",
        item.id <= 2 && "md:col-span-2"
      )}
    >
      {isVisible ? (
        <ReactPlayerYoutube
          url={item.link}
          controls={true}
          width="100%"
          height="100%"
          light={true}
        />
      ) : (
        <div className="w-full h-full bg-gray-100 animate-pulse" />
      )}
    </div>
  );
};

export default VideoCard;
