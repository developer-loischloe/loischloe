// "use client";
import { SearchParams } from "@/app/(pages)/products/(products)/page";
import appwriteCategoryService from "@/appwrite/appwriteCategoryService";
import { cn, generateParams } from "@/lib/utils";
import Link from "next/link";

const Categories = async ({
  p_cat,
  c_cat,
  n_cat,
  keyword,
  page,
}: SearchParams) => {
  const categories = await appwriteCategoryService.getCategoryList();

  console.log(categories);

  return (
    <div className="min-w-[250px] bg-brand_secondary px-5 py-10">
      <ul className="w-full">
        <li>
          <Link
            href={`/products`}
            className={cn(
              "text-white px-2 py-1 rounded-full text-sm flex items-center justify-between gap-10 hover:text-brand_primary transition-all cursor-pointer ",
              p_cat === "" && "text-brand_primary"
            )}
          >
            <span>All Items</span>
          </Link>
        </li>

        {/* Parent Categories */}
        {categories &&
          categories?.documents?.map((category: any) => {
            const p_active = p_cat === category.slug;

            return (
              <div key={category.$id}>
                <li>
                  <Link
                    href={`/products?${generateParams({
                      p_cat: category.slug,
                      c_cat: "",
                      n_cat: "",
                    })}`}
                    className={cn(
                      "text-white px-2 py-1 rounded-full text-sm flex items-center justify-between gap-10 hover:text-brand_primary transition-all cursor-pointer ",
                      p_active && "text-brand_primary"
                    )}
                  >
                    <span>{category.name}</span>
                    {/* <span>{category?.products?.length}</span> */}
                  </Link>
                </li>

                {/* Child Categories */}
                {p_active && (
                  <ul className="w-full pl-5">
                    {category &&
                      category?.childCategories?.map((childCategory: any) => {
                        const c_active = c_cat === childCategory.slug;

                        return (
                          <div key={childCategory.$id}>
                            <li>
                              <Link
                                href={`/products?${generateParams({
                                  p_cat: category.slug,
                                  c_cat: childCategory.slug,
                                  n_cat: "",
                                })}`}
                                className={cn(
                                  "text-white px-2 py-1 rounded-full text-sm flex items-center justify-between gap-10 hover:text-brand_primary transition-all cursor-pointer ",
                                  c_active && "text-brand_primary"
                                )}
                              >
                                <span>{childCategory.name}</span>
                                {/* <span>{childCategory?.products?.length}</span> */}
                              </Link>
                            </li>

                            {/* Nested Child Categories */}
                            {c_active && (
                              <ul className="w-full pl-5">
                                {childCategory &&
                                  childCategory?.nestedChildCategories?.map(
                                    (nestedChildCategory: any) => {
                                      const n_active =
                                        n_cat === nestedChildCategory.slug;

                                      return (
                                        <div key={nestedChildCategory.$id}>
                                          <li>
                                            <Link
                                              href={`/products?${generateParams(
                                                {
                                                  p_cat: category.slug,
                                                  c_cat: childCategory.slug,
                                                  n_cat:
                                                    nestedChildCategory.slug,
                                                }
                                              )}`}
                                              className={cn(
                                                "text-white px-2 py-1 rounded-full text-sm flex items-center justify-between gap-3 hover:text-brand_primary transition-all cursor-pointer ",
                                                n_active && "text-brand_primary"
                                              )}
                                            >
                                              <span>
                                                {nestedChildCategory.name}
                                              </span>
                                              {/* <span>
                                                {
                                                  nestedChildCategory?.products
                                                    ?.length
                                                }
                                              </span> */}
                                            </Link>
                                          </li>
                                        </div>
                                      );
                                    }
                                  )}
                              </ul>
                            )}
                          </div>
                        );
                      })}
                  </ul>
                )}
              </div>
            );
          })}
      </ul>
    </div>
  );
};

export default Categories;
