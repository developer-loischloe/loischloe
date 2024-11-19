import { Button } from "@/components/ui/button";
import Link from "next/link";
import appwriteProductService from "@/appwrite/appwriteProductService";
import FeaturedProductsSlider from "./FeaturedProductsSlider";

const FeaturedProducts = async () => {
  const products = await appwriteProductService.getFeaturedProducts();

  if (!products.documents.length) return null;

  return (
    <section>
      <h5 className="text-center subHeading">Perfect For You</h5>
      <h4 className="heading-1 text-center">Featured Products</h4>

      <div className="flex flex-col items-center gap-10">
        {/* products */}
        <FeaturedProductsSlider products={products.documents} />
        <div>
          <Link href={"/products"}>
            <Button>Explore Products</Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
