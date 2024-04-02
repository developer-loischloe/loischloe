import appwriteProductService from "@/appwrite/appwriteProductService";
import FeaturedProductsSlider from "./FeaturedProductsSlider";

const FeaturedProducts = async () => {
  const products = await appwriteProductService.getFeaturedProducts();

  if (!products.documents.length) return null;

  return (
    <section>
      <h4 className="heading-1">Featured Products</h4>

      <div className="flex flex-col md:flex-row gap-10">
        {/* products */}
        <FeaturedProductsSlider products={products.documents} />
      </div>
    </section>
  );
};

export default FeaturedProducts;
