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
      <span className="text-center">{title}</span>
      <span className="text-center bg-brand_primary text-xl sm:text-5xl min-w-[20px] min-h-[20px] sm:min-w-[60px] sm:min-h-[60px] !rounded-md overflow-hidden">
        {time}
      </span>
    </div>
  );
};
