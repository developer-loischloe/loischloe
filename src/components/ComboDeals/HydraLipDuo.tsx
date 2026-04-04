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
  Clock,
  Droplets,
  Leaf,
  FlaskConical,
  Star,
  ChevronRight,
} from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" },
  }),
};

const benefits = [
  { icon: Clock, label: "8-Hour Matte Wear" },
  { icon: Droplets, label: "Instant Hydration Layer" },
  { icon: Leaf, label: "100% Vegan & Cruelty-Free" },
  { icon: FlaskConical, label: "Clinically Tested in Australia" },
];

const reviews = [
  {
    name: "Nadia R.",
    rating: 5,
    text: "The matte lipstick lasts through lunch AND the lip oil makes my lips so soft. Best combo ever!",
  },
  {
    name: "Fariha K.",
    rating: 5,
    text: "I love how the French Love shade looks on me. The lip oil on top gives such a luxe finish.",
  },
  {
    name: "Tasnim A.",
    rating: 4,
    text: "Great quality, feels so smooth. The duo is worth every taka. Will be repurchasing!",
  },
];

const HydraLipDuo = ({ product }: { product: any }) => {
  const [selectedShade, setSelectedShade] = useState<Shade>(DEFAULT_SHADES[0]);
  const dispatch = useDispatch();
  const router = useRouter();

  const handleAddToCart = () => {
    if (!product) {
      toast.error("Product not available");
      return;
    }
    const productWithShade = {
      ...product,
      selectedShade: selectedShade.name,
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
      selectedShade: selectedShade.name,
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
      <section className="relative overflow-hidden bg-gradient-to-br from-[#fff0f6] via-white to-[#fff8f0]">
        <div className="max-w-6xl mx-auto px-4 py-12 md:py-20">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            {/* Product Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="relative aspect-square bg-gradient-to-br from-[#fce4ec] to-[#fff3e0] rounded-3xl flex items-center justify-center overflow-hidden"
            >
              <div className="text-center p-8">
                <div className="w-48 h-48 mx-auto rounded-full bg-gradient-to-br from-[#E84393]/20 to-[#FDCB6E]/20 flex items-center justify-center mb-4">
                  <span className="text-6xl">💄</span>
                </div>
                <p className="text-[#636e72] text-sm">
                  French Love Lipstick + Wild Flower Lip Oil
                </p>
              </div>
              {/* Decorative badge */}
              <div className="absolute top-4 right-4 bg-[#E84393] text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
                COMBO DEAL
              </div>
            </motion.div>

            {/* Hero Text */}
            <div className="text-center md:text-left">
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-[#E84393] font-medium tracking-widest text-sm uppercase mb-2"
              >
                Limited Edition Combo
              </motion.p>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#2D3436] leading-tight mb-4"
              >
                Hydra Lip Duo
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-lg md:text-xl text-[#636e72] mb-8 italic"
              >
                Matte meets moisture. Your lips deserve both.
              </motion.p>

              {/* Shade Selector */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white/80 backdrop-blur-sm rounded-2xl p-5 border border-[#f0f0f0] mb-6"
              >
                <ShadeSelector
                  shades={DEFAULT_SHADES}
                  selectedShade={selectedShade}
                  onSelect={setSelectedShade}
                />
              </motion.div>

              {/* Price & CTA */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="flex flex-col sm:flex-row items-center gap-4"
              >
                <button
                  onClick={handleBuyNow}
                  className="w-full sm:w-auto px-8 py-4 bg-[#E84393] hover:bg-[#d63384] text-white font-semibold rounded-full text-lg transition-all duration-300 shadow-lg shadow-[#E84393]/30 hover:shadow-xl hover:shadow-[#E84393]/40 active:scale-95 flex items-center justify-center gap-2"
                >
                  Add to Cart — {selectedShade?.name}
                  <ChevronRight className="w-5 h-5" />
                </button>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-[#2D3436] text-center mb-12">
            Why You&apos;ll Love This Duo
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

      {/* How to Use */}
      <section className="py-16 md:py-20 bg-gradient-to-b from-[#fff8f0] to-white">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-[#2D3436] text-center mb-12">
            How to Use
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                step: 1,
                title: "Apply French Love Matte Lipstick",
                desc: "Start with our long-lasting matte formula. Line your lips and fill in with your chosen shade for a bold, velvety finish that stays put for up to 8 hours.",
                emoji: "💋",
              },
              {
                step: 2,
                title: "Layer Wild Flower Lip Oil",
                desc: "Dab the nourishing lip oil on top for a gorgeous glossy finish. The hydrating formula locks in moisture while adding a beautiful, dewy sheen.",
                emoji: "🌸",
              },
            ].map((item, i) => (
              <motion.div
                key={item.step}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="relative bg-white rounded-2xl p-6 border border-[#f0e6dc] shadow-sm"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#FDCB6E] flex items-center justify-center text-[#2D3436] font-bold text-lg">
                    {item.step}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-[#2D3436] mb-2">
                      {item.title}
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

      {/* Footer */}
      <footer className="py-10 bg-[#2D3436] text-white text-center">
        <p className="text-xl font-bold tracking-wide mb-2">LOIS CHLOE</p>
        <p className="text-sm text-white/60 tracking-widest">
          Vegan &nbsp;|&nbsp; Cruelty-Free &nbsp;|&nbsp; Australian Quality
        </p>
      </footer>

      {/* Sticky Mobile CTA */}
      <div className="fixed bottom-0 left-0 right-0 md:hidden bg-white/95 backdrop-blur-md border-t border-gray-100 p-3 z-50">
        <button
          onClick={handleBuyNow}
          className="w-full py-3.5 bg-[#E84393] hover:bg-[#d63384] text-white font-semibold rounded-full text-base shadow-lg shadow-[#E84393]/30 active:scale-95 transition-all"
        >
          Add to Cart — ৳{" "}
          <span className="text-sm opacity-75">
            ({selectedShade?.name})
          </span>
        </button>
      </div>
    </div>
  );
};

export default HydraLipDuo;
