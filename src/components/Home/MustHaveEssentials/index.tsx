import appwriteProductService from "@/appwrite/appwriteProductService";
import OfferSet from "@/components/Home/MustHaveEssentials/OfferSet";
import LipStickSet from "./LipStickSet";
import { unstable_noStore as noStore } from "next/cache";

const MustHaveEssentials = async () => {
  // noStore();

  const { getProductsByIds } = appwriteProductService;

  const offerSetProductsPromise = getProductsByIds([
    "66092ea953c9650c164c",
    // "66092620ce4ec1fe55b1",
    "6609242905c07b4313df",
    // "66092bd0d811bde9b0d1",
    "660929eb6f5e3cc42e4a",
  ]);

  const lipstickSetProductsPromise = getProductsByIds([
    "660906177ffa1cc98562",
    "66110b62534c53ca959f",
    "66090035745143268a80",
  ]);

  const [offerSetProducts, lipstickSetProducts] = await Promise.all([
    offerSetProductsPromise,
    lipstickSetProductsPromise,
  ]);

  const offerSet = offerSetProducts?.filter(
    (product) => product?.stock === "in-stock"
  );
  const lipstickSet = lipstickSetProducts?.filter(
    (product) => product?.stock === "in-stock"
  );

  if (!offerSet.length && !lipstickSet.length) return null;

  return (
    <section>
      <h5 className="text-center subHeading">Absolute</h5>
      <h4 className="heading-1 text-center">Must-Have Essentials</h4>

      <div className="space-y-10 md:space-y-16">
        {offerSet.length && <OfferSet products={offerSet} />}
        {offerSet.length && <LipStickSet products={lipstickSet} />}
      </div>
    </section>
  );
};

export default MustHaveEssentials;
