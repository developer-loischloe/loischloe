"use client";

import { useState } from "react";
import Image from "next/image";
import type { InstagramPost } from "./fetchInstagramPosts";

const HeartIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
);

const CommentIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </svg>
);

const PlayIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
    <polygon points="5 3 19 12 5 21 5 3" />
  </svg>
);

export default function InstagramCard({ post }: { post: InstagramPost }) {
  const [isHovered, setIsHovered] = useState(false);
  const imageUrl = post.media_type === "VIDEO" ? (post.thumbnail_url || post.media_url) : post.media_url;

  return (
    <a
      href={post.permalink}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative block aspect-square overflow-hidden rounded-lg bg-gray-100"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Image
        src={imageUrl}
        alt={post.caption?.slice(0, 100) || "LOIS CHLOE Instagram post"}
        fill
        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
        className="object-cover transition-transform duration-500 group-hover:scale-110"
        unoptimized
      />

      {/* Video indicator */}
      {post.media_type === "VIDEO" && !isHovered && (
        <div className="absolute top-3 right-3 z-10">
          <PlayIcon />
        </div>
      )}

      {/* Carousel indicator */}
      {post.media_type === "CAROUSEL_ALBUM" && !isHovered && (
        <div className="absolute top-3 right-3 z-10">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
            <rect x="2" y="6" width="14" height="14" rx="2" stroke="white" strokeWidth="2" fill="none" />
            <rect x="8" y="2" width="14" height="14" rx="2" stroke="white" strokeWidth="2" fill="none" />
          </svg>
        </div>
      )}

      {/* Hover overlay */}
      <div
        className={`absolute inset-0 bg-black/40 flex flex-col items-center justify-center gap-3 transition-opacity duration-300 ${
          isHovered ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5 text-white font-semibold text-sm">
            <HeartIcon />
          </span>
          <span className="flex items-center gap-1.5 text-white font-semibold text-sm">
            <CommentIcon />
          </span>
        </div>
        {post.caption && (
          <p className="text-white/90 text-xs text-center px-3 line-clamp-2 max-w-[90%]">
            {post.caption.slice(0, 80)}
          </p>
        )}
      </div>
    </a>
  );
}
