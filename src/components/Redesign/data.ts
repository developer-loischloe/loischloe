/**
 * Local placeholder data for the redesign.
 *
 * Identical to the animated-banners reference. Real Appwrite products
 * will be wired in a follow-up commit via the existing
 * src/appwrite/appwriteProductService.ts — until then, the UI renders
 * exactly the design source at localhost:8080.
 */

export type Category =
  | "skincare"
  | "parfums"
  | "makeup"
  | "bodycare"
  | "medical"
  | "mens";

export type Product = {
  id: string;
  slug: string;
  name: string;
  brand: string;
  description: string;
  longDescription: string;
  price: number;
  compareAt?: number;
  image: string;
  category: Category;
  tags: string[];
  rating: number;
  reviewCount: number;
  inStock: boolean;
  bestseller?: boolean;
  popular?: boolean;
  featured?: boolean;
};

export const products: Product[] = [
  {
    id: "p-skin-recovery-gel",
    slug: "skin-recovery-gel",
    name: "Skin Recovery Gel",
    brand: "olivia",
    description: "Collaboration with Charlap Hyman & Herrero",
    longDescription:
      "A restorative gel to calm irritation, reduce redness, and replenish the skin's moisture barrier.",
    price: 48,
    image: "/redesign/product-1.jpg",
    category: "skincare",
    tags: ["MORNING CARE", "HYDRATION"],
    rating: 4.7,
    reviewCount: 218,
    inStock: true,
    bestseller: true,
  },
  {
    id: "p-daily-skincare-gel",
    slug: "daily-skincare-gel",
    name: "Daily Skincare Gel",
    brand: "olivia",
    description: "A daily routine for oily, blemish-prone skin",
    longDescription:
      "Balances oil with salicylic acid and niacinamide. Clears pores without over-drying.",
    price: 62,
    image: "/redesign/product-2.jpg",
    category: "skincare",
    tags: ["DAILY", "OILY SKIN"],
    rating: 4.6,
    reviewCount: 412,
    inStock: true,
    bestseller: true,
  },
  {
    id: "p-centella-cream",
    slug: "cream-with-centella-asiatica",
    name: "Cream with Centella Asiatica",
    brand: "olivia",
    description: "A natural formula to help calm and soothe the skin",
    longDescription:
      "Plant-powered cream with Centella Asiatica extract. Fragrance-free, dermatologist-tested.",
    price: 55,
    image: "/redesign/product-3.jpg",
    category: "skincare",
    tags: ["SENSITIVE", "NATURAL"],
    rating: 4.8,
    reviewCount: 176,
    inStock: true,
    bestseller: true,
  },
  {
    id: "p-squalane-serum",
    slug: "100-squalane-serum",
    name: "100% Squalane Serum — Lab 1004",
    brand: "olivia",
    description: "Concentrated in active ingredients to nourish dry skin",
    longDescription:
      "Pure plant-derived squalane that mimics the skin's natural oils. Non-comedogenic.",
    price: 39,
    image: "/redesign/product-4.jpg",
    category: "skincare",
    tags: ["DRY SKIN", "SERUM"],
    rating: 4.9,
    reviewCount: 532,
    inStock: true,
    bestseller: true,
  },
  {
    id: "p-morning-care",
    slug: "morning-care-vitamin-c",
    name: "Morning Care",
    brand: "ecococo",
    description: "Vitamin C radiance boost",
    longDescription:
      "Vitamin C-infused formula that nourishes and revitalizes for all-day glow.",
    price: 42,
    compareAt: 60,
    image: "/redesign/product-1.jpg",
    category: "skincare",
    tags: ["MORNING CARE", "VITAMIN C", "LIMITED"],
    rating: 4.8,
    reviewCount: 89,
    inStock: true,
    featured: true,
  },
  {
    id: "p-gentleman-givenchy",
    slug: "gentleman-eau-de-parfum",
    name: "Gentleman",
    brand: "Givenchy",
    description: "The latest addition to the collection",
    longDescription:
      "A sophisticated eau de parfum with rich leather and iris notes.",
    price: 130,
    image: "/redesign/featured-1.jpg",
    category: "parfums",
    tags: ["FRAGRANCE", "MENS"],
    rating: 4.5,
    reviewCount: 94,
    inStock: true,
    featured: true,
  },
  {
    id: "p-les-benjamins",
    slug: "les-benjamins-oriental",
    name: "Les Benjamins",
    brand: "Les Benjamins",
    description: "Notes of lychee, sweet amber",
    longDescription:
      "An oriental fragrance journey. Lychee opens to sweet amber.",
    price: 130,
    image: "/redesign/featured-3.jpg",
    category: "parfums",
    tags: ["FRAGRANCE", "ORIENTAL"],
    rating: 4.4,
    reviewCount: 61,
    inStock: true,
    featured: true,
  },
  {
    id: "p-popular-1",
    slug: "glow-elixir",
    name: "Glow Elixir",
    brand: "olivia",
    description: "Radiance-boosting facial oil blend",
    longDescription: "Lightweight oil serum with rosehip and bakuchiol.",
    price: 72,
    image: "/redesign/popular-1.jpg",
    category: "parfums",
    tags: ["SERUM", "GLOW"],
    rating: 4.7,
    reviewCount: 128,
    inStock: true,
    popular: true,
  },
  {
    id: "p-popular-2",
    slug: "velvet-balm",
    name: "Velvet Balm",
    brand: "olivia",
    description: "Ultra-rich restorative night balm",
    longDescription: "Overnight balm that melts into skin for deep nourishment.",
    price: 68,
    image: "/redesign/popular-2.jpg",
    category: "parfums",
    tags: ["NIGHT", "BALM"],
    rating: 4.6,
    reviewCount: 87,
    inStock: true,
    popular: true,
  },
  {
    id: "p-popular-3",
    slug: "silk-lip-tint",
    name: "Silk Lip Tint",
    brand: "olivia",
    description: "Hydrating buildable color",
    longDescription: "Buildable lip tint with squalane and vitamin E.",
    price: 28,
    image: "/redesign/popular-3.jpg",
    category: "parfums",
    tags: ["LIPS", "COLOR"],
    rating: 4.8,
    reviewCount: 214,
    inStock: true,
    popular: true,
  },
  {
    id: "p-popular-4",
    slug: "lash-volume-mascara",
    name: "Lash Volume Mascara",
    brand: "olivia",
    description: "Clump-free buildable volume",
    longDescription: "Weightless mascara for lifted, fuller lashes.",
    price: 32,
    image: "/redesign/popular-4.jpg",
    category: "parfums",
    tags: ["LASHES", "MAKEUP"],
    rating: 4.5,
    reviewCount: 302,
    inStock: true,
    popular: true,
  },
];

