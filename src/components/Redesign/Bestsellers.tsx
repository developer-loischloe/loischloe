"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { Plus } from "lucide-react";
import { getBestsellers, formatPrice } from "./data";

export default function Bestsellers() {
  const products = getBestsellers();
  const reduce = useReducedMotion();

  return (
    <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 max-w-7xl mx-auto">
      <motion.h2
        className="rd-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-center text-foreground mb-10 sm:mb-14 md:mb-16"
        initial={reduce ? { opacity: 0 } : { opacity: 0, y: 30 }}
        whileInView={reduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        Bestsellers
      </motion.h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
        {products.map((p, i) => (
          <motion.div
            key={p.id}
            className="group"
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 30 }}
            whileInView={reduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: reduce ? 0 : i * 0.1 }}
          >
            <Link
              href={`/product/${p.slug}`}
              className="relative aspect-[4/5] bg-secondary rd-card mb-4 block"
            >
              <Image
                src={p.image}
                alt={p.name}
                fill
                sizes="(max-width: 640px) 100vw, 50vw"
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2">
                <span className="rd-btn-dark">
                  ADD TO BAG <Plus className="w-4 h-4" />
                </span>
              </div>
            </Link>
            <div className="text-center">
              <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-foreground">
                {p.name}
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                {p.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
