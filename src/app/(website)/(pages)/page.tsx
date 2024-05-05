import dynamic from "next/dynamic";
import { Suspense } from "react";

// Components
import HomeSlider from "@/components/Home/HomeSlider/index";
import ShipmentToDelivery from "@/components/Home/ShipmentToDelivery";
import TrendingCategories from "@/components/Home/TrendingCategories.tsx";
import Offer from "@/components/Home/Offer";
import FeaturedProducts from "@/components/Home/FeaturedProducts";
import LoisChloeMagazine from "@/components/Home/LoisChloeMagazine/index";
import CustomerFeedback from "@/components/Home/CustomerFeedback";
import WhyChooseUs from "@/components/Home/WhyChooseUs";
import Faq from "@/components/Home/Faq";
import FeaturedProductListLoading from "@/components/Shared/loading/FeaturedProductListLoading";
import MustHaveEssentials from "@/components/Home/MustHaveEssentials";

const BeautyAdvice = dynamic(() => import("@/components/Home/BeautyAdvice"), {
  ssr: false,
});
const InstagramReels = dynamic(
  () => import("@/components/Home/InstagramReels"),
  {
    ssr: false,
  }
);

export default function Home() {
  return (
    <div>
      <HomeSlider />
      <ShipmentToDelivery />
      <TrendingCategories />
      <Offer />
      <Suspense fallback={<FeaturedProductListLoading />}>
        <FeaturedProducts />
      </Suspense>
      <LoisChloeMagazine />
      <MustHaveEssentials />
      <CustomerFeedback />
      <WhyChooseUs />
      <BeautyAdvice />
      <Faq />
      {/* <Reels /> */}
      <InstagramReels />
    </div>
  );
}
