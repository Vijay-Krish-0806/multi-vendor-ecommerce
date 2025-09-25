import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

import { ScrollArea } from "@/components/ui/scroll-area";

import { CustomCategory } from "../types";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  data: CustomCategory[];
}

const CategoriesSidebar = ({ open, onOpenChange, data }: Props) => {
  const [parentCategories, setParentCategies] = useState<
    CustomCategory[] | null
  >(null);
  const [selectedCategory, setSelectedCategory] =
    useState<CustomCategory | null>(null);

  const router = useRouter();

  //if we have parentCategories show those otherwise show root categories
  const currentCategories = parentCategories ?? data ?? [];

  const handleOpenChange = (open: boolean) => {
    setSelectedCategory(null);
    setParentCategies(null);
    onOpenChange(open);
  };
  const handleCategoryClick = (category: CustomCategory) => {
    if (category.subcategories && category.subcategories.length > 0) {
      setParentCategies(category.subcategories as CustomCategory[]);
      setSelectedCategory(category);
    } else {
      //this is leaf category (no subcategory)
      if (parentCategories && selectedCategory) {
        //this is a subcategory -navigate to /category/subcat
        router.push(`/${selectedCategory.slug}/${category.slug}`);
      } else {
        //this is a main category
        if (category.slug === "all") {
          router.push("/");
        } else {
          router.push(`/${category.slug}`);
        }
      }
      handleOpenChange(false);
    }
  };

  const handleBackClick = () => {
    if (parentCategories) {
      setParentCategies(null);
      setSelectedCategory(null);
    }
  };

  const backgroundColor = selectedCategory?.color || "white";
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="left"
        className="p-0 transition-none"
        style={{ backgroundColor }}
      >
        <SheetHeader className="p-4 border-b">
          <SheetTitle>Categories</SheetTitle>
        </SheetHeader>
        <ScrollArea>
          {parentCategories && (
            <button
              className="w-full text-left p-4 hover:bg-black hover:text-white flex items-center text-base font-medium"
              onClick={handleBackClick}
            >
              <ChevronLeft className="size-4 mr-2" /> Back
            </button>
          )}
          {currentCategories.map((category) => (
            <button
              className="w-full text-left p-4 hover:bg-black hover:text-white flex justify-between items-center text-base font-medium cursor-pointer"
              key={category.slug}
              onClick={() => handleCategoryClick(category)}
            >
              {category.name}
              {category.subcategories && category.subcategories.length > 0 && (
                <ChevronRight className="size-4" />
              )}
            </button>
          ))}
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
};

export default CategoriesSidebar;
