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
const ProductImageSlider = dynamic(
  () => import("@/components/Products/Product/ProductSlider"),
  { ssr: false }
);

const { website_url, website_name } = globalMetaDataConstant;

export async function generateMetadata({
  params: { slug },
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const products = await appwriteProductService.getProductDetails({ slug });
  const product = products?.documents[0];

  return {
    title: product?.name,
    description: product?.short_description,
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
      site: `${website_url}/products/${product?.slug}`,
      images: [
        {
          url: product?.images[0]?.image_url,
        },
      ],
    },
  };
}

const page = async ({ params: { slug } }: { params: { slug: string } }) => {
  const key = `/products/${slug}/$${(Math.random() * 1000).toString()}`;

  return (
    <Suspense key={key} fallback={<SingleProductloading />}>
      <SingleProductDetails slug={slug} />;
    </Suspense>
  );
};

export default page;

// Product Details
const SingleProductDetails = async ({ slug }: { slug: string }) => {
  const products = await appwriteProductService.getProductDetails({ slug });

  // console.log(products?.documents?.[0]?.images[0]);
  // console.log(products?.documents?.[0]?.$id);

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

  return (
    <>
      <SendGTMEvent
        params={{ event: "ViewContent", product: products.documents[0] }}
      />
      <BreadCrumb pathList={["products", products?.documents[0]?.name]} />
      <SavedViewedProduct productId={products?.documents[0]?.$id} />
      <section className="space-y-10 py-5 md:py-10">
        <div className="flex flex-col md:flex-row gap-10">
          <div className="w-full md:max-w-[350px] lg:max-w-[500px]">
            <ProductImageSlider images={products?.documents[0]?.images} />
          </div>
          <ProductHandler product={products?.documents[0]} />
        </div>

        <Tabs
          defaultValue="description"
          className="w-full mx-auto border rounded-sm"
        >
          <TabsList className="w-full  space-x-5">
            <TabsTrigger value="description">Description</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
          </TabsList>
          <div className="p-5">
            <TabsContent value="description">
              <Description product={products?.documents[0]} />
            </TabsContent>
            <TabsContent value="reviews">
              <Reviews product={products?.documents[0]} />
            </TabsContent>
          </div>
        </Tabs>

        <Suspense fallback={<ProductListLoading />}>
          <RelatedProducts
            child_category={products?.documents[0]?.child_category}
            currentProductId={products?.documents[0]?.$id}
          />
        </Suspense>
        <RecentlyViewed currentProductId={products?.documents[0]?.$id} />
      </section>
    </>
  );
};
