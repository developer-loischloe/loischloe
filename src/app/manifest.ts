import { MetadataRoute } from "next";
import { globalMetaDataConstant } from "./constant";

export default function manifest(): MetadataRoute.Manifest {
  // constants
  const { website_name, title, description } = globalMetaDataConstant;

  return {
    name: title,
    short_name: website_name,
    description: description,
    start_url: "/",
    display: "standalone",
    background_color: "#09090B",
    theme_color: "#000000",
    scope: "/",
    orientation: "portrait",
    icons: [
      {
        src: "/icon-192x192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/icon-256x256.png",
        sizes: "256x256",
        type: "image/png",
      },
      {
        src: "/icon-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
