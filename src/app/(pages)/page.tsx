import dynamic from "next/dynamic";

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
import { Suspense } from "react";
import FeaturedProductListLoading from "@/components/Shared/loading/FeaturedProductListLoading";
import LoisChloeMarquee from "@/components/Shared/LoisChloeMarquee";
import Xyz from "@/components/Home/Xyz";
const OfferCountDown = dynamic(
  () => import("@/components/Shared/countDown/OfferCountDown"),
  { ssr: false }
);

const BeautyAdvice = dynamic(() => import("@/components/Home/BeautyAdvice"), {
  ssr: false,
});
const Reels = dynamic(() => import("@/components/Home/Reels"), {
  ssr: false,
});

export default function Home() {
  return (
    <div>
      <HomeSlider />
      <LoisChloeMarquee />

      <ShipmentToDelivery />
      <TrendingCategories />
      <OfferCountDown />

      <Offer />
      <Suspense fallback={<FeaturedProductListLoading />}>
        <FeaturedProducts />
      </Suspense>
      <LoisChloeMagazine />
      {/* <Xyz /> */}
      <CustomerFeedback />
      <WhyChooseUs />
      <BeautyAdvice />
      <Faq />
      <Reels />
    </div>
  );
}
