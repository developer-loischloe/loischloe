"use client";

import { useState, useEffect } from "react";
import { formatCurrency } from "@/lib/utils";
import { Rating as ReactRating, Star } from "@smastrom/react-rating";
import dynamic from "next/dynamic";
import PreOrderButton from "../PreOrderButton";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ExternalLink, Leaf, Heart, Truck, BadgeCheck } from "lucide-react";
import ShadeSelector, {
  DEFAULT_SHADES,
  Shade,
} from "@/components/Shared/ShadeSelector";
import { trackViewContent } from "@/lib/meta-pixel";

const CartHandler = dynamic(() => import("./CartHandler/CartHandler"));

const myStyles = {
  itemShapes: Star,
  activeFillColor: "#ffb700",
  inactiveFillColor: "#727272",
};

const FOUNDATION_LINK = "/products/lois-chloe-uv-waterful-cushion-foundation-spf-50";

const FOUNDATION_SHADES: Shade[] = [
  {
    name: "Shade 3.0",
    hex: "#d5a87f",
    desc: "Medium-deep warm tone",
    link: FOUNDATION_LINK,
  },
];

const FOUNDATION_SHADES_ALL: { shade: Shade; disabled: boolean }[] = [
  {
    shade: { name: "Shade 1.5", hex: "#dab598", desc: "Light-medium tone", link: FOUNDATION_LINK },
    disabled: true,
  },
  {
    shade: { name: "Shade 3.0", hex: "#d5a87f", desc: "Medium-deep warm tone", link: FOUNDATION_LINK },
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

  // Fire ViewContent event for Meta Pixel
  useEffect(() => {
    if (product?.$id) {
      trackViewContent({
        content_ids: [product.$id],
        content_name: product.name,
        content_type: "product",
        currency: "BDT",
        value: product.sale_price || product.price,
      });
    }
  }, [product?.$id]);

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
          <span>Coming Soon \u2013 Pre-Order Now!</span>
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

      {/* Foundation Shade Selector \u2014 Glam On The Go only */}
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
          <div className="flex items-center gap-2 mt-1 flex-wrap">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: selectedFoundation.hex }}
            />
            <p className="text-sm text-[#2D3436]">
              <span className="font-semibold">Selected:</span>{" "}
              {selectedFoundation.name}
              <span className="text-[#636e72] ml-1">\u2014 {selectedFoundation.desc}</span>
            </p>
            {selectedFoundation.link && (
              <Link
                href={selectedFoundation.link}
                target="_blank"
                className="inline-flex items-center gap-1 text-xs text-brand_secondary hover:underline ml-1"
              >
                <ExternalLink size={12} />
                View Product
              </Link>
            )}
          </div>
        </div>
      )}

      {/* Lipstick Shade Selector \u2014 both combos */}
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

      {/* Trust Badges */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
        <div className="flex items-center gap-2 bg-[#fdf8f3] border border-brand_primary/30 rounded-lg px-3 py-2">
          <Leaf size={18} className="text-brand_secondary shrink-0" />
          <span className="text-xs font-medium text-brand_secondary leading-tight">100% Vegan</span>
        </div>
        <div className="flex items-center gap-2 bg-[#fdf8f3] border border-brand_primary/30 rounded-lg px-3 py-2">
          <Heart size={18} className="text-brand_secondary shrink-0" />
          <span className="text-xs font-medium text-brand_secondary leading-tight">Cruelty-Free</span>
        </div>
        <div className="flex items-center gap-2 bg-[#fdf8f3] border border-brand_primary/30 rounded-lg px-3 py-2">
          <BadgeCheck size={18} className="text-brand_secondary shrink-0" />
          <span className="text-xs font-medium text-brand_secondary leading-tight">Cash on Delivery</span>
        </div>
        <div className="flex items-center gap-2 bg-[#fdf8f3] border border-brand_primary/30 rounded-lg px-3 py-2">
          <Truck size={18} className="text-brand_secondary shrink-0" />
          <span className="text-xs font-medium text-brand_secondary leading-tight">Made for BD Skin</span>
        </div>
      </div>

      {/* Sticky Mobile Add-to-Cart Bar */}
      {!product?.pre_order && product?.stock === "in-stock" && (
        <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-gray-200 shadow-[0_-4px_12px_rgba(0,0,0,0.08)] px-4 py-3 flex items-center gap-3">
          <div className="flex-1 min-w-0">
            <p className="text-xs text-brand_gray truncate">{product?.name}</p>
            <div className="flex items-baseline gap-2">
              <span className="text-base font-semibold text-brand_secondary">
                {formatCurrency(product?.sale_price)}
              </span>
              {product?.price > product?.sale_price && (
                <del className="text-xs text-brand_gray">
                  {formatCurrency(product?.price)}
                </del>
              )}
            </div>
          </div>
          <div className="shrink-0">
            <CartHandler product={productWithShade} />
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductHandler;
