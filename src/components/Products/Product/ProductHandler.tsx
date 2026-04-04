"use client";

import { useState } from "react";
import { formatCurrency } from "@/lib/utils";
import { Rating as ReactRating, Star } from "@smastrom/react-rating";
import dynamic from "next/dynamic";
import PreOrderButton from "../PreOrderButton";
import { Button } from "@/components/ui/button";
import ShadeSelector, {
  DEFAULT_SHADES,
  Shade,
} from "@/components/Shared/ShadeSelector";

const CartHandler = dynamic(() => import("./CartHandler/CartHandler"));

const myStyles = {
  itemShapes: Star,
  activeFillColor: "#ffb700",
  inactiveFillColor: "#727272",
};

const FOUNDATION_SHADES: Shade[] = [
  {
    name: "Shade 3.0",
    hex: "#C68642",
    desc: "Medium-deep warm tone",
  },
];

const FOUNDATION_SHADES_ALL: { shade: Shade; disabled: boolean }[] = [
  {
    shade: { name: "Shade 1.5", hex: "#F0D5B8", desc: "Light-medium tone" },
    disabled: true,
  },
  {
    shade: { name: "Shade 3.0", hex: "#C68642", desc: "Medium-deep warm tone" },
    disabled: false,
  },
];

const ProductHandler = ({ product }: any) => {
  const isGlam = product?.slug === "glam-on-the-go";
  const isHydra = product?.slug === "hydra-lip-duo";
  const isCombo = isGlam || isHydra;

  const [selectedLipstick, setSelectedLipstick] = useState<Shade>(
    DEFAULT_SHADES[0]
  );
  const [selectedFoundation, setSelectedFoundation] = useState<Shade>(
    FOUNDATION_SHADES[0]
  );

  // Build shade string for order
  const getShadeInfo = () => {
    if (isGlam) {
      return `Foundation: ${selectedFoundation.name}, Lipstick: ${selectedLipstick.name}`;
    }
    if (isHydra) {
      return `Lipstick: ${selectedLipstick.name}`;
    }
    return undefined;
  };

  const productWithShade = isCombo
    ? { ...product, selectedShade: getShadeInfo() }
    : product;

  return (
    <div className="flex-1 space-y-5">
      {/* Badge */}
      <div className="bg-brand_primary px-5 py-1 max-w-max text-sm">
        {product?.pre_order ? (
          <span>Coming Soon – Pre-Order Now!</span>
        ) : (
          <span className="">
            {product?.stock.split("-").join(" ").toUpperCase()}
          </span>
        )}
      </div>

      {/* Title & Rating */}
      <div>
        <h1 className="text-3xl">{product?.name}</h1>
        <ReactRating
          style={{ maxWidth: 100 }}
          value={product?.avg_rating || 0}
          itemStyles={myStyles}
          readOnly
        />
      </div>

      {/* Description */}
      <div>
        <div
          dangerouslySetInnerHTML={{ __html: product?.short_description }}
          className="product_description_container"
        />
      </div>

      <hr />

      {/* Foundation Shade Selector — Glam On The Go only */}
      {isGlam && (
        <div className="bg-[#fafafa] rounded-xl p-4 border border-[#f0f0f0] space-y-3">
          <p className="text-sm font-medium text-[#2D3436] tracking-wide uppercase">
            Choose Foundation Shade
          </p>
          <div className="flex items-center gap-4">
            {FOUNDATION_SHADES_ALL.map(({ shade, disabled }) => (
              <button
                key={shade.name}
                disabled={disabled}
                onClick={() => !disabled && setSelectedFoundation(shade)}
                className={`flex flex-col items-center gap-2 min-w-[70px] p-2 rounded-lg transition-all ${
                  disabled
                    ? "opacity-40 cursor-not-allowed"
                    : "cursor-pointer"
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-full shadow-md transition-all ${
                    !disabled && selectedFoundation.name === shade.name
                      ? "ring-2 ring-offset-2 ring-[#2D3436] scale-110"
                      : ""
                  }`}
                  style={{ backgroundColor: shade.hex }}
                />
                <span className="text-xs text-center leading-tight">
                  {shade.name}
                  {disabled && (
                    <span className="block text-[10px] text-red-400">
                      Unavailable
                    </span>
                  )}
                </span>
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2 mt-1">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: selectedFoundation.hex }}
            />
            <p className="text-sm text-[#2D3436]">
              <span className="font-semibold">Selected:</span>{" "}
              {selectedFoundation.name}
            </p>
          </div>
        </div>
      )}

      {/* Lipstick Shade Selector — both combos */}
      {isCombo && (
        <div className="bg-[#fafafa] rounded-xl p-4 border border-[#f0f0f0]">
          <ShadeSelector
            shades={DEFAULT_SHADES}
            selectedShade={selectedLipstick}
            onSelect={setSelectedLipstick}
          />
        </div>
      )}

      {/* Price */}
      <div className="space-x-5 ">
        <ins className="text-2xl no-underline">
          <span className="">{formatCurrency(product?.sale_price)}</span>
        </ins>
        {product?.price > product?.sale_price && (
          <del className="text-lg text-brand_gray">
            {formatCurrency(product?.price)}
          </del>
        )}
      </div>

      {/* Action Handler */}
      <div>
        {product?.pre_order ? (
          <PreOrderButton product={product} className="!max-w-max px-10" />
        ) : product?.stock === "in-stock" ? (
          <CartHandler product={productWithShade} />
        ) : (
          <Button disabled className="!max-w-max px-10">
            Out Of Stock
          </Button>
        )}
      </div>
    </div>
  );
};

export default ProductHandler;
