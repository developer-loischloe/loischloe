import React from "react";
import { Button } from "../../ui/button";
import Link from "next/link";

const LoisChloeMagazine = () => {
  return (
    <section className="bg-brand_secondary">
      <div className="flex flex-col md:flex-row gap-10 items-center justify-around">
        <h4 className="text-brand_primary text-2xl">LOIS CHLOE Magazine</h4>

        <Link
          href={
            "https://cloud.appwrite.io/v1/storage/buckets/65feab130c0a4167d13d/files/65feab2a82c165428300/view?project=65ed75e73895ca457661&mode=admin"
          }
        >
          <Button
            variant="outline"
            className="text-brand_primary bg-inherit border-brand_primary hover:bg-inherit hover:text-white"
          >
            Learn more in details
          </Button>
        </Link>
      </div>
    </section>
  );
};

export default LoisChloeMagazine;
