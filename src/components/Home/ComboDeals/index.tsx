import Link from "next/link";
import { Button } from "@/components/ui/button";
import appwriteProductService from "@/appwrite/appwriteProductService";
import ComboDealsSlider from "./ComboDealsSlider";
import { unstable_noStore as noStore } from "next/cache";

const ComboDeals = async () => {
  noStore();

  const products = await appwriteProductService.getOfferProducts();

  if (!products?.documents?.length) return null;

  return (
    <section>
      <h5 className="text-center subHeading">Ongoing Offers</h5>
      <h4 className="heading-1 text-center">Combo Deals</h4>

      <div className="flex flex-col items-center gap-10">
        {/* products */}
        <ComboDealsSlider products={products.documents} />
        <div>
          <Link href={"/combo-deals"}>
            <Button>See All Offers</Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ComboDeals;
