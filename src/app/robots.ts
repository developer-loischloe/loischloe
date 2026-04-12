import { MetadataRoute } from "next";
import { globalMetaDataConstant } from "./constant";
const { website_url } = globalMetaDataConstant;

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/dashboard", "/api/", "/_next/", "/checkout/", "/cart/", "/*?a="],
    },
    sitemap: website_url + "/sitemap.xml",
  };
}
