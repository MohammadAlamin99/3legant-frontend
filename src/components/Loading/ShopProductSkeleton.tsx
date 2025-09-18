import React from "react";
import Filter from "../Shop/Filter";

const ShopProductSkeleton = () => {
    return (
        <div className="animate-pulse">
            <div className="container mx-auto xl:px-3 lg:px-3 md:px-3 sm:px-3 px-8 lg:py-[60px] py-[32px] animate-pulse">
                <div className="grid lg:grid-cols-[minmax(262px,_auto)_1fr] lg:gap-6 gap-0">
                    {/* Header Skeleton */}
                    <Filter />

                    {/* Grid Skeleton */}
                    <div className="grid grid-cols-2 gap-2 lg:grid-cols-3 lg:gap-6">
                        {Array.from({ length: 6 }).map((_, i) => (
                            <div key={i}>
                                <div className="relative bg-gray-200 rounded-md w-full aspect-[300/349]"></div>

                                <div className="flex items-center gap-0.5 mt-3 mb-1">
                                    {Array.from({ length: 5 }).map((_, index) => (
                                        <div
                                            key={index}
                                            className="w-4 h-4 bg-gray-200 rounded"
                                        ></div>
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
                </div>
            </div>
        </div>
    );
};

export default ShopProductSkeleton;
