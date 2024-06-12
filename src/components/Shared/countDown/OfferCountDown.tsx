"use client";
import { useEffect, useState } from "react";
import CountDown from "./CountDown";

const OfferCountDown = () => {
  const [timeInSideDhaka, setTimeInSideDhaka] = useState<null | Date>(
    new Date("6/14/2024 20:00:00")
  );
  const [timeOutSideDhaka, setTimeOutSideDhaka] = useState<null | Date>(
    new Date("6/13/2024 20:00:00")
  );

  useEffect(() => {
    setTimeInSideDhaka(new Date("6/14/2024 20:00:00"));
    setTimeOutSideDhaka(new Date("6/13/2024 20:00:00"));
  }, []);

  return (
    <section>
      <h3 className="text-2xl md:text-4xl font-bold text-center mb-5 uppercase">
        Delivery Will Be Closed In :
      </h3>
      <div className="flex flex-col md:flex-row gap-10 justify-center items-center">
        <div className="flex flex-col justify-center gap-1">
          <h5 className="text-center font-bold text-lg">Inside Dhaka</h5>
          <div>
            <CountDown expiryTimestamp={timeInSideDhaka} />
          </div>
        </div>

        <div className="flex flex-col justify-center gap-1">
          <h5 className="text-center font-bold text-lg">Outside Dhaka</h5>
          <div>
            <CountDown expiryTimestamp={timeOutSideDhaka} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default OfferCountDown;
