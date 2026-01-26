import React from "react";
import {
  categoryNames,
  groupedCategories,
  restaurantCategoryNames,
} from "@/src/dummy/dummy";
import { FindStore } from "@/src/types/models/find";

type CategoryKey = keyof typeof groupedCategories;

interface CategoryListProps {
  restaurants: FindStore[];
  setFilteredRestaurants: (restaurants: FindStore[]) => void;
  filteredRestaurants: FindStore[];
  excludedCategories: Set<CategoryKey>;
  setExcludedCategories: React.Dispatch<React.SetStateAction<Set<CategoryKey>>>;
}

const CategoryList: React.FC<CategoryListProps> = ({
                                                     restaurants,
                                                     setFilteredRestaurants,
                                                     filteredRestaurants,
                                                     excludedCategories,
                                                     setExcludedCategories,
                                                   }) => {
  const handleCategoryClick = (categoryKey: CategoryKey) => {
    const categoryIds = groupedCategories[categoryKey];
    const isCurrentlyExcluded = excludedCategories.has(categoryKey);

    if (isCurrentlyExcluded) {
      // 제외 해제: excludedCategories에서 제거하고 해당 카테고리 식당 추가
      const newExcluded = new Set(excludedCategories);
      newExcluded.delete(categoryKey);
      setExcludedCategories(newExcluded);

      const categoryRestaurants = restaurants.filter((restaurant) =>
        categoryIds.includes(restaurant.categoryId),
      );
      setFilteredRestaurants([...filteredRestaurants, ...categoryRestaurants]);
    } else {
      // 제외: excludedCategories에 추가하고 해당 카테고리 식당 제거
      const newExcluded = new Set(excludedCategories);
      newExcluded.add(categoryKey);
      setExcludedCategories(newExcluded);

      const filtered = filteredRestaurants.filter(
        (restaurant) => !categoryIds.includes(restaurant.categoryId),
      );
      setFilteredRestaurants(filtered);
    }
  };

  return (
    <div className="w-full overflow-x-auto pb-2">
      <div className="flex gap-4 px-4">
        {Object.entries(groupedCategories).map(([categoryKey, ids]) => {
          const hasRestaurants = restaurants.some((r) =>
            ids.includes(r.categoryId),
          );

          if (!hasRestaurants) return null;

          const isExcluded = excludedCategories.has(categoryKey as CategoryKey);

          return (
            <div
              key={categoryKey}
              className={`flex flex-col items-center flex-shrink-0 cursor-pointer ${isExcluded ? "opacity-40" : "opacity-100"}`}
              onClick={() => handleCategoryClick(categoryKey as CategoryKey)}
            >
              <div
                className={`w-16 h-16 rounded-3xl overflow-hidden flex items-center justify-center p-2 bg-bg-1 border-line-3 border`}
              >
                <img
                  src={`/images/food/food-swipe/${categoryKey}`}
                  alt={categoryNames[categoryKey as CategoryKey]}
                  className="w-full h-full object-contain"
                  width={12}
                  height={12}
                />
              </div>
              <span
                className={`mt-2 text-sm text-center font-medium ${isExcluded ? "opacity-40" : ""}`}
              >
                {restaurantCategoryNames[categoryKey as CategoryKey]}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CategoryList;