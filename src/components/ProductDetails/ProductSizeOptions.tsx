"use client";
import { IProductVariant } from "@/types/variant.type";
import { useState } from "react";

export default function ProductSizeOptions({
  variants,
}: {
  variants: IProductVariant[];
}) {
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  // get available sizes from variants
  const availableSizes = variants.map((v) => v.options);
  console.log(availableSizes);

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900">Size</h3>
      <div className="grid grid-cols-3 gap-3 sm:flex sm:gap-2">
        {Array.isArray(availableSizes) &&
          availableSizes.map((item, i) => (
            <button
              key={i}
              onClick={() => setSelectedSize(item?.size)}
              className={`cursor-pointer relative min-w-16 px-4 py-3 text-sm font-medium rounded-lg border-2 transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
        ${
          selectedSize === item?.size
            ? "bg-gray-900 text-white border-gray-900 shadow-lg"
            : "bg-white text-gray-700 border-gray-300 hover:border-gray-900 hover:bg-gray-50"
        }`}
              aria-pressed={selectedSize === item?.size}
            >
              {item?.size}
              {selectedSize === item?.size && (
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
              )}
            </button>
          ))}
      </div>

      {selectedSize && (
        <div className="flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded-lg">
          <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
            <svg
              className="w-3 h-3 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <p className="text-sm text-green-800">
            Size <span className="font-semibold">{selectedSize}</span> selected
          </p>
        </div>
      )}

      <div className="text-xs text-gray-500 space-y-1">
        <p>• Free returns within 30 days</p>
        <p>• Need help? Check our size chart above</p>
      </div>
    </div>
  );
}
