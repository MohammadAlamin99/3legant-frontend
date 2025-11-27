import React from "react";
export default function ShopProductSkeleton() {
  return (
    <>
      <div className="flex justify-between items-center mb-8">
        <h4 className="text-black font-inter font-semibold">All Products</h4>
      </div>
      <div className="animate-pulse grid grid-cols-2 gap-2 lg:grid-cols-4 lg:gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i}>
            <div className="relative bg-gray-200 rounded-md w-full aspect-[300/349]"></div>
            <div className="flex items-center gap-0.5 mt-3 mb-1">
              {Array.from({ length: 5 }).map((_, index) => (
                <div key={index} className="w-4 h-4 bg-gray-200 rounded"></div>
              ))}
              <div className="w-10 h-4 bg-gray-200 rounded ml-1.5"></div>
            </div>
            <div className="w-3/4 h-5 bg-gray-200 rounded mb-2"></div>
            <div className="flex items-center gap-3">
              <div className="w-16 h-4 bg-gray-200 rounded"></div>
              <div className="w-16 h-4 bg-gray-200 rounded"></div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
