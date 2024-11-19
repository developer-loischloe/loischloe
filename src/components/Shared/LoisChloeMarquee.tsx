import Link from "next/link";
import Marquee from "react-fast-marquee";

const LoisChloeMarquee = () => {
  return (
    <Link href={"/combo-deals"}>
      <div className="bg-[#FA9E00] hover:bg-black hover:text-white transition-all duration-300 p-2">
        <Marquee className="space-x-20">
          <div className="flex justify-between gap-x-40">
            <div>
              🔥❄️ Pre-Winter Deals Are Running! ❄️🔥 Warm Up Your Winter with
              Our Pre-Winter Offers – 🛍️ Shop Now & Save Big! 💸
            </div>
            <div>
              🔥❄️ Pre-Winter Deals Are Running! ❄️🔥 Warm Up Your Winter with
              Our Pre-Winter Offers – 🛍️ Shop Now & Save Big! 💸
            </div>
            <div>
              🔥❄️ Pre-Winter Deals Are Running! ❄️🔥 Warm Up Your Winter with
              Our Pre-Winter Offers – 🛍️ Shop Now & Save Big! 💸
            </div>
          </div>
        </Marquee>
      </div>
    </Link>
  );
};

export default LoisChloeMarquee;
