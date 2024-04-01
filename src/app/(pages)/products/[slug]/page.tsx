import appwriteProductService from "@/appwrite/appwriteProductService";
import Description from "@/components/Products/Product/Description";
import ProductHandler from "@/components/Products/Product/ProductHandler";
import RelatedProducts from "@/components/Products/Product/RelatedProducts";
import Reviews from "@/components/Products/Product/Reviews";
import BreadCrumb from "@/components/Shared/BreadCrumb";
import ProductListLoading from "@/components/Shared/loading/ProductListLoading";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import dynamic from "next/dynamic";
import { Suspense } from "react";
const ProductImageSlider = dynamic(
  () => import("@/components/Products/Product/ProductImageSlider"),
  { ssr: false }
);

const page = async ({ params: { slug } }: { params: { slug: string } }) => {
  const products = await appwriteProductService.getProductDetails(slug);

  const c_cat = products?.documents[0]?.childCategories;
  const p_cat = products?.documents[0]?.categories;

  let categories = [];
  if (c_cat.length) {
    categories = c_cat?.map((category: any) => category.slug);
  } else {
    categories = p_cat?.map((category: any) => category.slug);
  }

  console.log(categories);

  return (
    <>
      <BreadCrumb pathList={["products", products?.documents[0]?.name]} />
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
          <RelatedProducts categories={categories} />
        </Suspense>
      </section>
    </>
  );
};

export default page;
