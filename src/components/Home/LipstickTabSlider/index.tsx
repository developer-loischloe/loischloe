import appwriteProductService from "@/appwrite/appwriteProductService";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TabSlider from "./TabSlider";
import { unstable_noStore as noStore } from "next/cache";

const TABLIST = [
  { title: "Mate", slug: "bullet" },
  { title: "Semi-Mate", slug: "semi-matte" },
  { title: "Liquid", slug: "liquid" },
];

const LipstickTabSlider = async () => {
  // noStore();

  const products = await appwriteProductService.getProductList({
    p_category: "makeup",
    c_category: "lips",
    n_category: "",
    keyword: "",
    page: "1",
    resultPerPage: "30",
  });

  if (!products?.documents?.length) return null;

  return (
    <section>
      <h5 className="text-center subHeading">26 shades</h5>
      <h4 className="heading-1 text-center">Find Your Perfect Shade</h4>

      <div>
        <Tabs defaultValue={TABLIST[0].slug} className="mx-auto">
          <TabsList className="mx-auto w-full !bg-transparent gap-5 mb-5">
            {TABLIST.map((item) => (
              <TabsTrigger
                key={item.slug}
                value={item.slug}
                className="data-[state=active]:bg-brand_primary data-[state=active]:text-foreground border border-brand_primary"
              >
                {item.title}
              </TabsTrigger>
            ))}
          </TabsList>

          {TABLIST.map((item) => (
            <TabsContent key={item.slug} value={item.slug}>
              <TabSlider
                products={products?.documents?.filter(
                  (product) => product?.nested_child_category === item.slug
                )}
              />
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
};

export default LipstickTabSlider;
