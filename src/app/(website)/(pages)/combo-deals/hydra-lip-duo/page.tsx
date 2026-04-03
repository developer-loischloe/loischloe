import { Metadata } from "next";
import HydraLipDuo from "@/components/ComboDeals/HydraLipDuo";

export const metadata: Metadata = {
  title: "Hydra Lip Duo — Matte Meets Moisture | LOIS CHLOE",
  description:
    "Get the perfect lip combo — French Love Matte Lipstick + Wild Flower Lip Oil. 8-hour wear, vegan, cruelty-free. Shop now at LOIS CHLOE Bangladesh.",
  alternates: { canonical: "/combo-deals/hydra-lip-duo" },
};

export default function HydraLipDuoPage() {
  return <HydraLipDuo />;
}
