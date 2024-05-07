import React from "react";
import "./loading.css";

const Loader = () => {
  return (
    <div className="py-20 flex justify-center items-center">
      <div className="lds-ellipsis">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default Loader;
