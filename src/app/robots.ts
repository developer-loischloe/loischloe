import { MetadataRoute } from "next";
import { globalMetaDataConstant } from "./constant";
const { website_url } = globalMetaDataConstant;

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/dashboard",
    },
    sitemap: website_url + "/sitemap.xml",
  };
}
