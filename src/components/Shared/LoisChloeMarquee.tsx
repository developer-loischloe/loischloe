import Link from "next/link";
import Marquee from "react-fast-marquee";

const LoisChloeMarquee = () => {
  return (
    <Link href={"/offer"}>
      <div className="bg-[#FA9E00] hover:bg-black hover:text-white transition-all duration-300 p-2">
        <Marquee className="space-x-20">
          <div className="flex justify-between gap-x-20">
            <div>Delivery Will Be Closed In 13'th of June.</div>
            <div>All Offers Are Valid Till 13'th of June.</div>
            <div>For Any Kind of Assistance Call +880 1840-100578</div>
          </div>
        </Marquee>
      </div>
    </Link>
  );
};

export default LoisChloeMarquee;
