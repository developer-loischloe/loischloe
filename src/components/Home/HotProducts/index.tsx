import appwriteProductService from "@/appwrite/appwriteProductService";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import HotProductsSlider from "./HotProductsSlider";

const HotProducts = async () => {
  const products = await appwriteProductService.getHotProducts();

  if (!products.documents.length) return null;

  return (
    <section>
      <h5 className="text-center subHeading">On Sale</h5>
      <h4 className="heading-1 text-center">Hot Products</h4>

      <div className="flex flex-col items-center gap-10">
        {/* products */}
        <HotProductsSlider products={products.documents} />
        <div>
          <Link href={"/products?p_category=makeup&c_category=face"}>
            <Button>View all</Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HotProducts;
