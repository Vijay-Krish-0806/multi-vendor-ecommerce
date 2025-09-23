import { Category } from "@/payload-types";
import { CategoryDropDown } from "./category-dropdown";

interface CategoriesProps {
  data: any;
}
export const Categories = ({ data }: CategoriesProps) => {
  return (
    <div className="relative w-full">
      <div className="flex items-center flex-nowrap">
      {data.map((category: Category) => (
        <div key={category.id}>
          <CategoryDropDown
            category={category}
            isActive={false}
            isNavigationHovered={false}
          />
        </div>
      ))}
      </div>
    </div>
  );
};
