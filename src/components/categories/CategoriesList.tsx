import { Category } from "@/Types/Types";
import { cn, formatCategory } from "@/lib/utils";
import React, { SetStateAction } from "react";

interface CategoriesListProps {
  categories: Category[];
  currentCategory: string;
  setCurrentCategory: React.Dispatch<SetStateAction<string>>;
}

const CategoriesList = ({
  categories,
  currentCategory,
  setCurrentCategory,
}: CategoriesListProps) => {
  return (
    <div className="bg-brand_secondary px-5 py-10">
      <ul className="space-y-3 min-w-[200px]">
        <li
          className={cn(
            "text-white px-5 py-2 rounded-full text-sm flex items-center gap-3 hover:bg-brand_primary transition-all cursor-pointer",
            currentCategory === "" && "bg-brand_primary"
          )}
          onClick={() => setCurrentCategory("")}
        >
          <p
            className={cn(
              "w-2 h-2 bg-white rounded-full transition-all",
              currentCategory === "" ? "visible" : "invisible"
            )}
          />
          <span>All Items</span>
        </li>
        {categories.map((category) => {
          const active = currentCategory === formatCategory(category.name);

          return (
            <li
              key={category.id}
              className={cn(
                "text-white px-5 py-2 rounded-full text-sm flex items-center gap-3 hover:bg-brand_primary transition-all cursor-pointer",
                active && "bg-brand_primary"
              )}
              onClick={() => setCurrentCategory(formatCategory(category.name))}
            >
              <p
                className={cn(
                  "w-2 h-2 bg-white rounded-full transition-all",
                  active ? "visible" : "invisible"
                )}
              />

              <span>{category.name}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default CategoriesList;
