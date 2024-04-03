"use client";
import { useEffect, useState } from "react";

const useScrollHandler = () => {
  const [scrolling, setScrolling] = useState("");
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    function handleScroll() {
      if (lastScrollY < window.scrollY) {
        setScrolling("down");
      } else {
        setScrolling("top");
      }

      setLastScrollY(window.scrollY);
    }

    // add event when scrool down or top
    window.addEventListener("scroll", handleScroll);

    // destroy event when component unmount or re-render
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return { scrolling, lastScrollY };
};

export default useScrollHandler;
