import { SearchParams } from "@/app/(pages)/products/(products)/page";
import appwriteCategoryService from "@/appwrite/appwriteCategoryService";
import { cn, generateParams } from "@/lib/utils";
import Link from "next/link";

const Categories = async ({
  p_category,
  c_category,
  n_category,
}: SearchParams) => {
  const categories = await appwriteCategoryService.getCategoryList();

  return (
    <div className="min-w-[250px] bg-brand_secondary px-5 py-10">
      <ul className="w-full">
        <li>
          <Link
            href={`/products`}
            className={cn(
              "text-white px-2 py-1 rounded-full text-sm flex items-center justify-between gap-10 hover:text-brand_primary transition-all cursor-pointer ",
              !n_category && !c_category && !p_category && "text-brand_primary"
            )}
          >
            <span>All Items</span>
          </Link>
        </li>

        {/* Parent Categories */}
        {categories &&
          categories?.documents?.map((parentCategory: any) => {
            const p_active = parentCategory.slug === p_category;

            return (
              <div key={parentCategory.$id}>
                <li>
                  <Link
                    href={`/products?${generateParams({
                      p_category: parentCategory.slug,
                    })}`}
                    className={cn(
                      "text-white px-2 py-1 rounded-full text-sm flex items-center justify-between gap-10 hover:text-brand_primary transition-all cursor-pointer ",
                      p_active && "text-brand_primary"
                    )}
                  >
                    <span>{parentCategory.name}</span>
                  </Link>
                </li>

                {/* Child Categories */}
                {
                  <ul className="w-full pl-5">
                    {parentCategory &&
                      parentCategory?.childCategories?.map(
                        (childCategory: any) => {
                          const c_active = childCategory.slug === c_category;

                          return (
                            <div key={childCategory.$id}>
                              <li>
                                <Link
                                  href={`/products?${generateParams({
                                    p_category: parentCategory.slug,
                                    c_category: childCategory.slug,
                                  })}`}
                                  className={cn(
                                    "text-white px-2 py-1 rounded-full text-sm flex items-center justify-between gap-10 hover:text-brand_primary transition-all cursor-pointer ",
                                    c_active && "text-brand_primary"
                                  )}
                                >
                                  <span>{childCategory.name}</span>
                                </Link>
                              </li>

                              {/* Nested Child Categories */}
                              {
                                <ul className="w-full pl-5">
                                  {childCategory &&
                                    childCategory?.nestedChildCategories?.map(
                                      (nestedChildCategory: any) => {
                                        const n_active =
                                          nestedChildCategory.slug ===
                                          n_category;
                                        return (
                                          <div key={nestedChildCategory.$id}>
                                            <li>
                                              <Link
                                                href={`/products?${generateParams(
                                                  {
                                                    p_category:
                                                      parentCategory.slug,
                                                    c_category:
                                                      childCategory.slug,
                                                    n_category:
                                                      nestedChildCategory.slug,
                                                  }
                                                )}`}
                                                className={cn(
                                                  "text-white px-2 py-1 rounded-full text-sm flex items-center justify-between gap-3 hover:text-brand_primary transition-all cursor-pointer ",
                                                  n_active &&
                                                    "text-brand_primary"
                                                )}
                                              >
                                                <span>
                                                  {nestedChildCategory.name}
                                                </span>
                                              </Link>
                                            </li>
                                          </div>
                                        );
                                      }
                                    )}
                                </ul>
                              }
                            </div>
                          );
                        }
                      )}
                  </ul>
                }
              </div>
            );
          })}
      </ul>
    </div>
  );
};

export default Categories;
