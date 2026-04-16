"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

export default function BlogSection() {
  const reduce = useReducedMotion();

  return (
    <section className="relative overflow-hidden !max-w-none !p-0">
      <div className="relative min-h-[60vh] sm:min-h-[70vh] md:min-h-[80vh] flex items-center justify-center">
        <Image
          src="/redesign/blog-hero.jpg"
          alt="Beauty editorial"
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div
          className="absolute inset-0"
          style={{ background: "oklch(0.15 0.02 50 / 0.4)" }}
        />
        <motion.div
          className="relative z-10 text-center px-6 max-w-3xl mx-auto"
          initial={reduce ? { opacity: 0 } : { opacity: 0, y: 30 }}
          whileInView={reduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="rd-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white mb-4 sm:mb-6">
            Discover Our Woman&apos;s Blog
          </h2>
          <p className="text-sm sm:text-base text-white/70 mb-6 sm:mb-8 max-w-xl mx-auto leading-relaxed">
            Dive into a world of beauty, wellness, and self-care with expert
            tips, in-depth skincare advice, makeup trends, and holistic health
            insights designed to help you look and feel your best every day.
          </p>
          <Link
            href="/blog"
            className="inline-flex px-6 sm:px-8 py-2.5 sm:py-3 rounded-full bg-white/20 backdrop-blur-sm text-white text-xs sm:text-sm font-semibold uppercase tracking-wider hover:bg-white/30 transition-colors"
          >
            DISCOVER
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
