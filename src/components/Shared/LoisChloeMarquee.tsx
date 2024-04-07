import Marquee from "react-fast-marquee";

const LoisChloeMarquee = () => {
  return (
    <div className="bg-brand_primary py-3">
      <Marquee className="space-x-20">
        <div className=" flex justify-between gap-x-20">
          <div>All Orders Will be Delivered After Eid.</div>
          <div>Delivery Will Continue From the 15th of April.</div>
          <div>For Any Kind of Assistance Call +880 1840-100578</div>
        </div>
      </Marquee>
    </div>
  );
};

export default LoisChloeMarquee;
