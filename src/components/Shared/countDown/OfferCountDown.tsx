"use client";
import { useEffect, useState } from "react";
import CountDown from "./CountDown";

const OfferCountDown = () => {
  const [timeInSideDhaka, setTimeInSideDhaka] = useState<null | Date>(
    new Date("6/13/2024 20:00:00")
  );

  useEffect(() => {
    setTimeInSideDhaka(new Date("6/13/2024 20:00:00"));
  }, []);

  return (
    <section>
      <h3 className="text-2xl md:text-4xl font-bold text-center mb-2 uppercase">
        Delivery Will Be Closed In :
      </h3>
      <div className="flex justify-center gap-1">
        <div>
          <CountDown expiryTimestamp={timeInSideDhaka} />
        </div>
      </div>
    </section>
  );
};

export default OfferCountDown;
