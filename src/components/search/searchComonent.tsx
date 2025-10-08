"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Heart, OctagonAlert, Star, Loader2 } from "lucide-react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { searchProductByKeyword } from "@/actions/product.action";
import { Product } from "@/types/product.type";

interface SearchResponse {
    data: Product[];
    meta: {
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    };
}

const SearchComonent = () => {
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [keyword, setKeyword] = useState<string>("");
    const limit = 9;

    const {
        data: searchData,
        hasNextPage,
        isFetchingNextPage,
        isLoading,
        fetchNextPage,
    } = useInfiniteQuery({
        queryKey: ["search", keyword],
        queryFn: async ({ pageParam = 1 }) =>
            await searchProductByKeyword(keyword, pageParam, limit),
        enabled: !!keyword,
        initialPageParam: 1,
        getNextPageParam: (lastPage: SearchResponse) => {
            if (!lastPage?.meta) return undefined;
            return lastPage.meta.page < lastPage.meta.totalPages
                ? lastPage.meta.page + 1
                : undefined;
        },
    });

    const finaldata =
        searchData?.pages?.flatMap((page: SearchResponse) => page?.data || []) || [];

    const handleSearch = () => {
        if (searchTerm.trim()) {
            setKeyword(searchTerm.trim());
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    return (
        <div className="container mx-auto py-8 md:px-3 sm:px-3 px-8">
            {/* Search Bar */}
            <div className="flex gap-2 mb-8 justify-center">
                <input
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyPress={handleKeyPress}
                    type="text"
                    placeholder="Search products..."
                    className="w-full max-w-md px-4 font-inter py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#141718]"
                />
                <button
                    className="bg-[#141718] text-white px-6 py-2 rounded-md font-semibold font-inter cursor-pointer disabled:opacity-50"
                    onClick={handleSearch}
                    disabled={!searchTerm.trim() || isLoading}
                >
                    {isLoading ? "Searching..." : "Search"}
                </button>
            </div>

            {/* Loading State */}
            {isLoading && (
                <div className="flex flex-col items-center justify-center py-20">
                    <Loader2 className="w-10 h-10 animate-spin text-[#141718]" />
                    <p className="mt-3 text-gray-600 text-lg font-inter">
                        Searching products...
                    </p>
                </div>
            )}

            {/* Results State */}
            {!isLoading && keyword && (
                <>
                    {/* Show products if we have any */}
                    {finaldata.length > 0 ? (
                        <>
                            <div className="grid grid-cols-2 gap-2 lg:grid-cols-4 lg:gap-6">
                                {finaldata.map((item: Product, index: number) => (
                                    <div key={index}>
                                        <div className="relative group">
                                            <Heart
                                                width={32}
                                                height={32}
                                                color="#6C7275"
                                                className="bg-white rounded-full p-1.5 absolute top-4 z-30 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300"
                                            />
                                            <div className="absolute top-4 left-4 z-10">
                                                {item.badge && (
                                                    <span className="bg-white font-inter text-[#121212] px-3 py-1 rounded-md text-sm font-bold uppercase">
                                                        {item.badge}
                                                    </span>
                                                )}
                                                {item.compareAtPrice && (
                                                    <div className="bg-[#38CB89] font-inter text-white px-3 py-1 rounded-md text-sm font-bold mt-2">
                                                        -
                                                        {(
                                                            ((item.compareAtPrice - item.basePrice) /
                                                                item.compareAtPrice) *
                                                            100
                                                        ).toFixed(0)}
                                                        %
                                                    </div>
                                                )}
                                            </div>
                                            <Link href={`/product/${item._id}`}>
                                                <Image
                                                    className="w-full object-cover aspect-[300/349]"
                                                    src={item.featureImage}
                                                    width={300}
                                                    height={349}
                                                    alt={item.title}
                                                />
                                            </Link>
                                            <Link href={`/product/${item._id}`}
                                                className="font-inter flex justify-center text-[#FEFEFE] text-[16px] font-medium bg-[#141718] cursor-pointer leading-[28px] py-2.5 w-[80%] rounded-[8px] absolute bottom-4 left-[50%] translate-x-[-50%] opacity-0 group-hover:opacity-100 transition-all duration-300"
                                            >
                                                Order Now
                                            </Link>
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
                                                ({item?.rating?.average || 0})
                                            </span>
                                        </div>
                                        <h2 className="text-[16px] font-semibold text-[#141718] leading-8">
                                            {item.title}
                                        </h2>
                                        <div className="flex items-center gap-3">
                                            <p className="text-[14px] font-semibold text-[#141718]">
                                                TK. {item.basePrice}
                                            </p>
                                            <p className="text-[14px] font-normal text-[#6C7275] line-through">
                                                TK. {item.compareAtPrice}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Load More */}
                            {hasNextPage && (
                                <div className="flex justify-center mt-20">
                                    <button
                                        className="border font-inter font-medium border-[#141718] rounded-full px-10 py-2 text-sm text-[#141718] cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                                        onClick={() => fetchNextPage()}
                                        disabled={isFetchingNextPage}
                                    >
                                        {isFetchingNextPage ? (
                                            <div className="flex items-center gap-2">
                                                <Loader2 className="w-4 h-4 animate-spin" />
                                                Loading...
                                            </div>
                                        ) : (
                                            "Load More"
                                        )}
                                    </button>
                                </div>
                            )}
                        </>
                    ) : (
                        // No products found
                        <div className="flex flex-col gap-1 items-center justify-center w-full py-20 text-center">
                            <OctagonAlert size={30} />
                            <h2 className="text-xl font-poppins font-semibold text-[#141718] mb-2">
                                No Products Found
                            </h2>
                            <p className="text-gray-500 max-w-md text-base font-inter">
                                We could not find any products matching{" "}
                                <span className="font-medium text-[#141718]">&ldquo;{keyword}&rdquo;</span>.
                                Try a different keyword or check your spelling.
                            </p>
                        </div>
                    )}
                </>
            )}

            {/* Initial State - No search performed yet */}
            {!isLoading && !keyword && (
                <div className="flex flex-col items-center justify-center py-20 text-center">
                    <p className="text-gray-500 text-lg font-inter">
                        Enter a search term to find products
                    </p>
                </div>
            )}
        </div>
    );
};

export default SearchComonent;