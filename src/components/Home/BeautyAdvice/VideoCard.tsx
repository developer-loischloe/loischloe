"use client";

import { cn } from "@/lib/utils";
import React, { useRef, useState, useEffect, useCallback } from "react";

interface ItemProps {
  id: number;
  link: string;
  link2?: string;
}

// Extract YouTube video ID from embed or watch URLs
function getYouTubeId(url: string): string | null {
  const match = url.match(
    /(?:youtube\.com\/(?:embed\/|watch\?v=)|youtu\.be\/)([\w-]+)/
  );
  return match ? match[1] : null;
}

const VideoCard = ({ item }: { item: ItemProps }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const videoId = getYouTubeId(item.link);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Use requestAnimationFrame to ensure layout is stable before observing
    const rafId = requestAnimationFrame(() => {
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

      // Store observer for cleanup
      (el as any).__observer = observer;
    });

    return () => {
      cancelAnimationFrame(rafId);
      const observer = (el as any).__observer;
      if (observer) observer.disconnect();
    };
  }, []);

  const handlePlay = useCallback(() => {
    setIsPlaying(true);
  }, []);

  return (
    <div
      ref={ref}
      className={cn(
        "aspect-video rounded-md overflow-hidden col-span-1",
        item.id <= 2 && "md:col-span-2"
      )}
    >
      {!isVisible ? (
        <div className="w-full h-full bg-gray-100 animate-pulse" />
      ) : isPlaying ? (
        <iframe
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
          title="YouTube video"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="w-full h-full border-0"
          loading="lazy"
        />
      ) : (
        <button
          type="button"
          onClick={handlePlay}
          className="relative w-full h-full cursor-pointer group bg-black"
          aria-label="Play video"
        >
          {/* YouTube thumbnail */}
          <img
            src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`}
            alt="Video thumbnail"
            className="w-full h-full object-cover"
            loading="lazy"
          />
          {/* Play button overlay */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-11 bg-[#212121]/80 group-hover:bg-[#ff0000] rounded-xl flex items-center justify-center transition-colors">
              <svg viewBox="0 0 68 48" width="100%" height="100%">
                <path
                  d="M66.52 7.74c-.78-2.93-2.49-5.41-5.42-6.19C55.79.13 34 0 34 0S12.21.13 6.9 1.55c-2.93.78-4.63 3.26-5.42 6.19C.06 13.05 0 24 0 24s.06 10.95 1.48 16.26c.78 2.93 2.49 5.41 5.42 6.19C12.21 47.87 34 48 34 48s21.79-.13 27.1-1.55c2.93-.78 4.64-3.26 5.42-6.19C67.94 34.95 68 24 68 24s-.06-10.95-1.48-16.26z"
                  fill="currentColor"
                />
                <path d="M45 24 27 14v20" fill="white" />
              </svg>
            </div>
          </div>
        </button>
      )}
    </div>
  );
};

export default VideoCard;
