"use client";
import { SearchParams } from "@/app/(pages)/products/(products)/page";
import appwriteCategoryService from "@/appwrite/appwriteCategoryService";
import { cn, generateParams } from "@/lib/utils";
import Link from "next/link";

const Categories = async ({ category, keyword, page }: SearchParams) => {
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
              category === "" && "text-brand_primary"
            )}
          >
            <span>All Items</span>
          </Link>
        </li>

        {/* Parent Categories */}
        {categories &&
          categories?.documents?.map((P_category: any) => {
            const p_active = category === P_category.slug;

            return (
              <div key={P_category.$id}>
                <li>
                  <Link
                    href={`/products?${generateParams({
                      category: P_category.slug,
                    })}`}
                    className={cn(
                      "text-white px-2 py-1 rounded-full text-sm flex items-center justify-between gap-10 hover:text-brand_primary transition-all cursor-pointer ",
                      p_active && "text-brand_primary"
                    )}
                  >
                    <span>{P_category.name}</span>
                    {/* <span>{category?.products?.length}</span> */}
                  </Link>
                </li>

                {/* Child Categories */}
                {
                  <ul className="w-full pl-5">
                    {P_category &&
                      P_category?.childCategories?.map((childCategory: any) => {
                        const c_active = category === childCategory.slug;

                        return (
                          <div key={childCategory.$id}>
                            <li>
                              <Link
                                href={`/products?${generateParams({
                                  category: childCategory.slug,
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
                            {
                              <ul className="w-full pl-5">
                                {childCategory &&
                                  childCategory?.nestedChildCategories?.map(
                                    (nestedChildCategory: any) => {
                                      const n_active = category;
                                      return (
                                        <div key={nestedChildCategory.$id}>
                                          <li>
                                            <Link
                                              href={`/products?${generateParams(
                                                {
                                                  category:
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
                            }
                          </div>
                        );
                      })}
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
