import CountDown from "./CountDown";

const OfferCountDown = () => {
  const timeInSideDhaka = new Date("4/7/2024 16:00:00");
  const timeOutSideDhaka = new Date("4/6/2024 16:00:00");

  timeInSideDhaka.setSeconds(timeInSideDhaka.getSeconds());
  timeOutSideDhaka.setSeconds(timeOutSideDhaka.getSeconds());

  return (
    <section>
      <h3 className="text-2xl md:text-4xl font-bold text-center mb-2 uppercase">
        Last minute delivery before Eid!
      </h3>
      <div className="flex flex-row justify-between items-center gap-1">
        <div>
          <h4 className="text-md md:text-2xl font-bold text-center">
            Inside Dhaka
          </h4>
          <CountDown expiryTimestamp={timeInSideDhaka} />
        </div>

        <div>
          <h4 className="text-md md:text-2xl  font-bold text-center">
            OutSide Dhaka
          </h4>
          <CountDown expiryTimestamp={timeOutSideDhaka} />
        </div>
      </div>
    </section>
  );
};

export default OfferCountDown;
