import Link from "next/link";
import Marquee from "react-fast-marquee";

const LoisChloeMarquee = () => {
  return (
    <Link href={"/combo-deals"}>
      <div className="bg-[#FA9E00] hover:bg-black hover:text-white transition-all duration-300 p-2">
        <Marquee className="space-x-20">
          <div className="flex justify-between gap-x-40">
            <div>
              🌙✨ Eid Offer is Here! ✨🌙 Celebrate with Style & Savings!
            </div>
            <div>🎁 Enjoy 5% OFF on All Single Products </div>
            <div>
              🎉 Get Up to 43% OFF on Bundles – More You Buy, More You Save!
            </div>
            <div>🛍️ Shop Now & Make This Eid Extra Special! 💖</div>
          </div>
        </Marquee>
      </div>
    </Link>
  );
};

export default LoisChloeMarquee;
