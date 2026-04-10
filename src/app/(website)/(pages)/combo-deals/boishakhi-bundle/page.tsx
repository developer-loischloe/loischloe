import { Metadata } from "next";
import BoishakhiBundle from "@/components/ComboDeals/BoishakhiBundle";
import appwriteProductService from "@/appwrite/appwriteProductService";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Boishakhi Bundle — 7 Vegan Products, 28% Off | LOIS CHLOE",
  description:
    "Celebrate Pohela Boishakh with LOIS CHLOE's exclusive bundle: Cushion Foundation, Concealer, Mascara, Bloom Palette, Lipstick, Eye Shadow Palette & Lip Oil. Save 4,750 BDT!",
  alternates: { canonical: "/combo-deals/boishakhi-bundle" },
};

export default async function BoishakhiBundlePage() {
  const products = await appwriteProductService.getProductDetails({
    slug: "boishakhi-bundle",
  });
  const product = products?.documents?.[0] || null;

  return <BoishakhiBundle product={product} />;
}
