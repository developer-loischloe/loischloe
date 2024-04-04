import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Banner from "@/assets/about/About_Cover-1.webp";

const page = () => {
  return (
    <section className="space-y-10">
      <Image src={Banner} alt="Banner" />
      <h1 className="heading-1 text-center">FIND OUT MORE ABOUT LOIS CHLOE</h1>
      <p className="text-brand_gray">
        LOIS CHLOE, the cruelty-free luxury beauty brand. We presents a complete
        range of highly advanced beauty products with clinically-proven efficacy
        and safety: in two categories: makeup and skincare. We believe that the
        beauty is not luxurious imagination. The journey to true beauty starts
        from a place deep within. So for that LOISCHLOE combines the highest
        standard of pure, natural, active ingredients with leading Australia’s
        clinical research for proven and sustainable results in skin. We care
        deeply about the health of people’s skin. We’re inspired by nature and
        the powerful ingredients it produces.
      </p>
      <div className="flex justify-center">
        <Link
          href={
            "https://cloud.appwrite.io/v1/storage/buckets/65feab130c0a4167d13d/files/65feab2a82c165428300/view?project=65ed75e73895ca457661&mode=admin"
          }
        >
          <Button className="hover:text-brand_secondary">
            SEE JOURNAL TO KNOW MORE
          </Button>
        </Link>
      </div>

      <p className="text-brand_gray">
        LOIS CHLOE has set itself the mission of offering all women and men
        worldwide a wide range of luxuries quality of products with colors,
        textures, efficacy and safety based on their expectations that will
        allow them to represent their style in the best manner. We will be
        responsible for giving them the confidence to express themselves.
      </p>
    </section>
  );
};

export default page;
