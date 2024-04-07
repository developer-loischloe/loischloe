"use client";
import { useEffect, useState } from "react";
import CountDown from "./CountDown";

const OfferCountDown = () => {
  const [timeInSideDhaka, setTimeInSideDhaka] = useState<null | Date>(
    new Date("4/15/2024 8:00:00")
  );

  useEffect(() => {
    setTimeInSideDhaka(new Date("4/15/2024 8:00:00"));
  }, []);

  return (
    <section>
      <h3 className="text-2xl md:text-4xl font-bold text-center mb-2 uppercase">
        Delivery Will Start From:
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
