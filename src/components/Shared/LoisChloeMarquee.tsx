import Link from "next/link";
import Marquee from "react-fast-marquee";

const LoisChloeMarquee = () => {
  return (
    <Link href={"/combo-deals"}>
      <div className="bg-[#FA9E00] hover:bg-black hover:text-white transition-all duration-300 p-2">
        <Marquee className="space-x-20">
          <div className="flex justify-between gap-x-40">
            <div>
              🎉✨ Eid Special Offer! ✨🎉 Enjoy 5% OFF on All Products –
              Celebrate & Save! 🛍️💖
            </div>
            <div>
              🎉✨ Eid Special Offer! ✨🎉 Enjoy 5% OFF on All Products –
              Celebrate & Save! 🛍️💖
            </div>
            <div>
              🎉✨ Eid Special Offer! ✨🎉 Enjoy 5% OFF on All Products –
              Celebrate & Save! 🛍️💖
            </div>
          </div>
        </Marquee>
      </div>
    </Link>
  );
};

export default LoisChloeMarquee;
