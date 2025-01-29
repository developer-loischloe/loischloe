import appwriteProductService from "@/appwrite/appwriteProductService";
import PreBookingSlider from "./PreBookingSlider";
import { unstable_noStore as noStore } from "next/cache";

const PreBooking = async () => {
  noStore();

  const { getPreOrderProducts } = appwriteProductService;

  const { documents: products } = await getPreOrderProducts();
  if (!products?.length) return null;

  return (
    <section>
      <h5 className="text-center subHeading">Hurry</h5>
      <h4 className="heading-1 text-center">Pre-Orders Are Filling Fast!</h4>

      <div className="flex flex-col items-center gap-10">
        <PreBookingSlider products={products} />
      </div>
    </section>
  );
};

export default PreBooking;
