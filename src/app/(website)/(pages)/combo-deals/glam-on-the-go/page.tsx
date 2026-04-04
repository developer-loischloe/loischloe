import { Metadata } from "next";
import GlamOnTheGo from "@/components/ComboDeals/GlamOnTheGo";
import appwriteProductService from "@/appwrite/appwriteProductService";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Glam on the Go — 3 Products, 5 Minutes, Full Glam | LOIS CHLOE",
  description:
    "SPF Cushion Foundation + Perfect Last Mascara + Precious Love Lipstick. Your 5-minute full glam routine. Vegan, cruelty-free. Shop at LOIS CHLOE Bangladesh.",
  alternates: { canonical: "/combo-deals/glam-on-the-go" },
};

export default async function GlamOnTheGoPage() {
  const products = await appwriteProductService.getProductDetails({
    slug: "glam-on-the-go",
  });
  const product = products?.documents?.[0] || null;

  return <GlamOnTheGo product={product} />;
}
