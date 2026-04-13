import { Metadata } from "next";
import HydraLipDuo from "@/components/ComboDeals/HydraLipDuo";
import appwriteProductService from "@/appwrite/appwriteProductService";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Hydra Lip Duo — Matte Meets Moisture",
  description:
    "Get the perfect lip combo — French Love Matte Lipstick + Wild Flower Lip Oil. 8-hour wear, vegan, cruelty-free. Shop now at LOIS CHLOE Bangladesh.",
  alternates: { canonical: "/combo-deals/hydra-lip-duo" },
};

export default async function HydraLipDuoPage() {
  const products = await appwriteProductService.getProductDetails({
    slug: "hydra-lip-duo",
  });
  const product = products?.documents?.[0] || null;

  return <HydraLipDuo product={product} />;
}
