import dynamic from "next/dynamic";
import { Suspense } from "react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import appwriteProductService from "@/appwrite/appwriteProductService";
import Description from "@/components/Products/Product/Description";
import ProductHandler from "@/components/Products/Product/ProductHandler";
import RelatedProducts from "@/components/Products/Product/RelatedProducts";
import Reviews from "@/components/Products/Product/Reviews";
import BreadCrumb from "@/components/Shared/BreadCrumb";
import ProductListLoading from "@/components/Shared/loading/ProductListLoading";
import RecentlyViewed from "@/components/Products/Product/RecentlyViewed";
import SavedViewedProduct from "@/components/Products/Product/SavedViewedProduct";
const ProductImageSlider = dynamic(
  () => import("@/components/Products/Product/ProductImageSlider"),
  { ssr: false }
);

const page = async ({ params: { slug } }: { params: { slug: string } }) => {
  const products = await appwriteProductService.getProductDetails(slug);

  return (
    <>
      <BreadCrumb pathList={["products", products?.documents[0]?.name]} />
      <SavedViewedProduct productId={products?.documents[0]?.$id} />
      <section className="space-y-10 py-5 md:py-10">
        <div className="flex flex-col md:flex-row gap-10">
          <ProductImageSlider images={products?.documents[0]?.images} />
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
          />
        </Suspense>
        <RecentlyViewed currentProductId={products?.documents[0]?.$id} />
      </section>
    </>
  );
};

export default page;
