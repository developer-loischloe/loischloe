import { Metadata } from "next";

import HeroBanner from "@/components/Redesign/HeroBanner";
import Bestsellers from "@/components/Redesign/Bestsellers";
import FeaturedSection from "@/components/Redesign/FeaturedSection";
import PopularProducts from "@/components/Redesign/PopularProducts";
import BlogSection from "@/components/Redesign/BlogSection";
import ForYouSection from "@/components/Redesign/ForYouSection";
import JsonLd from "@/components/Shared/JsonLd ";
import OrganizationJsonLd from "@/components/Shared/OrganizationJsonLd";
import { globalMetaDataConstant } from "@/app/constant";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

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
      <h1 className="sr-only">
        LOIS CHLOE — Cruelty-Free Vegan Makeup in Bangladesh
      </h1>
      <HeroBanner />
      <Bestsellers />
      <FeaturedSection />
      <PopularProducts />
      <BlogSection />
      <ForYouSection />
      <JsonLd data={jsonLd} />
      <OrganizationJsonLd />
    </div>
  );
}
