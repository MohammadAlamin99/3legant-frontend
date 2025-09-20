import React from "react";

const LoadMoreSkeleton = () => {
  return (
    <div className="animate-pulse">
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
  );
};

export default LoadMoreSkeleton;
