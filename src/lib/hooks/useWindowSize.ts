"use client";
import React, { useEffect, useState } from "react";

const useWindowSize = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);

  useEffect(() => {
    function handleResize() {
      setWindowWidth(window.innerWidth);
      setWindowHeight(window.innerHeight);
    }

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return { windowWidth, windowHeight };
};

export default useWindowSize;
