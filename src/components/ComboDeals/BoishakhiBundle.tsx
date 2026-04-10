"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { addToCart, setShowCartSidebar } from "@/redux/features/cart/cartSlice";
import { toast } from "sonner";
import ShadeSelector, {
  DEFAULT_SHADES,
  Shade,
} from "@/components/Shared/ShadeSelector";
import {
  Sun,
  Droplets,
  Clock,
  Leaf,
  Star,
  Sparkles,
  Eye,
  Heart,
  Palette,
  ChevronRight,
  Gift,
  BadgePercent,
} from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import BoishakhiHeroImage from "../../../public/home_slider/1563x1458_px/boishakhi_bundle_mobile.jpg";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" },
  }),
};

const bundleProducts = [
  {
    name: "Cushion Foundation SPF",
    desc: "Sun protection meets flawless coverage in a portable cushion compact.",
    icon: Sun,
    color: "#FDCB6E",
  },
  {
    name: "Concealer 3.0",
    desc: "Full-coverage, lightweight concealer for a smooth, even complexion.",
    icon: Droplets,
    color: "#74b9ff",
  },
  {
    name: "Mascara",
    desc: "No-clump, buildable volume that lasts all day long.",
    icon: Eye,
    color: "#2D3436",
  },
  {
    name: "Bloom Palette",
    desc: "Multi-shade blush palette for a natural, radiant flush.",
    icon: Palette,
    color: "#fd79a8",
  },
  {
    name: "Lipstick",
    desc: "Semi-matte, highly pigmented, all-day comfort. Pick your shade below.",
    icon: Heart,
    color: "#E84393",
  },
  {
    name: "Eye Shadow Palette",
    desc: "Versatile shades for everyday glam or bold evening looks.",
    icon: Sparkles,
    color: "#a29bfe",
  },
  {
    name: "Lip Oil",
    desc: "Nourishing lip oil for a gorgeous, dewy sheen.",
    icon: Droplets,
    color: "#FF7675",
  },
];

const benefits = [
  { icon: Gift, label: "7 Products, 1 Bundle" },
  { icon: BadgePercent, label: "Save 28% (4,750 BDT)" },
  { icon: Leaf, label: "100% Vegan & Cruelty-Free" },
  { icon: Clock, label: "Limited Time Offer" },
];

const reviews = [
  {
    name: "Anika S.",
    rating: 5,
    text: "This bundle is unbelievable value! I got everything I need for a complete look. The quality is premium.",
  },
  {
    name: "Riya P.",
    rating: 5,
    text: "Bought this as a Boishakh gift for myself. Every single product is gorgeous. Love the Bloom Palette!",
  },
  {
    name: "Tamanna H.",
    rating: 5,
    text: "The concealer and foundation together give such a flawless base. And the savings are incredible!",
  },
];

const FOUNDATION_SHADES_ALL: { shade: Shade; disabled: boolean }[] = [
  {
    shade: { name: "Shade 1.5", hex: "#dab598", desc: "Light-medium tone" },
    disabled: true,
  },
  {
    shade: { name: "Shade 3.0", hex: "#d5a87f", desc: "Medium-deep warm tone" },
    disabled: false,
  },
];

