"use client";
import React, { useMemo, useState } from "react";
import { Product } from "@/types/product.type";
import LoadMoreSkeleton from "../Loading/LoadMoreSkeleton";
import { Icollection } from "@/types/collection.type";
import CommonProductCard from "../Slider/CommonProductCard";
const ShopProductCard = ({
  products,
  fetchNextPage,
  isFetchingNextPage,
  hasNextPage,
  categoryData,
  categoryId,
}: {
  products: Product[];
  fetchNextPage: () => void;
  isFetchingNextPage?: boolean;
  hasNextPage: boolean;
  categoryData?: Icollection[];
  categoryId?: string;
}) => {
  const [sortOption, setSortOption] = useState<string>("");
  const filterCategory = categoryData?.find((item) => item?._id === categoryId);

  // shorted product
  const sortedProducts = useMemo(() => {
    if (!products) {
      return [];
    }
    const sortedData = [...products];
    switch (sortOption) {
      case "name-desc":
        sortedData.sort((a, b) => b.title.localeCompare(a.title));
        break;
      case "price-low-high":
        sortedData.sort((a, b) => (a.basePrice ?? 0) - (b.basePrice ?? 0));
        break;
      case "price-high-low":
        sortedData.sort((a, b) => (b.basePrice ?? 0) - (a.basePrice ?? 0));
        break;
      default:
        break;
    }
    return sortedData;
  }, [products, sortOption]);

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h4 className="text-black font-inter font-semibold">
          {filterCategory?.name || "All Products"}
        </h4>
        <select
          className="cursor-pointer font-inter text-[#121212] font-semibold text-[16px] w-fit focus:outline-0"
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
        >
          <option value="">Sort by</option>
          <option value="name-desc">Name (Z-A)</option>
          <option value="price-low-high">Price (Low &gt; High)</option>
          <option value="price-high-low">Price (High &gt; Low)</option>
        </select>
      </div>

      <div className="grid grid-cols-2 gap-2 lg:grid-cols-4 lg:gap-6">
        {sortedProducts &&
          sortedProducts.map((item, i) => (
            <div key={i}>
              <CommonProductCard item={item} />
            </div>
          ))}
        {isFetchingNextPage &&
          Array.from({ length: 6 }).map((_, i) => <LoadMoreSkeleton key={i} />)}
      </div>

      {/* Load More */}
      {hasNextPage && (
        <div className="flex justify-center mt-20">
          <button
            className="border font-inter font-medium border-[#141718]
            rounded-full px-10 py-2 text-sm text-[#141718] cursor-pointer"
            onClick={fetchNextPage}
            disabled={isFetchingNextPage}
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
};

export default ShopProductCard;
