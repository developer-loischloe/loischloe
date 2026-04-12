import { Suspense } from "react";
import dynamic from "next/dynamic";
import { Metadata } from "next";

// Homepage is dynamic (renders on each request) with CDN caching
// configured via next.config.mjs headers for fast subsequent loads.
// We avoid page-level ISR (revalidate) because Appwrite API flakiness
// during build-time prerendering causes deployment failures.

export const metadata: Metadata = {
  alternates: {
    canonical: "/",
  },
};

// Components
import HomeSlider from "@/components/Home/HomeSlider/index";
import ShipmentToDelivery from "@/components/Home/ShipmentToDelivery";
import TrendingCategories from "@/components/Home/TrendingCategories.tsx";
import Offer from "@/components/Home/Offer";
import FeaturedProducts from "@/components/Home/FeaturedProducts";
import LoisChloeMagazine from "@/components/Home/LoisChloeMagazine/index";
import WhyChooseUs from "@/components/Home/WhyChooseUs";
import Faq from "@/components/Home/Faq";
import MustHaveEssentials from "@/components/Home/MustHaveEssentials";
import HotProducts from "@/components/Home/HotProducts";
import SliderProductListLoading from "@/components/Shared/loading/SliderProductListLoading";
import JsonLd from "@/components/Shared/JsonLd ";
import OrganizationJsonLd from "@/components/Shared/OrganizationJsonLd";
import { globalMetaDataConstant } from "@/app/constant";
import Loader from "@/components/Shared/loading/Loader";
import BestSelling from "@/components/Home/BestSelling";
import ComboDeals from "@/components/Home/ComboDeals";
import PreBooking from "@/components/Home/PreBooking";
import RecentComment from "@/components/dashboard/overView/RecentComment";
import LipstickTabSlider from "@/components/Home/LipstickTabSlider";
import HomePageHorizontalMobileNav from "@/components/Home/HomePageHorizontalMobileNav";

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
      <h1 className="sr-only">LOIS CHLOE — Cruelty-Free Vegan Makeup in Bangladesh</h1>
      <HomePageHorizontalMobileNav />
      <HomeSlider />
      <ShipmentToDelivery />

      {/* <TrendingCategories /> */}
      {/* <OfferCountDown /> */}

      <Suspense fallback={<SliderProductListLoading />}>
        <BestSelling />
      </Suspense>

      <Suspense fallback={<SliderProductListLoading />}>
        <ComboDeals />
      </Suspense>

      <Suspense fallback={<SliderProductListLoading />}>
        <LipstickTabSlider />
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
      <WhyChooseUs />
      <BeautyAdvice />
      <Faq />

      <section className="max-w-5xl mx-auto pb-0">
        <h5 className="text-center subHeading">Customer Love ❤️</h5>
        <h4 className="heading-1 text-center">Hear from our happy shoppers!</h4>
        <RecentComment />
      </section>

      <InstagramReels />

      <JsonLd data={jsonLd} />
      <OrganizationJsonLd />
    </div>
  );
}
