import React from "react";
import Loader from "./Loader";

const LoadingSpiner = () => {
  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 bg-black/0 flex justify-center items-center w-full space-y-10 z-[20]">
      <Loader />
    </div>
  );
};

export default LoadingSpiner;
