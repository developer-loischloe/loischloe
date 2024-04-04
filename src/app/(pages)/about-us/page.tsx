"use client";
import appwriteCategoryService from "@/appwrite/appwriteCategoryService";
import { databases } from "@/appwrite/appwriteConfig";
import { Button } from "@/components/ui/button";
import config from "@/config";
import React from "react";

const page = async () => {
  const handleClick = async () => {
    const response = await databases.updateDocument(
      config.appwriteDatabaseId,
      config.appwriteCollectionId.product,
      "660e6311cf219172e64a",
      {
        images: [
          "660e60ac889943d27b72",
          "660e5a383ce39c1e941e",
          "660e5a5c3d88d473107a",
          "660e5a77b920ecd81382",
          "660e5aeb1bad3b1c4527",
          "660e5ab7d217a760f801",
          "660e5a999b2befc79efe",
          "660e5b05e021a33faba9",
        ],
      }
    );

    console.log(response);
  };

  return (
    <section>
      <Button onClick={handleClick}>update</Button>
      <h1>FIND OUT MORE ABOUT LOIS CHLOE</h1>
      <p>
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

      <Button>SEE JOURNAL TO KNOW MORE</Button>

      <p>
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
