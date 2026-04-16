"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, User, ShoppingCart, X } from "lucide-react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useSelector } from "react-redux";
import type { RootState } from "@/redux/store";
import { categories } from "./data";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const reduce = useReducedMotion();

  // Hook into the existing Redux cart for live count (no state rewiring).
  const cartList = useSelector((state: RootState) => state.cart.cartList) as
    | { quantity?: number }[]
    | undefined;
  const count =
    cartList?.reduce((n, i) => n + (Number(i?.quantity) || 1), 0) ?? 0;

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setIsOpen(false);
    }
    if (isOpen) {
      document.addEventListener("keydown", onKey);
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.removeEventListener("keydown", onKey);
        document.body.style.overflow = prev;
      };
    }
  }, [isOpen]);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-14 sm:h-16">
          <Link
            href="/"
            className="font-display text-lg sm:text-xl font-bold tracking-tight text-foreground"
          >
            olivia shop
          </Link>
          <button
            type="button"
            className="absolute left-1/2 -translate-x-1/2 p-2"
            onClick={() => setIsOpen((v) => !v)}
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
            aria-controls="category-overlay"
          >
            <div className="flex flex-col gap-[5px]">
              <span className="block w-6 h-[1.5px] bg-foreground" />
              <span className="block w-6 h-[1.5px] bg-foreground" />
            </div>
          </button>
          <div className="flex items-center gap-3 sm:gap-4">
            <button type="button" aria-label="Search" className="p-1">
              <Search
                className="w-[18px] h-[18px] sm:w-5 sm:h-5 text-foreground"
                strokeWidth={1.5}
              />
            </button>
            <button type="button" aria-label="Account" className="p-1">
              <User
                className="w-[18px] h-[18px] sm:w-5 sm:h-5 text-foreground"
                strokeWidth={1.5}
              />
            </button>
            <Link
              href="/cart"
              aria-label={`Cart (${count} items)`}
              className="relative p-1"
            >
              <ShoppingCart
                className="w-[18px] h-[18px] sm:w-5 sm:h-5 text-foreground"
                strokeWidth={1.5}
              />
              {count > 0 && (
                <span className="absolute -top-1 -right-1 min-w-[16px] h-4 px-1 rounded-full bg-foreground text-background text-[10px] font-semibold flex items-center justify-center">
                  {count > 99 ? "99+" : count}
                </span>
              )}
            </Link>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="category-overlay"
            role="dialog"
            aria-modal="true"
            aria-label="Categories menu"
            className="fixed inset-0 z-[60] bg-background overflow-y-auto"
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: -20 }}
            animate={reduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: -20 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
          >
            <div className="flex justify-center pt-6 sm:pt-8">
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                aria-label="Close menu"
              >
                <X
                  className="w-6 h-6 sm:w-7 sm:h-7 text-foreground"
                  strokeWidth={1.5}
                />
              </button>
            </div>
            <div className="max-w-4xl mx-auto px-6 pt-8 sm:pt-16 pb-16">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6">
                {categories.map((cat, i) => (
                  <motion.div
                    key={cat.label}
                    initial={reduce ? { opacity: 0 } : { opacity: 0, y: 20 }}
                    animate={reduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.35,
                      delay: reduce ? 0 : i * 0.05,
                    }}
                  >
                    <Link
                      href={`/products?p_category=${cat.slug}`}
                      onClick={() => setIsOpen(false)}
                      className="flex flex-col items-center gap-3 group"
                      aria-label={`Browse ${cat.label}`}
                    >
                      <div className="w-full aspect-square rounded-2xl sm:rounded-3xl overflow-hidden bg-muted">
                        <Image
                          src={cat.image}
                          alt=""
                          width={640}
                          height={640}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          sizes="(max-width: 640px) 50vw, 33vw"
                        />
                      </div>
                      <span className="text-xs sm:text-sm font-semibold tracking-wider text-foreground uppercase">
                        {cat.label}
                      </span>
                    </Link>
                  </motion.div>
                ))}
              </div>
              <div className="flex justify-center mt-10">
                <Link
                  href="/products"
                  onClick={() => setIsOpen(false)}
                  className="rd-btn-outline"
                >
                  View all products
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
