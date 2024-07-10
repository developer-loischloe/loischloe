import appwriteProductService from "@/appwrite/appwriteProductService";
import OfferSet from "@/components/Home/MustHaveEssentials/OfferSet";
import LipStickSet from "./LipStickSet";

const MustHaveEssentials = async () => {
  const { getProductsByIds } = appwriteProductService;

  const offerSetProductsPromise = getProductsByIds([
    "66092ea953c9650c164c",
    "66092620ce4ec1fe55b1",
    "66092bd0d811bde9b0d1",
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

  return (
    <section>
      <h5 className="text-center subHeading">Absolute</h5>
      <h4 className="heading-1 text-center">Must-Have Essentials</h4>

      <div className="space-y-10 md:space-y-16">
        <OfferSet
          products={offerSetProducts.filter(
            (product) => product?.stock === "in-stock"
          )}
        />
        <LipStickSet
          products={lipstickSetProducts.filter(
            (product) => product?.stock === "in-stock"
          )}
        />
      </div>
    </section>
  );
};

export default MustHaveEssentials;
