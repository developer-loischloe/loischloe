"use client";

import React, { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ExternalLink } from "lucide-react";

export interface Shade {
  name: string;
  hex: string;
  desc: string;
  link?: string;
}

export const DEFAULT_SHADES: Shade[] = [
  {
    name: "Sizzling Brown",
    hex: "#8B4513",
    desc: "Warm, earthy brown for a natural bold look",
    link: "/products/lois-chloe-sizzling-brown-matte-lipstick",
  },
  {
    name: "Rose Chloé",
    hex: "#C4727F",
    desc: "Elegant rosy pink with a timeless appeal",
    link: "/products/lois-chloe-rose-chloe-bullet-semi-matte-lipstick",
  },
  {
    name: "Nude Blush",
    hex: "#DEB5A0",
    desc: "Soft nude pink for everyday elegance",
    link: "/products/lois-chloe-nude-blush-bullet-matte-lipstick",
  },
];

interface ShadeSelectorProps {
  shades?: Shade[];
  selectedShade?: Shade | null;
  onSelect?: (shade: Shade) => void;
}

const ShadeSelector: React.FC<ShadeSelectorProps> = ({
  shades = DEFAULT_SHADES,
  selectedShade: controlledSelected,
  onSelect,
}) => {
  const [internalSelected, setInternalSelected] = useState<Shade>(shades[0]);
  const selected = controlledSelected !== undefined ? controlledSelected : internalSelected;

  const handleSelect = useCallback(
    (shade: Shade) => {
      setInternalSelected(shade);
      onSelect?.(shade);
    },
    [onSelect]
  );

  return (
    <div className="w-full">
      <p className="text-sm font-medium text-[#2D3436] mb-3 tracking-wide uppercase">
        Choose Your Shade
      </p>
      <div
        className="flex items-center gap-5 overflow-x-auto pb-2"
        role="radiogroup"
        aria-label="Lipstick shade selector"
      >
        {shades.map((shade) => {
          const isSelected = selected?.name === shade.name;
          return (
            <button
              key={shade.name}
              role="radio"
              aria-checked={isSelected}
              aria-label={`${shade.name}: ${shade.desc}`}
              tabIndex={0}
              onClick={() => handleSelect(shade)}
              className="flex flex-col items-center gap-2 min-w-[60px] group outline-none focus-visible:ring-2 focus-visible:ring-[#E84393] focus-visible:ring-offset-2 rounded-lg p-1 transition-all"
            >
              <motion.div
                className="relative"
                whileHover={{ y: -3 }}
                transition={{ duration: 0.2 }}
              >
                <motion.div
                  className="w-10 h-10 rounded-full cursor-pointer shadow-md"
                  style={{ backgroundColor: shade.hex }}
                  animate={{
                    scale: isSelected ? 1.15 : 1,
                    boxShadow: isSelected
                      ? `0 0 0 3px white, 0 0 0 5px ${shade.hex}`
                      : "0 2px 8px rgba(0,0,0,0.15)",
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                />
              </motion.div>
              <span
                className={`text-xs text-center leading-tight transition-colors duration-300 ${
                  isSelected
                    ? "text-[#2D3436] font-semibold"
                    : "text-[#636e72] font-medium group-hover:text-[#2D3436]"
                }`}
              >
                {shade.name}
              </span>
            </button>
          );
        })}
      </div>
      <AnimatePresence mode="wait">
        {selected && (
          <motion.div
            key={selected.name}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.25 }}
            className="mt-3 flex items-center gap-2 flex-wrap"
          >
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: selected.hex }}
            />
            <p className="text-sm text-[#2D3436]">
              <span className="font-semibold">Selected:</span>{" "}
              <span>{selected.name}</span>
              <span className="text-[#636e72] ml-1">— {selected.desc}</span>
            </p>
            {selected.link && (
              <Link
                href={selected.link}
                target="_blank"
                className="inline-flex items-center gap-1 text-xs text-brand_secondary hover:underline ml-1"
              >
                <ExternalLink size={12} />
                View Product
              </Link>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ShadeSelector;
