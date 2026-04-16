"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { forYouCards, getProductBySlug } from "./data";

export default function ForYouSection() {
  const [active, setActive] = useState(0);
  const reduce = useReducedMotion();
  const cards = forYouCards;

  const prev = () => setActive((a) => (a === 0 ? cards.length - 1 : a - 1));
  const next = () => setActive((a) => (a === cards.length - 1 ? 0 : a + 1));

  return (
    <section
      className="py-12 sm:py-16 md:py-20 overflow-hidden !max-w-none !px-0"
      style={{ backgroundColor: "var(--cream-dark)" }}
    >
      <motion.h2
        className="rd-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-center text-foreground mb-10 sm:mb-14"
        initial={reduce ? { opacity: 0 } : { opacity: 0, y: 30 }}
        whileInView={reduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        For You
      </motion.h2>

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6">
        <div className="relative h-[420px] sm:h-[500px] md:h-[560px]">
          {cards.map((card, i) => {
            const offset = i - active;
            const absOffset = Math.abs(offset);
            const isActive = i === active;
            if (absOffset > 2) return null;

            const product = getProductBySlug(card.productSlug);
            const Wrap = ({ children }: { children: React.ReactNode }) =>
              product ? (
                <Link
                  href={`/product/${product.slug}`}
                  className="block w-full h-full"
                >
                  {children}
                </Link>
              ) : (
                <div className="block w-full h-full">{children}</div>
              );

            return (
              <motion.div
                key={i}
                className="absolute top-0 left-1/2 w-[280px] sm:w-[380px] md:w-[480px] h-full rd-card cursor-pointer"
                style={{ zIndex: isActive ? 10 : 10 - absOffset }}
                animate={
                  reduce
                    ? {
                        x: `calc(-50% + ${offset * 120}px)`,
                        opacity: isActive ? 1 : 0.6,
                      }
                    : {
                        x: `calc(-50% + ${offset * 120}px)`,
                        scale: isActive ? 1 : 0.88 - absOffset * 0.04,
                        opacity: isActive ? 1 : 0.6,
                      }
                }
                transition={{ duration: 0.5, ease: "easeInOut" }}
                onClick={() => setActive(i)}
              >
                <Wrap>
                  <Image
                    src={card.bg}
                    alt={card.title}
                    fill
                    sizes="(max-width: 768px) 280px, 480px"
                    className="absolute inset-0 object-cover"
                  />
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(to bottom, oklch(0.15 0.02 50 / 0.3) 0%, oklch(0.15 0.02 50 / 0.2) 50%, oklch(0.15 0.02 50 / 0.6) 100%)",
                    }}
                  />
                  <div className="relative z-10 h-full flex flex-col justify-between p-4 sm:p-6 md:p-8">
                    <h3 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-white">
                      {card.title}
                    </h3>
                    <div className="flex items-end justify-between gap-4">
                      <div className="space-y-3 sm:space-y-4">
                        {card.stats.map((s, j) => (
                          <div key={j}>
                            <span className="font-display text-2xl sm:text-3xl md:text-4xl font-light text-white/90 italic">
                              {s.value}
                            </span>
                            <p className="text-[8px] sm:text-[10px] text-white/70 uppercase tracking-wider leading-tight mt-0.5 whitespace-pre-line">
                              {s.label}
                            </p>
                          </div>
                        ))}
                      </div>
                      {product && (
                        <div className="shrink-0 w-16 h-20 sm:w-20 sm:h-24 md:w-24 md:h-28 rounded-xl overflow-hidden bg-card/80 backdrop-blur-sm shadow-lg">
                          <Image
                            src={product.image}
                            alt=""
                            width={96}
                            height={112}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </Wrap>
              </motion.div>
            );
          })}
        </div>

        <div className="flex items-center justify-center gap-3 mt-6 sm:mt-8">
          <button
            type="button"
            className="w-8 h-8 rounded-full border border-foreground/20 flex items-center justify-center hover:bg-foreground/5 transition-colors"
            onClick={prev}
            aria-label="Previous"
          >
            <ChevronLeft className="w-4 h-4 text-foreground" />
          </button>
          <div className="flex items-center gap-1.5">
            {cards.map((_, i) => (
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
            aria-label="Next"
          >
            <ChevronRight className="w-4 h-4 text-foreground" />
          </button>
        </div>
      </div>
    </section>
  );
}
