import { Search } from "lucide-react";
import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Product } from "@/types/product.type";

export default function SearchBar({
  searchTerm,
  setSearchTerm,
  isLoading,
  predictions,
  setSearchOpen,
  setPredictions,
}: {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  isLoading: boolean;
  predictions: Product[];
  setSearchOpen: (open: boolean) => void;
  setPredictions: (predictions: Product[]) => void;
}) {
  const router = useRouter();
  return (
    <>
      <div className="relative">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search products..."
          autoFocus
          className="w-full px-6 py-5 text-md font-inter 
                  border-b-2 border-gray-300 focus:border-[#141718] 
                  outline-none transition-colors duration-200 placeholder:text-[#121212]"
        />
        <Search
          className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
          size={28}
          strokeWidth={1.5}
        />

        {/* 🔍 Prediction Dropdown */}
        {searchTerm && (
          <div className="absolute left-0 right-0 mt-2 bg-white border border-gray-200 shadow-lg rounded-lg z-20 max-h-72 overflow-y-auto">
            {isLoading && (
              <div className="px-6 py-3 text-gray-500 text-sm">
                Searching...
              </div>
            )}

            {!isLoading && predictions.length === 0 && (
              <div className="px-6 py-3 text-gray-400 text-sm">
                No results found
              </div>
            )}

            {!isLoading &&
              predictions.map((item) => (
                <div key={item?._id}>
                  <button
                    key={item._id}
                    onClick={() => {
                      router.push(`/product/${item._id}`);
                      setSearchOpen(false);
                      setSearchTerm("");
                      setPredictions([]);
                    }}
                    className="w-full text-left px-6 py-3 hover:bg-gray-100 transition-colors duration-150 flex items-center gap-3 cursor-pointer"
                  >
                    {item?.featureImage && (
                      <Image
                        src={item.featureImage}
                        alt={item.title}
                        width={40}
                        height={40}
                        className="w-10 h-10 object-cover border"
                      />
                    )}
                    <div>
                      <span className="text-gray-800 font-medium">
                        {item.title}
                      </span>
                    </div>
                  </button>
                </div>
              ))}
          </div>
        )}
      </div>
    </>
  );
}
