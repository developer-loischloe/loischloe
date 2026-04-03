import { Suspense } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { Metadata } from "next";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Description from "@/components/Products/Product/Description";
import ProductHandler from "@/components/Products/Product/ProductHandler";
import RelatedProducts from "@/components/Products/Product/RelatedProducts";
import Reviews from "@/components/Products/Product/Reviews";
import BreadCrumb from "@/components/Shared/BreadCrumb";
import ProductListLoading from "@/components/Shared/loading/ProductListLoading";
import RecentlyViewed from "@/components/Products/Product/RecentlyViewed";
import SavedViewedProduct from "@/components/Products/Product/SavedViewedProduct";
import SendGTMEvent from "@/components/GTM/SendGTMEvent";
import { globalMetaDataConstant } from "@/app/constant";
import { Button } from "@/components/ui/button";
import appwriteProductService from "@/appwrite/appwriteProductService";
import SingleProductloading from "./SingleProductloading";
import IngredientChecker from "@/components/Products/Product/IngredientChecker";
import LipTryOn from "@/components/Products/Product/LipTryOn";
import SubscribeAndSave from "@/components/Products/Product/SubscribeAndSave";

const ProductImageSlider = dynamic(
  () => import("@/components/Products/Product/ProductSlider"),
  { ssr: false }
);

const { website_url, website_name } = globalMetaDataConstant;

const DISABLED_SLUGS = [
  "buy-3-get-1-free-gift",
  "glow-combo",
  "eid-special-bundle",
];

export async function generateMetadata({
  params: { slug },
}: {
  params: { slug: string };
}): Promise<Metadata> {
  if (DISABLED_SLUGS.includes(slug)) {
    return { title: "Offer Unavailable | LOIS CHLOE" };
  }

  const products = await appwriteProductService.getProductDetails({ slug });
  const product = products?.documents[0];

  return {
    title: product?.name,
    description: product?.short_description,
    alternates: {
      canonical: `/products/${product?.slug}`,
    },
    openGraph: {
      type: "website",
      title: product?.name,
      description: product?.short_description,
      url: `${website_url}/products/${product?.slug}`,
      siteName: website_name,
      images: [
        {
          url: product?.images[0]?.image_url,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: product?.name,
      description: product?.short_description,
      site: "@loischloe",
      images: [
        {
          url: product?.images[0]?.image_url,
        },
      ],
    },
  };
}

const page = async ({ params: { slug } }: { params: { slug: string } }) => {
  if (DISABLED_SLUGS.includes(slug)) {
    return (
      <div className="flex flex-col gap-5 justify-center items-center py-[100px]">
        <h1 className="text-2xl font-semibold text-[#2D3436]">
          This offer is no longer available.
        </h1>
        <p className="text-[#636e72]">Check out our other products instead!</p>
        <Link href={"/products"}>
          <Button>See All Products</Button>
        </Link>
      </div>
    );
  }

  const key = `/products/${slug}/$${(Math.random() * 1000).toString()}`;

  return (
    <Suspense key={key} fallback={<SingleProductloading />}>
      <SingleProductDetails slug={slug} />
    </Suspense>
  );
};

export default page;

// Product Details
const SingleProductDetails = async ({ slug }: { slug: string }) => {
  const products = await appwriteProductService.getProductDetails({ slug });

  if (products?.total === 0) {
    return (
      <div className="flex flex-col gap-5 justify-center items-center py-[100px]">
        <h1 className="text-2xl">Oops! Product not found.</h1>
        <Link href={"/products"}>
          <Button>See All Products</Button>
        </Link>
      </div>
    );
  }

  const product = products?.documents[0];

  return (
    <>
      <SendGTMEvent
        params={{ event: "ViewContent", product }}
      />
      <BreadCrumb pathList={["products", product?.name]} />
      <SavedViewedProduct productId={product?.$id} />

      <section className="space-y-10 py-5 md:py-10">
        <div className="flex flex-col md:flex-row gap-10">
          {/* Product Images */}
          <div className="w-full md:max-w-[350px] lg:max-w-[500px]">
            <ProductImageSlider images={product?.images} />
          </div>

          {/* Product Details */}
          <div className="flex-1 space-y-5">
            <ProductHandler product={product} />

            {/* Subscribe & Save */}
            {product?.stock === "in-stock" && !product?.pre_order && (
              <SubscribeAndSave price={product?.sale_price} />
            )}

            {/* Lip Try-On */}
            <LipTryOn product={product} />

            {/* Ingredient Checker */}
            <IngredientChecker product={product} />
          </div>
        </div>

        {/* Product Info Tabs */}
        <Tabs
          defaultValue="description"
          className="w-full mx-auto border rounded-sm"
        >
          <TabsList className="w-full space-x-5">
            <TabsTrigger value="description">Description</TabsTrigger>
            <TabsTrigger value="reviews">
              Reviews{" "}
              {product?.reviews?.length > 0 && (
                <span className="ml-1.5 bg-brand_primary/20 text-brand_secondary text-xs font-bold px-1.5 py-0.5 rounded-full">
                  {product.reviews.length}
                </span>
              )}
            </TabsTrigger>
          </TabsList>
          <div className="p-5">
            <TabsContent value="description">
              <Description product={product} />
            </TabsContent>
            <TabsContent value="reviews">
              <Reviews product={product} />
            </TabsContent>
          </div>
        </Tabs>

        <Suspense fallback={<ProductListLoading />}>
          <RelatedProducts
            child_category={product?.child_category}
            currentProductId={product?.$id}
          />
        </Suspense>

        <RecentlyViewed currentProductId={product?.$id} />
      </section>
    </>
  );
};
