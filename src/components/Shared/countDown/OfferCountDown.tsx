"use client";
import { useEffect, useState } from "react";
import CountDown from "./CountDown";

const OfferCountDown = () => {
  const [timeInSideDhaka, setTimeInSideDhaka] = useState<null | Date>(
    new Date("3/27/2025 20:00:00")
  );
  useEffect(() => {
    setTimeInSideDhaka(new Date("3/27/2025 20:00:00"));
  }, []);

  return (
    <section>
      <h3 className="text-2xl md:text-4xl font-bold text-center mb-5 uppercase">
        LAST CHANCE FOR DELIVERY:
      </h3>
      <div className="flex flex-col md:flex-row gap-10 justify-center items-center">
        <div className="flex flex-col justify-center gap-1">
          <div>
            <CountDown expiryTimestamp={timeInSideDhaka} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default OfferCountDown;
