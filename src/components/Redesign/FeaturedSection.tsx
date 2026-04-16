"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { products, subCategories, formatPrice } from "./data";

export default function FeaturedSection() {
  const reduce = useReducedMotion();
  const gentleman = products.find((p) => p.slug === "gentleman-eau-de-parfum")!;
  const benjamins = products.find((p) => p.slug === "les-benjamins-oriental")!;

  return (
    <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 max-w-7xl mx-auto">
      <motion.div
        className="text-center mb-10 sm:mb-14"
        initial={reduce ? { opacity: 0 } : { opacity: 0, y: 30 }}
        whileInView={reduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <h2 className="rd-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-foreground italic">
          It&apos;s Back!
        </h2>
        <p className="rd-eyebrow mt-3">[ FOR LIMITED TIME ONLY ]</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        {/* Left tall featured card */}
        <motion.div
          className="relative rd-card aspect-[3/4] group"
          initial={reduce ? { opacity: 0 } : { opacity: 0, x: -30 }}
          whileInView={reduce ? { opacity: 1 } : { opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Link href={`/product/${gentleman.slug}`} className="block w-full h-full">
            <Image
              src={gentleman.image}
              alt={gentleman.name}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(to top, oklch(0.15 0.02 50 / 0.6) 0%, transparent 100%)",
              }}
            />
            <div className="absolute top-6 left-6 right-6">
              <h3 className="font-display text-2xl sm:text-3xl md:text-4xl font-semibold text-primary-foreground leading-tight">
                Magic timeless by nature, always
              </h3>
            </div>
            <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6">
              <div className="bg-card/90 backdrop-blur-sm rounded-xl p-3 sm:p-4 flex items-center gap-3">
                <Image
                  src={gentleman.image}
                  alt=""
                  width={48}
                  height={48}
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg object-cover"
                />
                <div className="flex-1 min-w-0">
                  <h4 className="font-display text-sm sm:text-base font-bold text-foreground truncate">
                    {gentleman.name} {gentleman.brand}
                  </h4>
                  <p className="text-[10px] sm:text-xs text-muted-foreground line-clamp-1">
                    {gentleman.description}
                  </p>
                </div>
                <span className="text-xs sm:text-sm font-semibold text-foreground whitespace-nowrap">
                  {formatPrice(gentleman.price)}
                </span>
              </div>
            </div>
          </Link>
        </motion.div>

        {/* Right column */}
        <div className="flex flex-col gap-4 sm:gap-6">
          {/* Circle-morph card */}
          <motion.div
            className="relative rd-card aspect-square group bg-secondary peer"
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 30 }}
            whileInView={reduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <Link href="/products" className="block w-full h-full">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-[85%] aspect-square rounded-full overflow-hidden transition-all duration-500 group-hover:w-full group-hover:rounded-none">
                  <Image
                    src="/redesign/featured-2.jpg"
                    alt="Water splash texture"
                    width={800}
                    height={800}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
              </div>
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <span className="text-xs sm:text-sm text-primary-foreground uppercase tracking-[0.2em] font-medium text-center leading-relaxed px-8 py-3 border border-primary-foreground/40">
                  VIEW MORE
                  <br />
                  LIMITED EDITION
                  <br />
                  PRODUCTS
                </span>
              </div>
            </Link>
          </motion.div>

          {/* Oriental trail card */}
          <motion.div
            className="relative rd-card aspect-square group"
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 30 }}
            whileInView={reduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Link href={`/product/${benjamins.slug}`} className="block w-full h-full">
              <Image
                src={benjamins.image}
                alt={benjamins.name}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(to top, oklch(0.15 0.02 50 / 0.5) 0%, transparent 100%)",
                }}
              />
              <div className="absolute top-4 sm:top-6 left-4 sm:left-6 right-4 sm:right-6">
                <h3 className="font-display text-2xl sm:text-3xl font-semibold text-primary-foreground leading-tight">
                  Amazing wrapped in an oriental trail
                </h3>
              </div>
              <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6">
                <div className="bg-card/90 backdrop-blur-sm rounded-xl p-3 sm:p-4 flex items-center gap-3">
                  <Image
                    src={benjamins.image}
                    alt=""
                    width={48}
                    height={48}
                    className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-display text-sm sm:text-base font-bold text-foreground truncate">
                      {benjamins.name}
                    </h4>
                    <p className="text-[10px] sm:text-xs text-muted-foreground line-clamp-1">
                      {benjamins.description}
                    </p>
                  </div>
                  <span className="text-xs sm:text-sm font-semibold text-foreground whitespace-nowrap">
                    {formatPrice(benjamins.price)}
                  </span>
                </div>
              </div>
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Sub-category grid — square → circle morph on hover */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mt-6">
        {subCategories.map((cat, i) => (
          <motion.div
            key={cat.label}
            className="relative aspect-square group"
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 20 }}
            whileInView={reduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: reduce ? 0 : i * 0.08 }}
          >
            <Link href="/products" className="block w-full h-full">
              <div
                className="relative w-full h-full overflow-hidden transition-[border-radius] duration-700 ease-out"
                style={{ borderRadius: "1rem" }}
              >
                <div className="absolute inset-0 transition-[border-radius,transform] duration-700 ease-out group-hover:scale-[0.95] group-hover:rounded-full">
                  <Image
                    src={cat.image}
                    alt={cat.label}
                    fill
                    sizes="(max-width: 768px) 50vw, 25vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div
                    className="absolute inset-0"
                    style={{
                      background: "oklch(0.15 0.02 50 / 0.2)",
                    }}
                  />
                </div>
                <div className="absolute bottom-4 left-4 z-10">
                  {cat.type === "bracket" ? (
                    <span className="text-xs sm:text-sm font-medium text-primary-foreground tracking-wider">
                      [ {cat.label} ]
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-background/80 backdrop-blur-sm text-xs sm:text-sm font-medium text-foreground">
                      {cat.label} <ChevronRight className="w-3 h-3" />
                    </span>
                  )}
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
