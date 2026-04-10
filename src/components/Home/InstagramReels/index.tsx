"use client";

import { useEffect, useRef, useState } from "react";
import "./style.css";

const InstagramReels = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" } // Start loading 200px before visible
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    // Dynamically inject the sociablekit script only when visible
    const script = document.createElement("script");
    script.src = "https://widgets.sociablekit.com/instagram-reels/widget.js";
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);

    return () => {
      // Cleanup on unmount
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, [isVisible]);

  return (
    <section className="pb-0" ref={containerRef}>
      <div>
        <h5 className="text-center subHeading">Find Out</h5>
        <h4 className="heading-1 text-center">What&apos;s Trendings On Instagram</h4>
      </div>
      <div className="instagram_reels">
        {isVisible ? (
          <div className="sk-ww-instagram-reels" data-embed-id="25399682"></div>
        ) : (
          <div className="min-h-[400px] flex items-center justify-center text-brand_gray">
            Loading Instagram Reels...
          </div>
        )}
      </div>
    </section>
  );
};

export default InstagramReels;