const BoishakhiBundle = ({ product }: { product: any }) => {
  const [selectedLipstick, setSelectedLipstick] = useState<Shade>(DEFAULT_SHADES[0]);
  const [selectedFoundation, setSelectedFoundation] = useState<Shade>(
    FOUNDATION_SHADES_ALL.find((s) => !s.disabled)!.shade
  );
  const dispatch = useDispatch();
  const router = useRouter();

  const getShadeInfo = () =>
    `Foundation & Concealer: ${selectedFoundation.name}, Lipstick: ${selectedLipstick.name}`;

  const handleAddToCart = () => {
    if (!product) {
      toast.error("Product not available");
      return;
    }
    const productWithShade = {
      ...product,
      selectedShade: getShadeInfo(),
    };
    dispatch(
      addToCart({
        product: productWithShade,
        price: product.price,
        quantity: 1,
      })
    );
    dispatch(setShowCartSidebar({ show: true }));
  };

  const handleBuyNow = () => {
    if (!product) {
      toast.error("Product not available");
      return;
    }
    const productWithShade = {
      ...product,
      selectedShade: getShadeInfo(),
    };
    dispatch(
      addToCart({
        product: productWithShade,
        price: product.price,
        quantity: 1,
      })
    );
    router.push("/checkout");
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#fff0e6] via-white to-[#fef3f0]">
        {/* Festive decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-[#E84393]/5 rounded-full blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-[#FDCB6E]/10 rounded-full blur-3xl" />
        </div>

        <div className="max-w-6xl mx-auto px-4 py-12 md:py-20 relative">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            {/* Product Visual */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="relative rounded-3xl overflow-hidden"
            >
              <Image
                src={BoishakhiHeroImage}
                alt="Boishakhi Bundle - 7 Premium Vegan Products"
                className="w-full h-auto"
                priority
              />
              {/* Badges */}
              <div className="absolute top-4 right-4 flex flex-col gap-2">
                <div className="bg-[#E84393] text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
                  BOISHAKHI BUNDLE
                </div>
                <div className="bg-[#00b894] text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
                  SAVE 28%
                </div>
              </div>
            </motion.div>

            {/* Hero Text */}
            <div className="text-center md:text-left">
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-[#E84393] font-medium tracking-widest text-sm uppercase mb-2"
              >
                Pohela Boishakh Special
              </motion.p>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#2D3436] leading-tight mb-4"
              >
                Boishakhi Bundle
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-lg md:text-xl text-[#636e72] mb-6 italic"
              >
                Your complete vegan beauty collection for the new year.
              </motion.p>

              {/* Price Block */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
                className="flex items-baseline gap-3 justify-center md:justify-start mb-6"
              >
                <span className="text-3xl md:text-4xl font-bold text-[#2D3436]">
                  {formatCurrency(product?.sale_price || 11940)}
                </span>
                <del className="text-lg text-[#b2bec3]">
                  {formatCurrency(product?.price || 16690)}
                </del>
                <span className="bg-[#00b894] text-white text-xs font-bold px-2 py-1 rounded-full">
                  -28%
                </span>
              </motion.div>

              {/* Foundation & Concealer Shade Selector */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white/80 backdrop-blur-sm rounded-2xl p-5 border border-[#f0f0f0] mb-4 space-y-3"
              >
                <p className="text-xs font-medium text-[#636e72] uppercase tracking-wide">
                  Foundation & Concealer Shade
                </p>
                <div className="flex items-center gap-4">
                  {FOUNDATION_SHADES_ALL.map(({ shade, disabled }) => (
                    <button
                      key={shade.name}
                      disabled={disabled}
                      onClick={() => !disabled && setSelectedFoundation(shade)}
                      className={`flex flex-col items-center gap-2 min-w-[70px] p-2 rounded-lg transition-all ${
                        disabled
                          ? "opacity-40 cursor-not-allowed"
                          : "cursor-pointer"
                      }`}
                    >
                      <div
                        className={`w-10 h-10 rounded-full shadow-md transition-all ${
                          !disabled && selectedFoundation.name === shade.name
                            ? "ring-2 ring-offset-2 ring-[#2D3436] scale-110"
                            : ""
                        }`}
                        style={{ backgroundColor: shade.hex }}
                      />
                      <span className="text-xs text-center leading-tight">
                        {shade.name}
                        {disabled && (
                          <span className="block text-[10px] text-red-400">
                            Unavailable
                          </span>
                        )}
                      </span>
                    </button>
                  ))}
                </div>
                <div className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: selectedFoundation.hex }}
                  />
                  <p className="text-sm text-[#2D3436]">
                    <span className="font-semibold">Selected:</span>{" "}
                    {selectedFoundation.name}
                    <span className="text-[#636e72] ml-1">— {selectedFoundation.desc}</span>
                  </p>
                </div>
              </motion.div>

              {/* Lipstick Shade Selector */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
                className="bg-white/80 backdrop-blur-sm rounded-2xl p-5 border border-[#f0f0f0] mb-6"
              >
                <ShadeSelector
                  shades={DEFAULT_SHADES}
                  selectedShade={selectedLipstick}
                  onSelect={setSelectedLipstick}
                />
              </motion.div>

              {/* CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="flex flex-col sm:flex-row items-center gap-3"
              >
                <button
                  onClick={handleBuyNow}
                  className="w-full sm:w-auto px-8 py-4 bg-[#E84393] hover:bg-[#d63384] text-white font-semibold rounded-full text-lg transition-all duration-300 shadow-lg shadow-[#E84393]/30 hover:shadow-xl hover:shadow-[#E84393]/40 active:scale-95 flex items-center justify-center gap-2"
                >
                  Buy Now
                  <ChevronRight className="w-5 h-5" />
                </button>
                <button
                  onClick={handleAddToCart}
                  className="w-full sm:w-auto px-8 py-4 bg-white hover:bg-gray-50 text-[#2D3436] font-semibold rounded-full text-lg transition-all duration-300 border-2 border-[#2D3436] active:scale-95"
                >
                  Add to Cart — {selectedLipstick?.name}
                </button>
              </motion.div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-xs text-[#b2bec3] mt-3 text-center md:text-left"
              >
                Limited stock available. Cash on Delivery available nationwide.
              </motion.p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-[#2D3436] text-center mb-12">
            Why This Bundle?
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {benefits.map((item, i) => (
              <motion.div
                key={item.label}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={fadeUp}
                className="flex flex-col items-center text-center p-5 rounded-2xl bg-gradient-to-b from-[#fff0f6] to-white border border-[#fce4ec] hover:shadow-md transition-shadow"
              >
                <div className="w-14 h-14 rounded-full bg-[#E84393]/10 flex items-center justify-center mb-3">
                  <item.icon className="w-6 h-6 text-[#E84393]" />
                </div>
                <p className="text-sm font-semibold text-[#2D3436]">
                  {item.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* What's Inside */}
      <section className="py-16 md:py-20 bg-gradient-to-b from-[#fff8f0] to-white">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-[#2D3436] text-center mb-4">
            What&apos;s Inside the Bundle
          </h2>
          <p className="text-[#636e72] text-center mb-12">
            7 premium vegan products for your complete look
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {bundleProducts.map((item, i) => (
              <motion.div
                key={item.name}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="relative bg-white rounded-2xl p-5 border border-[#f0e6dc] shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-start gap-4">
                  <div
                    className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: `${item.color}15` }}
                  >
                    <item.icon
                      className="w-6 h-6"
                      style={{ color: item.color }}
                    />
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-[#2D3436] mb-1">
                      {item.name}
                    </h3>
                    <p className="text-[#636e72] text-sm leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-[#2D3436] text-center mb-3">
            What Our Customers Say
          </h2>
          <p className="text-[#636e72] text-center mb-12">
            Real reviews from real beauty lovers
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            {reviews.map((review, i) => (
              <motion.div
                key={review.name}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="bg-[#fafafa] rounded-2xl p-6 border border-[#f0f0f0]"
              >
                <div className="flex items-center gap-1 mb-3">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <Star
                      key={j}
                      className={`w-4 h-4 ${
                        j < review.rating
                          ? "fill-[#FDCB6E] text-[#FDCB6E]"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <p className="text-[#2D3436] text-sm mb-4 leading-relaxed">
                  &ldquo;{review.text}&rdquo;
                </p>
                <p className="text-xs font-semibold text-[#636e72] uppercase tracking-wide">
                  {review.name}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Perfect For Section */}
      <section className="py-16 md:py-20 bg-gradient-to-b from-[#fef3f0] to-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-[#2D3436] mb-8">
            Perfect For
          </h2>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              "Pohela Boishakh Gift",
              "Complete Makeover",
              "First Vegan Beauty Kit",
              "Birthday Gift",
              "Bridal Prep",
              "Self-Care Day",
            ].map((tag, i) => (
              <motion.span
                key={tag}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="px-5 py-2.5 rounded-full bg-white border border-[#f0e6dc] text-[#2D3436] text-sm font-medium shadow-sm hover:shadow-md transition-shadow"
              >
                {tag}
              </motion.span>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 bg-[#2D3436] text-white text-center">
        <p className="text-xl font-bold tracking-wide mb-2">LOIS CHLOE</p>
        <p className="text-sm text-white/60 tracking-widest">
          Vegan &nbsp;|&nbsp; Cruelty-Free &nbsp;|&nbsp; Australian Quality
        </p>
      </footer>

      {/* Sticky Mobile CTA */}
      <div className="fixed bottom-0 left-0 right-0 md:hidden bg-white/95 backdrop-blur-md border-t border-gray-100 p-3 z-50">
        <div className="flex items-center gap-3">
          <div className="flex-1 min-w-0">
            <p className="text-xs text-[#636e72] truncate">Boishakhi Bundle</p>
            <div className="flex items-baseline gap-2">
              <span className="text-base font-bold text-[#2D3436]">
                {formatCurrency(product?.sale_price || 11940)}
              </span>
              <del className="text-xs text-[#b2bec3]">
                {formatCurrency(product?.price || 16690)}
              </del>
            </div>
          </div>
          <button
            onClick={handleBuyNow}
            className="shrink-0 px-6 py-3 bg-[#E84393] hover:bg-[#d63384] text-white font-semibold rounded-full text-sm shadow-lg shadow-[#E84393]/30 active:scale-95 transition-all"
          >
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default BoishakhiBundle;
