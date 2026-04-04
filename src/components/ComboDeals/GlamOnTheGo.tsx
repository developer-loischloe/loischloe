"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
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

const routine = [
  {
    step: 1,
    label: "Base",
    product: "SPF Cushion Foundation",
    desc: "Sun protection meets flawless coverage. Just press, pat, and glow — all in a portable cushion compact.",
    icon: Sun,
    color: "#FDCB6E",
  },
  {
    step: 2,
    label: "Eyes",
    product: "Perfect Last Mascara",
    desc: "No-clump, buildable volume that lasts all day. From natural to dramatic in a single swipe.",
    icon: Eye,
    color: "#E84393",
  },
  {
    step: 3,
    label: "Lips",
    product: "Precious Love Lipstick",
    desc: "Semi-matte, highly pigmented, all-day comfort. Pick your perfect shade below.",
    icon: Heart,
    color: "#FF7675",
  },
];

const benefits = [
  { icon: Sun, label: "SPF Protection" },
  { icon: Droplets, label: "Humidity-Proof" },
  { icon: Clock, label: "5-Minute Full Face" },
  { icon: Leaf, label: "100% Vegan & Cruelty-Free" },
];

const perfectFor = [
  "Busy Mornings",
  "Office Touch-ups",
  "Date Night",
  "Travel Essential",
];

const reviews = [
  {
    name: "Sara M.",
    rating: 5,
    text: "I literally get ready in 5 minutes now. The foundation gives such a natural glow and the mascara is AMAZING.",
  },
  {
    name: "Raisa T.",
    rating: 5,
    text: "This combo has everything I need. The lipstick shade Nude Blush is my everyday go-to!",
  },
  {
    name: "Maliha J.",
    rating: 4,
    text: "Perfect for my work bag. Love that the foundation has SPF — one less product to carry!",
  },
];

const GlamOnTheGo = ({ product }: { product: any }) => {
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
      <section className="relative overflow-hidden bg-gradient-to-br from-[#fff0f6] via-[#fff8f0] to-white">
        <div className="max-w-6xl mx-auto px-4 py-12 md:py-20">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            {/* Product Image Area */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="relative aspect-square bg-gradient-to-br from-[#fce4ec] via-[#fff3e0] to-[#e8f5e9] rounded-3xl flex items-center justify-center overflow-hidden"
            >
              <div className="text-center p-8">
                <div className="flex items-center justify-center gap-3 mb-6">
                  <div className="w-20 h-20 rounded-2xl bg-[#FDCB6E]/20 flex items-center justify-center text-4xl">
                    🧴
                  </div>
                  <div className="w-20 h-20 rounded-2xl bg-[#E84393]/20 flex items-center justify-center text-4xl">
                    🖌️
                  </div>
                  <div className="w-20 h-20 rounded-2xl bg-[#FF7675]/20 flex items-center justify-center text-4xl">
                    💄
                  </div>
                </div>
                <p className="text-[#636e72] text-sm">
                  Foundation + Mascara + Lipstick
                </p>
              </div>
              <div className="absolute top-4 left-4 bg-[#2D3436] text-white text-xs font-bold px-3 py-1.5 rounded-full">
                3-IN-1 COMBO
              </div>
              <div className="absolute top-4 right-4 bg-[#E84393] text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
                SAVE MORE
              </div>
            </motion.div>

            {/* Hero Text */}
            <div className="text-center md:text-left">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="inline-flex items-center gap-1.5 text-[#E84393] font-medium tracking-widest text-sm uppercase mb-2"
              >
                <Sparkles className="w-4 h-4" />
                Exclusive Combo
              </motion.div>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#2D3436] leading-tight mb-4"
              >
                Glam on the Go
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-lg md:text-xl text-[#636e72] mb-8 italic"
              >
                3 products. 5 minutes. Full glam.
              </motion.p>

              {/* Shade Selector */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white/80 backdrop-blur-sm rounded-2xl p-5 border border-[#f0f0f0] mb-6"
              >
                <p className="text-xs text-[#636e72] mb-2 uppercase tracking-wide">
                  Choose lipstick shade for the combo
                </p>
                <ShadeSelector
                  shades={DEFAULT_SHADES}
                  selectedShade={selectedShade}
                  onSelect={setSelectedShade}
                />
              </motion.div>

              {/* CTA */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <button
                  onClick={handleBuyNow}
                  className="w-full sm:w-auto px-8 py-4 bg-[#E84393] hover:bg-[#d63384] text-white font-semibold rounded-full text-lg transition-all duration-300 shadow-lg shadow-[#E84393]/30 hover:shadow-xl hover:shadow-[#E84393]/40 active:scale-95 flex items-center justify-center gap-2"
                >
                  Get the Glam Combo
                  <ChevronRight className="w-5 h-5" />
                </button>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* The 3-Step Routine */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-[#2D3436] text-center mb-3">
            The 3-Step Routine
          </h2>
          <p className="text-[#636e72] text-center mb-12">
            Full glam in 5 minutes — here&apos;s how
          </p>

          <div className="relative">
            {/* Timeline line (desktop) */}
            <div className="hidden md:block absolute top-12 left-[16.67%] right-[16.67%] h-0.5 bg-gradient-to-r from-[#FDCB6E] via-[#E84393] to-[#FF7675]" />

            <div className="grid md:grid-cols-3 gap-6">
              {routine.map((item, i) => (
                <motion.div
                  key={item.step}
                  custom={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeUp}
                  className="relative bg-white rounded-2xl p-6 border border-[#f0f0f0] hover:shadow-lg transition-shadow duration-300 group"
                >
                  {/* Step number */}
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm mb-4 mx-auto md:mx-0 relative z-10"
                    style={{ backgroundColor: item.color }}
                  >
                    {item.step}
                  </div>
                  <div className="text-center md:text-left">
                    <p
                      className="text-xs font-bold uppercase tracking-widest mb-1"
                      style={{ color: item.color }}
                    >
                      Step {item.step}: {item.label}
                    </p>
                    <h3 className="text-lg font-semibold text-[#2D3436] mb-2">
                      {item.product}
                    </h3>
                    <p className="text-sm text-[#636e72] leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                  <div className="absolute top-4 right-4 opacity-10 group-hover:opacity-20 transition-opacity">
                    <item.icon className="w-12 h-12" style={{ color: item.color }} />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Grid */}
      <section className="py-16 md:py-20 bg-gradient-to-b from-[#fff0f6] to-white">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-[#2D3436] text-center mb-12">
            Why This Combo Works
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {benefits.map((item, i) => (
              <motion.div
                key={item.label}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="flex flex-col items-center text-center p-5 rounded-2xl bg-white border border-[#fce4ec] hover:shadow-md transition-shadow"
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

      {/* Perfect For */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-[#2D3436] mb-8">
            Perfect For
          </h2>
          <div className="flex flex-wrap justify-center gap-3">
            {perfectFor.map((tag, i) => (
              <motion.span
                key={tag}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="px-5 py-2.5 rounded-full bg-gradient-to-r from-[#E84393]/10 to-[#FF7675]/10 text-[#E84393] font-medium text-sm border border-[#E84393]/20 hover:border-[#E84393]/40 transition-colors"
              >
                {tag}
              </motion.span>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-16 md:py-20 bg-[#fafafa]">
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
                className="bg-white rounded-2xl p-6 border border-[#f0f0f0] hover:shadow-md transition-shadow"
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
          Get the Glam Combo
        </button>
      </div>
    </div>
  );
};

export default GlamOnTheGo;
