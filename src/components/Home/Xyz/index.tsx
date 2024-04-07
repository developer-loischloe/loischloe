import Image from "next/image";
import React from "react";

import XyzLeftImg from "@/assets/xyz/Xyz.png";

const Xyz = () => {
  return (
    <section className="flex gap-10">
      <h1>Absolute Must-Have Essentials</h1>
      <div className="flex-1">
        <Image src={XyzLeftImg} alt="Xyz" className="rounded-2xl" />
      </div>
      <div className="flex-1">
        <div>
          <Image src={XyzLeftImg} alt="Xyz" className="rounded-2xl" />
        </div>
      </div>
    </section>
  );
};

export default Xyz;
