"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { getPopular, formatPrice, type Category } from "./data";

type FilterOption = { label: string; category: Category | "all" };

const filters: FilterOption[] = [
  { label: "PARFUMS", category: "parfums" },
  { label: "SKIN CARE", category: "skincare" },
  { label: "MEDICAL COSMETIC", category: "medical" },
];

export default function PopularProducts() {
  const [active, setActive] = useState<Category | "all">(filters[0].category);
  const reduce = useReducedMotion();

  const popular = useMemo(() => {
    const all = getPopular();
    return active === "all" ? all : all.filter((p) => p.category === active);
  }, [active]);

  // If the filter yields nothing, fall back to all popular items so the section
  // never renders empty on first paint (design reference matches this shape).
  const list = popular.length ? popular : getPopular();

  return (
    <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 max-w-7xl mx-auto">
      <motion.h2
        className="rd-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-center text-foreground mb-4 sm:mb-6"
        initial={reduce ? { opacity: 0 } : { opacity: 0, y: 30 }}
        whileInView={reduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        Discover the Popular Products
      </motion.h2>

      <div
        className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-10 sm:mb-14"
        role="tablist"
      >
        {filters.map((f) => {
          const isActive = active === f.category;
          return (
            <button
              key={f.label}
              type="button"
              onClick={() => setActive(f.category)}
              role="tab"
              aria-selected={isActive}
              className={`px-4 sm:px-5 py-2 sm:py-2.5 text-[10px] sm:text-xs font-semibold rounded-full transition-colors uppercase tracking-wider ${
                isActive
                  ? "bg-foreground text-background"
                  : "bg-[color-mix(in_oklch,var(--cream-dark)_60%,transparent)] text-foreground hover:bg-foreground hover:text-background"
              }`}
            >
              {f.label}
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-5">
        {list.slice(0, 4).map((p, i) => (
          <motion.div
            key={p.id}
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 30 }}
            whileInView={reduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: reduce ? 0 : i * 0.1 }}
          >
            <Link
              href={`/product/${p.slug}`}
              className="group block relative aspect-[2/3] overflow-hidden bg-secondary"
              style={{ borderRadius: "999px 999px 40% 40%" }}
            >
              <Image
                src={p.image}
                alt={p.name}
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
              />
              {/* Hover description reveal — matches animation reference frame 3 */}
              <div
                className="absolute inset-0 flex flex-col justify-center items-center text-center px-6 opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500"
                style={{
                  background: "oklch(0.25 0.03 60 / 0.78)",
                  color: "oklch(0.97 0.01 80)",
                }}
              >
                <h3 className="font-display text-lg sm:text-2xl font-bold mb-2 leading-tight">
                  {p.name}
                </h3>
                <p className="text-[10px] sm:text-xs leading-relaxed opacity-90 line-clamp-4">
                  {p.longDescription}
                </p>
                <span className="text-xs sm:text-sm font-semibold mt-3">
                  {formatPrice(p.price)}
                </span>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
