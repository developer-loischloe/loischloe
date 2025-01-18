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
import HotProducts from "@/components/Home/HotProducts";
import SliderProductListLoading from "@/components/Shared/loading/SliderProductListLoading";
import JsonLd from "@/components/Shared/JsonLd ";
import { globalMetaDataConstant } from "@/app/constant";
import Loader from "@/components/Shared/loading/Loader";
import ComboDeals from "@/components/Home/ComboDeals";
import PreBooking from "@/components/Home/PreBooking";

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
  const { description, website_name, website_url } = globalMetaDataConstant;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: website_name,
    alternateName: "LC",
    url: website_url,
    image: website_url + "/og_image.png",
    description: description,
  };

  return (
    <div>
      <HomeSlider />
      <ShipmentToDelivery />
      <TrendingCategories />

      <Suspense fallback={<SliderProductListLoading />}>
        <ComboDeals />
      </Suspense>
      <Suspense fallback={<SliderProductListLoading />}>
        <PreBooking />
      </Suspense>
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

      {/*  */}
      <JsonLd data={jsonLd} />
    </div>
  );
}
