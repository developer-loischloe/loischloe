import Link from "next/link";
import Marquee from "react-fast-marquee";

const LoisChloeMarquee = () => {
  return (
    <Link href={"/offer"}>
      <div className="bg-[#FA9E00] hover:bg-black hover:text-white transition-all duration-300 p-2">
        <Marquee className="space-x-20">
          <div className="flex justify-between gap-x-40">
            <div>
              🎉 Hurry Up! Celebrate 2nd Independence Day with 28% Off on All
              Products! Limited Time Only! 🎉
            </div>
            <div>
              🎉 Hurry Up! Celebrate 2nd Independence Day with 28% Off on All
              Products! Limited Time Only! 🎉
            </div>
            <div>
              🎉 Hurry Up! Celebrate 2nd Independence Day with 28% Off on All
              Products! Limited Time Only! 🎉
            </div>
          </div>
        </Marquee>
      </div>
    </Link>
  );
};

export default LoisChloeMarquee;
