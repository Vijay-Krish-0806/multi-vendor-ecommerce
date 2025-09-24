"use client";

import { CategoryDropDown } from "./category-dropdown";
import { CustomCategory } from "../types";
import { useEffect, useRef, useState } from "react";

interface CategoriesProps {
  data: CustomCategory[];
}
export const Categories = ({ data }: CategoriesProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const measureRef = useRef<HTMLDivElement>(null);
  const viewAllRef = useRef<HTMLDivElement>(null);
  const [visibleCount, setVisibleCount] = useState(data.length);
  const [isAnyHovered, setIsAnyHovered] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const activeCategory = "all";

  const activeCategoryIndex = data.findIndex(
    (cat) => cat.slug === activeCategory
  );

  const isActiveCategoryHidden =
    activeCategoryIndex >= visibleCount && activeCategoryIndex != -1; 

  useEffect(() => {
    if(!containerRef.current || !measureRef.current || !viewAllRef.current) return;
    
  }, []);

  return (
    <div className="relative w-full">
      <div className="flex items-center flex-nowrap">
        {data.map((category) => (
          <div key={category.id}>
            <CategoryDropDown
              category={category}
              isActive={activeCategory === category.slug}
              isNavigationHovered={false}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
