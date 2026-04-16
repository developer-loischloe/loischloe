"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight, ArrowUpRight } from "lucide-react";
import { getFeatured, formatPrice } from "./data";

const slides = getFeatured();

export default function HeroBanner() {
  const [active, setActive] = useState(0);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce || slides.length <= 1) return;
    const t = setInterval(
      () => setActive((a) => (a + 1) % slides.length),
      6000,
    );
    return () => clearInterval(t);
  }, [reduce]);

  const slide = slides[active];
  const prev = () => setActive((a) => (a === 0 ? slides.length - 1 : a - 1));
  const next = () => setActive((a) => (a + 1) % slides.length);

  if (!slide) return null;

  return (
    <section
      className="relative w-full min-h-[85vh] overflow-hidden bg-background !max-w-none !p-0"
      aria-roledescription="carousel"
      aria-label="Featured collections"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-stretch min-h-[85vh]">
        <div className="relative z-10 flex flex-col justify-center py-12 md:py-20 md:w-1/2 md:pr-8">
          <motion.div
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 40 }}
            animate={reduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="flex flex-wrap gap-2 mb-6 sm:mb-8">
              {["MORNING CARE", "SKIN CARE", "NATURE PRODUCT"].map((tag) => (
                <span key={tag} className="rd-pill">
                  {tag}
                </span>
              ))}
            </div>
            <h1 className="rd-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-foreground mb-4 sm:mb-6">
              Glow Naturally with Ecococo Morning Sun
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-8 sm:mb-10 max-w-md">
              Start your day with a burst of radiance! Our Vitamin C-infused
              formula nourishes and revitalizes your skin, leaving it
              hydrated, protected, and naturally glowing from morning to night.
            </p>

            <AnimatePresence mode="wait">
              <motion.div
                key={slide.id}
                initial={reduce ? { opacity: 0 } : { opacity: 0, y: 20 }}
                animate={reduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
                exit={reduce ? { opacity: 0 } : { opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
              >
                <Link
                  href={`/product/${slide.slug}`}
                  className="bg-card rounded-2xl p-4 max-w-sm shadow-sm block hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="min-w-0">
                      <p className="rd-eyebrow">
                        {slide.compareAt
                          ? `LIMITED TIME – ${Math.round((1 - slide.price / slide.compareAt) * 100)}%`
                          : slide.brand.toUpperCase()}
                      </p>
                      <h3 className="font-display text-xl sm:text-2xl font-bold text-foreground mt-0.5 truncate">
                        {slide.name}
                      </h3>
                      <p className="text-xs font-semibold text-foreground mt-1">
                        {formatPrice(slide.price)}
                        {slide.compareAt && (
                          <span className="ml-2 text-muted-foreground line-through font-normal">
                            {formatPrice(slide.compareAt)}
                          </span>
                        )}
                      </p>
                    </div>
                    <span className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-foreground flex items-center justify-center shrink-0">
                      <ArrowUpRight className="w-4 h-4 text-background" />
                    </span>
                  </div>
                  <div className="rounded-xl overflow-hidden aspect-[16/10] bg-secondary">
                    <Image
                      src={slide.image}
                      alt={slide.name}
                      width={400}
                      height={250}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </Link>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>

        <div className="relative md:w-1/2 min-h-[300px] md:min-h-0">
          <motion.div
            initial={reduce ? { scale: 1 } : { scale: 1.05 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="absolute inset-0"
          >
            <Image
              src="/redesign/hero-banner.jpg"
              alt="Beauty models with glowing skin"
              fill
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover object-top"
            />
          </motion.div>
        </div>
      </div>

      {slides.length > 1 && (
        <div
          className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-3"
          role="group"
          aria-label="Slide controls"
        >
          <button
            type="button"
            className="w-8 h-8 rounded-full border border-foreground/20 flex items-center justify-center hover:bg-foreground/5 transition-colors"
            onClick={prev}
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-4 h-4 text-foreground" />
          </button>
          <div className="flex items-center gap-1.5">
            {slides.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setActive(i)}
                aria-label={`Go to slide ${i + 1}`}
                aria-current={i === active}
                className={`h-1 rounded-full transition-all duration-300 ${i === active ? "w-6 bg-foreground" : "w-1.5 bg-foreground/30"}`}
              />
            ))}
          </div>
          <button
            type="button"
            className="w-8 h-8 rounded-full border border-foreground/20 flex items-center justify-center hover:bg-foreground/5 transition-colors"
            onClick={next}
            aria-label="Next slide"
          >
            <ChevronRight className="w-4 h-4 text-foreground" />
          </button>
        </div>
      )}
    </section>
  );
}
