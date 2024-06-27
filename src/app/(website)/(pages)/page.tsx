import { Suspense } from "react";
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
import MustHaveEssentials from "@/components/Home/MustHaveEssentials";
import Loader from "@/components/Shared/loading/Loader";
import HotProducts from "@/components/Home/HotProducts";
import SliderProductListLoading from "@/components/Shared/loading/SliderProductListLoading";

const BeautyAdvice = dynamic(() => import("@/components/Home/BeautyAdvice"), {
  ssr: false,
});
const InstagramReels = dynamic(
  () => import("@/components/Home/InstagramReels"),
  {
    ssr: false,
  }
);
const OfferCountDown = dynamic(
  () => import("@/components/Shared/countDown/OfferCountDown"),
  { ssr: false }
);

export default function Home() {
  return (
    <div>
      <HomeSlider />
      <ShipmentToDelivery />
      <TrendingCategories />
      <Suspense fallback={<SliderProductListLoading />}>
        <FeaturedProducts />
      </Suspense>
      <Offer />
      <Suspense fallback={<SliderProductListLoading />}>
        <HotProducts />
      </Suspense>
      <LoisChloeMagazine />
      <Suspense fallback={<Loader />}>
        <MustHaveEssentials />
      </Suspense>
      <CustomerFeedback />
      <WhyChooseUs />
      <BeautyAdvice />
      <Faq />
      <InstagramReels />
    </div>
  );
}
