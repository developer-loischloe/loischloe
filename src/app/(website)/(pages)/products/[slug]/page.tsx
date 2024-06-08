import { Suspense } from "react";
import dynamic from "next/dynamic";

import appwriteProductService from "@/appwrite/appwriteProductService";

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
const ProductImageSlider = dynamic(
  () => import("@/components/Products/Product/ProductSlider"),
  { ssr: false }
);

// export async function generateStaticParams() {
//   const products = await appwriteProductService.getProductList({
//     p_category: "",
//     c_category: "",
//     n_category: "",
//     keyword: "",
//     page: "1",
//     resultPerPage: "1000",
//   });

//   return products.documents.map((product: any) => ({
//     slug: product.slug,
//   }));
// }

const page = async ({ params: { slug } }: { params: { slug: string } }) => {
  const products = await appwriteProductService.getProductDetails(slug);

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

export default page;
