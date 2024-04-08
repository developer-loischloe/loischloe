import React from "react";

const GrowUpDown = () => {
  return (
    <div className="relative w-11 h-11 group cursor-pointer rounded-full">
      <span className="w-full h-full absolute  top-0 left-0 right-0 bottom-0 rounded-full  bg-black/60  flex justify-center items-center animate-scale_up_down" />
      <span className="w-4 h-4 bg-black absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] origin-center rounded-full group-hover:scale-[2] transition-all" />
    </div>
  );
};

export default GrowUpDown;
