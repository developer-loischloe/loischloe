import React, { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import Banner from "@/assets/about/About_Cover-1.webp";
import appwriteProductService from "@/appwrite/appwriteProductService";
import ProductCard from "@/components/Products/ProductCard";
import { Button } from "@/components/ui/button";
import { unstable_noStore as noStore } from "next/cache";

import ProductListLoading from "@/components/Shared/loading/ProductListLoading";

// Metadata
export const metadata: Metadata = {
  title: "Pre-Book Products",
};

const page = () => {
  return (
    <>
      {/* Banner */}
      <div className="relative min-h-[250px] md:min-h-[300px]">
        <Image
          src={Banner}
          alt="Banner"
          priority
          className="absolute inset-0 w-full h-full"
        />
        <div className="w-full h-full z-50 absolute inset-0 flex flex-col justify-center items-center gap-3 bg-black/50 px-5">
          <h1 className="text-white text-3xl font-bold text-center">
            LOISCHLOE Pre-Booking Collection
          </h1>
          <p className="text-gray-200 text-lg text-center">
            Pre-Order Now to Be Among the First!"
          </p>
          <Link href={"#collection"} className="mt-2 md:mt-5">
            <Button>View Collection</Button>
          </Link>
        </div>
      </div>

      {/* Products */}
      <section>
        <Suspense
          fallback={<ProductListLoading />}
          key={Math.random() * 1000 + 50}
        >
          <PreOrderProducts />
        </Suspense>
      </section>
    </>
  );
};

export default page;

const PreOrderProducts = async () => {
  noStore();

  const { getPreOrderProducts } = appwriteProductService;

  const { documents: products, total } = await getPreOrderProducts();

  if (total === 0) {
    return (
      <div className="min-h-[25vh] flex flex-col justify-center items-center">
        <h1 className="text-center text-xl md:text-2xl font-semibold">
          Pre-booking is currently unavailable – Stay tuned for updates!
        </h1>
      </div>
    );
  }

  return (
    <>
      {/* Pre-Booking Products */}
      <div id="collection">
        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products?.map((product: any) => (
            <ProductCard product={product} key={product?.$id} />
          ))}
        </div>
      </div>
    </>
  );
};
