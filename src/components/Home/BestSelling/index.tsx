import appwriteProductService from "@/appwrite/appwriteProductService";
import BestSellingSlider from "./BestSellingSlider";
import { unstable_noStore as noStore } from "next/cache";

const BestSelling = async () => {
  // noStore();

  const products = await appwriteProductService.getProductsByIds([
    "66093353b2f6b8fc19a5",
    "66092620ce4ec1fe55b1",
    "66092ea953c9650c164c",
    "66092bd0d811bde9b0d1",
    "660935a1b5e23e61be9b",
  ]);

  if (!products?.length) return null;

  return (
    <section>
      <h5 className="text-center subHeading">Top Picks For You</h5>
      <h4 className="heading-1 text-center">Best Selling Products</h4>

      <div>
        <BestSellingSlider products={products} />
      </div>
    </section>
  );
};

export default BestSelling;