export const getBestsellers = () => products.filter((p) => p.bestseller);
export const getPopular = () => products.filter((p) => p.popular);
export const getFeatured = () => products.filter((p) => p.featured);
export const getProductBySlug = (slug: string) =>
  products.find((p) => p.slug === slug);
export const formatPrice = (price: number) => `$${price.toFixed(2)}`;

export type CategoryEntry = {
  slug: Category;
  label: string;
  image: string;
};

export const categories: CategoryEntry[] = [
  { slug: "parfums", label: "PARFUMS", image: "/redesign/cat-parfums.jpg" },
  { slug: "skincare", label: "SKINCARE", image: "/redesign/cat-skincare.jpg" },
  { slug: "medical", label: "MEDICAL COSMETIC", image: "/redesign/cat-medical.jpg" },
  { slug: "makeup", label: "MAKEUP", image: "/redesign/cat-makeup.jpg" },
  { slug: "mens", label: "MEN'S CARE", image: "/redesign/cat-mens.jpg" },
  { slug: "bodycare", label: "BODY CARE", image: "/redesign/cat-bodycare.jpg" },
];

export type SubCategoryEntry = {
  label: string;
  image: string;
  type: "pill" | "bracket";
};

export const subCategories: SubCategoryEntry[] = [
  { label: "PARFUMS", image: "/redesign/cat-parfums-sub.jpg", type: "pill" },
  { label: "FOR BODY", image: "/redesign/cat-forbody.jpg", type: "pill" },
  { label: "CATALOG", image: "/redesign/cat-catalog.jpg", type: "bracket" },
  { label: "FOR FACE", image: "/redesign/cat-forface.jpg", type: "pill" },
];

export type ForYouCard = {
  title: string;
  bg: string;
  productSlug: string;
  stats: { value: string; label: string }[];
};

export const forYouCards: ForYouCard[] = [
  {
    title: "FACE OIL",
    bg: "/redesign/foryou-1.jpg",
    productSlug: "skin-recovery-gel",
    stats: [
      { value: "96%", label: "NOTICED DEEPLY NOURISHED\nAND HYDRATED SKIN" },
      { value: "90%", label: "FELT A MORE RADIANT\nAND GLOWING COMPLEXION" },
      { value: "92%", label: "SAW REDUCED FINE LINES\nAND IMPROVED TEXTURE" },
    ],
  },
  {
    title: "ROWSE",
    bg: "/redesign/foryou-2.jpg",
    productSlug: "daily-skincare-gel",
    stats: [
      { value: "96%", label: "SAW MORE LIFTED\nSKIN IN JUST 1 WEEK" },
      { value: "100%", label: "SAW MORE SCULPTED FACIAL\nFEATURES IN 1 WEEK" },
      { value: "92%", label: "SAW IMMEDIATE IMPROVEMENT\nOF FINE LINES AND WRINKLES" },
    ],
  },
  {
    title: "LUXURY LIPSTICK",
    bg: "/redesign/foryou-3.jpg",
    productSlug: "silk-lip-tint",
    stats: [
      { value: "96%", label: "NOTICED FULLER AND MORE\nDEFINED LIPS" },
      { value: "91%", label: "FELT DEEP HYDRATION\nAND SMOOTH TEXTURE" },
      { value: "97%", label: "SAW LONG-LASTING VIBRANT\nCOLOR ALL DAY" },
    ],
  },
  {
    title: "VOLUME MASCARA",
    bg: "/redesign/foryou-4.jpg",
    productSlug: "lash-volume-mascara",
    stats: [
      { value: "96%", label: "SAW INSTANTLY LONGER\nAND FULLER LASHES" },
      { value: "100%", label: "NOTICED A CLUMP-FREE, LIFTED\nEFFECT ALL DAY" },
      { value: "92%", label: "EXPERIENCED SMUDGE-PROOF,\nALL-DAY WEAR" },
    ],
  },
];
