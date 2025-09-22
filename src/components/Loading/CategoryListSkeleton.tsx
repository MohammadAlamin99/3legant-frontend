import { SlidersHorizontal } from "lucide-react";

export default function CategoryListSkeleton() {
  return (
    <div className="w-full">
      {/* Header */}
      <div className="flex items-center gap-2 mb-8">
        <SlidersHorizontal width={16} height={16} className="text-gray-300" />
        <h2 className="text-[#121212] lg:text-[20px] text-[16px] font-inter font-semibold ">
          Filter
        </h2>
      </div>

      {/* Categories section */}
      <div className="lg:block flex justify-between">
        <div className="mb-8">
          <h4 className="text-[#121212] font-semibold mb-3 font-inter">
            CATEGORIES
          </h4>

          <ul className="max-h-56 overflow-y-scroll text-[14px]">
            {Array.from({ length: 8 }).map((_, i) => (
              <li key={i} className="mb-3">
                <div className="h-3 w-20 bg-gray-200 rounded"></div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
