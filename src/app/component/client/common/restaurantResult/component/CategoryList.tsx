import { categoryNames, groupedCategories } from "@/src/app/dummy/dummy";
import { FindStore } from "@/src/app/types/models/find";

interface CategoryListProps {
    restaurants: FindStore[];
    setFilteredRestaurants: (restaurants: FindStore[]) => void;
    filteredRestaurants: FindStore[];
}

type CategoryKey = keyof typeof groupedCategories;

const CategoryList: React.FC<CategoryListProps> = ({
                                                       restaurants,
                                                       setFilteredRestaurants,
                                                       filteredRestaurants
                                                   }) => {
    const handleCategoryClick = (categoryKey: CategoryKey) => {
        const categoryIds = groupedCategories[categoryKey];
        const categoryExists = filteredRestaurants.some(restaurant =>
            categoryIds.includes(restaurant.categoryId)
        );

        if (categoryExists) {
            const filtered = filteredRestaurants.filter(restaurant =>
                !categoryIds.includes(restaurant.categoryId)
            );
            setFilteredRestaurants(filtered);
        } else {
            const categoryRestaurants = restaurants.filter(restaurant =>
                categoryIds.includes(restaurant.categoryId)
            );
            setFilteredRestaurants([...filteredRestaurants, ...categoryRestaurants]);
        }
    };

    return (
        <div className="w-full overflow-x-auto pb-2">
            <div className="flex gap-4 px-4">
                {Object.entries(groupedCategories).map(([categoryKey, ids]) => {
                    const hasRestaurants = restaurants.some(r => ids.includes(r.categoryId));
                    if (!hasRestaurants) return null;
                    const isExcluded = !filteredRestaurants.some(r =>
                        ids.includes(r.categoryId)
                    );

                    return (
                        <div
                            key={categoryKey}
                            className={`flex flex-col items-center flex-shrink-0 cursor-pointer ${isExcluded ? 'opacity-40' : 'opacity-100'}`}
                            onClick={() => handleCategoryClick(categoryKey as CategoryKey)}
                        >
                            <div className={`w-16 h-16 rounded-3xl overflow-hidden flex items-center justify-center p-2 bg-bg-1 border-line-3 border`}>
                                <img
                                    src={`/images/food/food-swipe/${categoryKey}`}
                                    alt={categoryNames[categoryKey as CategoryKey]}
                                    className="w-full h-full object-contain"
                                    width={12}
                                    height={12}
                                />
                            </div>
                            <span className={`mt-2 text-sm text-center font-medium ${isExcluded ? 'opacity-40' : ''}`}>
                                {categoryNames[categoryKey as CategoryKey]}
                            </span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default CategoryList;