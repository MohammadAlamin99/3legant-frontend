"use client";
import { Heart, Star } from "lucide-react";
import Link from "next/link";
import React from "react";
import Image from "next/image";
import { Product } from "@/types/product.type";
import LoadMoreSkeleton from "../Loading/LoadMoreSkeleton";
import { Icollection } from "@/types/collection.type";
const ShopProductCard = ({
  products,
  fetchNextPage,
  isFetchingNextPage,
  hasNextPage,
  categoryData,
  categoryId
}: {
  products: Product[];
  fetchNextPage: () => void;
  isFetchingNextPage?: boolean;
  hasNextPage: boolean;
  categoryData: Icollection[];
  categoryId?: string;
}) => {
  const filterCategory = categoryData?.find((item)=> item?._id === categoryId);
  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h4 className="text-black font-inter font-semibold">{filterCategory?.name || "All Products"}</h4>
        <select className="cursor-pointer font-inter text-[#121212] font-semibold text-[16px] w-fit focus:outline-0">
          <option>Sort by</option>
          <option>Name (Z-A)</option>
          <option>Price (Low &gt; High)</option>
          <option>Price (High &gt; Low)</option>
        </select>
      </div>

      <div className="grid grid-cols-2 gap-2 lg:grid-cols-3 lg:gap-6">
        {products &&
          products.map((item, i) => (
            <div key={i}>
              <div className="relative group">
                <Heart
                  width={32}
                  height={32}
                  color="#6C7275"
                  className="bg-white rounded-[50%] p-1.5
                absolute top-4 z-30 right-4 opacity-0 group-hover:opacity-100 transition-all
                duration-300"
                />
                <div className="absolute top-4 left-4 z-10">
                  {item?.badge && (
                    <span className="bg-white font-inter text-[#121212] px-3 py-1 rounded-md text-sm font-bold uppercase">
                      {item?.badge}
                    </span>
                  )}
                  {item.compareAtPrice && (
                    <div className="bg-[#38CB89] font-inter text-white px-3 py-1 rounded-md text-sm font-bold mt-2">
                      -
                      {(
                        ((item?.compareAtPrice - item?.basePrice) /
                          item?.compareAtPrice) *
                        100
                      ).toFixed(0)}
                      %
                    </div>
                  )}
                </div>
                <Link href={`/product/${item?._id}`}>
                  <Image
                    className="w-full object-cover aspect-[300/349]"
                    src={item?.featureImage}
                    width={300}
                    height={349}
                    alt="best seller"
                  />
                </Link>
                <button
                  className="font-inter text-[#FEFEFE] text-[16px] font-medium bg-[#141718]
                cursor-pointer leading-[28px] py-2.5 w-[80%] rounded-[8px]
                absolute bottom-4 left-[50%] translate-x-[-50%] opacity-0 group-hover:opacity-100 transition-all duration-300"
                >
                  Add to cart
                </button>
              </div>
              <div className="flex items-center gap-0.5 mt-3 mb-1">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Star
                    width={16}
                    height={16}
                    key={index}
                    className="text-[#343839] fill-[#343839]"
                  />
                ))}
                <span className="ml-1.5 font-inter text-sm font-medium">
                  ({item?.rating?.average})
                </span>
              </div>
              <h2 className="text-[16px] font-semibold text-[#141718] leading-8">
                {item?.title}
              </h2>
              <div className="flex items-center gap-3">
                <p className="text-[14px] font-semibold text-[#141718]">
                  TK. {item?.basePrice}
                </p>
                <p className="text-[14px] font-normal text-[#6C7275] line-through">
                  TK. {item?.compareAtPrice}
                </p>
              </div>
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
