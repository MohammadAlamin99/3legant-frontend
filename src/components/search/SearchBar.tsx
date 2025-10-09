"use client";
import React from "react";
import { Product } from "@/types/product.type";
import PredectiveSearch from "./PredectiveSearch";

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
                        onKeyDown={handleKeyPress}
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
                <PredectiveSearch
                    predictions={predictions}
                    setKeyword={setKeyword}
                    setSearchTerm={setSearchTerm}
                    setDebouncedTerm={setDebouncedTerm} />
            )}
        </div>
    );
}