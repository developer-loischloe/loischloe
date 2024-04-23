import { Suspense } from "react";
import OfferSet from "@/components/Home/MustHaveEssentials/OfferSet";
import LipStickSet from "./LipStickSet";

const MustHaveEssentials = () => {
  return (
    <section>
      <h5 className="text-center subHeading">Absolute</h5>
      <h4 className="heading-1 text-center">Must-Have Essentials</h4>

      <div className="space-y-10 md:space-y-16">
        <Suspense>
          <OfferSet />
        </Suspense>
        <Suspense>
          <LipStickSet />
        </Suspense>
      </div>
    </section>
  );
};

export default MustHaveEssentials;
