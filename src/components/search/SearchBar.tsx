"use client";
import React from "react";
import Image from "next/image";
import { Product } from "@/types/product.type";
import { ChevronRight } from "lucide-react";

export default function SearchBar({
    handleKeyPress,
    searchTerm,
    setSearchTerm,
    isLoading,
    handleSearch,
    predictions,
    setKeyword,
    setDebouncedTerm,
}: {
    handleKeyPress: (e: React.KeyboardEvent) => void;
    searchTerm: string;
    setSearchTerm: (term: string) => void;
    isLoading: boolean;
    handleSearch: () => void;
    predictions: Product[];
    setKeyword: (term: string) => void;
    setDebouncedTerm: (term: string) => void;
}) {
    return (
        <div className="relative flex flex-col items-center mb-8">
            <div className="flex gap-2 w-full max-w-md">
                <div className="relative flex-1">
                    <input
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        onKeyPress={handleKeyPress}
                        type="text"
                        placeholder="Search products..."
                        className="w-full pl-11 pr-4 font-inter py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#141718] focus:border-transparent transition-all duration-200"
                    />
                    {/* Search Icon */}
                    <svg
                        className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                    </svg>
                </div>
                <button
                    className="bg-[#141718] text-white px-6 py-3 rounded-lg font-semibold font-inter cursor-pointer disabled:opacity-50 hover:bg-[#2a2d2e] transition-colors duration-200 whitespace-nowrap"
                    onClick={handleSearch}
                    disabled={!searchTerm.trim() || isLoading}
                >
                    {isLoading ? (
                        <span className="flex items-center gap-2">
                            <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                                <circle
                                    className="opacity-25"
                                    cx="12"
                                    cy="12"
                                    r="10"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                    fill="none"
                                />
                                <path
                                    className="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                />
                            </svg>
                            Searching...
                        </span>
                    ) : (
                        "Search"
                    )}
                </button>
            </div>

            {/* 🔍 Enhanced Prediction Dropdown */}
            {predictions.length > 0 && searchTerm.trim().length >= 2 && (
                <div className="absolute top-[52px] bg-white w-full max-w-md shadow-2xl rounded-lg border border-gray-200 z-50 overflow-hidden animate-fadeIn">
                    <div className="px-4 py-2 bg-gray-50 border-b border-gray-200">
                        <p className="text-xs font-medium text-gray-500 uppercase tracking-wide font-inter">
                            Suggested Products
                        </p>
                    </div>
                    <div className="max-h-[320px] overflow-y-auto">
                        {predictions.map((item, index) => (
                            <button
                                key={item._id}
                                onClick={() => {
                                    setKeyword(item.title);
                                    setSearchTerm(item.title);
                                    setDebouncedTerm("");
                                }}
                                className="flex items-center cursor-pointer gap-3 w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors duration-150 border-b border-gray-100 last:border-none group"
                                style={{
                                    animationDelay: `${index * 30}ms`,
                                }}
                            >
                                <div className="flex-shrink-0 w-12 h-12 overflow-hidden bg-gray-100 border border-gray-200 group-hover:border-gray-300 transition-colors">
                                    <Image
                                        src={item?.featureImage}
                                        alt={item.title}
                                        width={48}
                                        height={48}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="font-inter text-sm font-medium text-gray-900 truncate group-hover:text-[#141718] transition-colors">
                                        {item.title}
                                    </p>
                                </div>
                                <ChevronRight className="w-4 h-4 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}