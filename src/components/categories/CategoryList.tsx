"use client";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { cn, generateParams } from "@/lib/utils";

const CategoryList = ({ categories }: { categories: any }) => {
  const router = useRouter();
  const params = useSearchParams();

  const category = params.get("category");

  return (
    <div className="bg-brand_secondary px-5 py-10">
      <ul className="min-w-[180px]">
        <li
          className={cn(
            "text-white px-2 py-1 rounded-full text-sm flex items-center gap-3 hover:text-brand_primary transition-all cursor-pointer"
            // currentCategory === "" && "text-brand_primary"
          )}
          onClick={() => {
            // setCurrentCategory("");
            router.push(`/products`);
          }}
        >
          <span>All Items</span>
        </li>
        {categories &&
          categories?.documents?.map((category: any) => {
            // const active = currentCategory === category.slug;

            return (
              <div>
                <li
                  key={category.$id}
                  className={cn(
                    "text-white px-2 py-1 rounded-full text-sm flex items-center gap-3 hover:text-brand_primary transition-all cursor-pointer"
                    // active && "text-brand_primary"
                  )}
                  onClick={() => {
                    // setCurrentCategory(category.slug);
                    router.push(
                      `/products?${generateParams({
                        p_cat: category.slug,
                        c_cat: "",
                        n_cat: "",
                      })}`
                    );
                  }}
                >
                  <span>{category.name}</span>
                </li>

                <ul className="min-w-[180px] ml-5">
                  {category &&
                    category?.childCategories?.map((childCategory: any) => {
                      // const active = currentCategory === category.slug;

                      return (
                        <div>
                          <li
                            key={childCategory.$id}
                            className={cn(
                              "text-white px-2 py-1 rounded-full text-sm flex items-center gap-3 hover:text-brand_primary transition-all cursor-pointer"
                              // active && "text-brand_primary"
                            )}
                            onClick={() => {
                              // setCurrentCategory(category.slug);
                              router.push(
                                `/products?${generateParams({
                                  p_cat: category.slug,
                                  c_cat: childCategory.slug,
                                  n_cat: "",
                                })}`
                              );
                            }}
                          >
                            <span>{childCategory.name}</span>
                          </li>

                          <ul className="min-w-[180px] ml-5">
                            {childCategory &&
                              childCategory?.nestedChildCategories?.map(
                                (nestedChildCategory: any) => {
                                  // const active = currentCategory === category.slug;

                                  return (
                                    <div>
                                      <li
                                        key={nestedChildCategory.$id}
                                        className={cn(
                                          "text-white px-2 py-1 rounded-full text-sm flex items-center gap-3 hover:text-brand_primary transition-all cursor-pointer"
                                          // active && "text-brand_primary"
                                        )}
                                        onClick={() => {
                                          // setCurrentCategory(category.slug);
                                          router.push(
                                            `/products?${generateParams({
                                              p_cat: category.slug,
                                              c_cat: childCategory.slug,
                                              n_cat: nestedChildCategory.slug,
                                            })}`
                                          );
                                        }}
                                      >
                                        <span>{nestedChildCategory.name}</span>
                                      </li>
                                    </div>
                                  );
                                }
                              )}
                          </ul>
                        </div>
                      );
                    })}
                </ul>
              </div>
            );
          })}
      </ul>
    </div>
  );
};

export default CategoryList;
