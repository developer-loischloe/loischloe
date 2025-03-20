"use client";
import React from "react";
import { useTimer } from "react-timer-hook";

const CountDown = ({ expiryTimestamp }: { expiryTimestamp: any }) => {
  const { seconds, minutes, hours, days } = useTimer({
    expiryTimestamp,
    onExpire: () => console.warn("onExpire called"),
  });

  return (
    <div className="flex items-center gap-3">
      <CounterComponent title="Days" time={days} />
      <CounterComponent title="Hours" time={hours} />
      <CounterComponent title="Min" time={minutes} />
      <CounterComponent title="Sec" time={seconds} />
    </div>
  );
};

export default CountDown;

const CounterComponent = ({ title, time }: { title: string; time: number }) => {
  return (
    <div className="flex flex-col">
      <span className="text-center mb-1">{title}</span>
      <span className="bg-brand_primary text-xl sm:text-5xl min-w-[45px] min-h-[30px] sm:min-w-[80px] sm:min-h-[65px] !rounded-md overflow-hidden flex items-center justify-center">
        {time}
      </span>
    </div>
  );
};
