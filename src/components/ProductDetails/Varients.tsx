"use client";
import { IProductVariant } from "@/types/variant.type";
import { ChevronRight } from "lucide-react";
import React, { useState, useMemo } from "react";
import Image from "next/image";

type dimensions = {
  l?: number;
  w?: number;
  h?: number;
};

export default function ColorVariant({
  variants,
  dimensions,
}: {
  variants: IProductVariant[];
  dimensions?: dimensions;
}) {
  // Initial selected variant
  const [selectedVariant, setSelectedVariant] = useState(variants[0]);

  // Get unique sizes and colors
  const uniqueSizes = useMemo(() => {
    return [...new Map(variants?.map((v) => [v.options.size, v])).values()];
  }, [variants]);

  const uniqueColors = useMemo(() => {
    return [...new Map(variants?.map((v) => [v.options.color, v])).values()];
  }, [variants]);

  // Handle size selection
  const handleSizeSelect = (variant: IProductVariant) => {
    setSelectedVariant(variant);
  };

  // Handle color selection
  const handleColorSelect = (color: string) => {
    // Find a variant with the selected color and current size
    const newVariant = variants.find(
      (v) =>
        v.options.color === color &&
        v.options.size === selectedVariant.options.size
    );

    if (newVariant) {
      setSelectedVariant(newVariant);
    } else {
      // If no variant with current size and selected color, find first variant with the color
      const fallbackVariant = variants.find((v) => v.options.color === color);
      if (fallbackVariant) {
        setSelectedVariant(fallbackVariant);
      }
    }
  };

  return (
    <>
      {/* Size Selection */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-gray-900">Size</h2>
        <div className="grid grid-cols-3 gap-3 sm:flex sm:gap-2">
          {uniqueSizes.map((v, i) => {
            const isActive =
              selectedVariant?.options?.size === v?.options?.size;
              if (v.isActive === false) return null;
            return (
              <button
                key={`${v.options.size}-${i}`}
                onClick={() => handleSizeSelect(v)}
                className={`px-4 py-2 rounded-lg border text-sm font-medium transition-all cursor-pointer
                  ${
                    isActive
                      ? "border-black bg-[#141718] text-white shadow-md"
                      : "border-gray-300 bg-white text-gray-700 hover:border-black hover:bg-gray-50"
                  }`}
              >
                {v.options.size}
              </button>
            );
          })}
        </div>
        <div className="text-xs text-gray-500 space-y-1">
          <p>• Free returns within 30 days</p>
          <p>• Need help? Contact our support team</p>
        </div>
      </div>

      {/* Price */}
      <div className="flex items-center space-x-4">
        <span className="text-[28px] font-medium text-[#121212] font-poppins">
          TK {selectedVariant?.price}
        </span>
        <span className="text-[20px] font-poppins text-[#6C7275] line-through">
          TK {selectedVariant?.compareAtPrice}
        </span>
      </div>

      {/* Dimensions */}
      {dimensions && (
        <>
          <h3 className="text-[16px] font-semibold text-[#6C7275] mb-2">
            Dimensions
          </h3>
          <p className="text-black font-normal font-inter text-[20px]">
            L : {dimensions?.l} x W : {dimensions?.w} x H : {dimensions?.h}
          </p>
        </>
      )}

      {/* Color Variants */}
      <div className="flex items-center gap-1 mb-2">
        <h3 className="text-[16px] font-inter font-semibold text-[#6C7275]">
          Choose Color
        </h3>
        <ChevronRight className="w-5 h-5 text-gray-400" />
      </div>
      <span className="text-[20px] font-inter font-normal text-black mb-4 block">
        {selectedVariant.options.color}
      </span>

      {/* Color Selection - Show ALL colors always */}
      {selectedVariant?.image ? (
        <div className="flex space-x-4">
          {uniqueColors.map((item, i) => {
            const isActive =
              selectedVariant?.options?.color === item?.options?.color;
            const variantExists = variants.some(
              (v) =>
                v.options.color === item.options.color &&
                v.options.size === selectedVariant.options.size
            );

            return (
              <div
                key={`${item.options.color}-${i}`}
                onClick={
                  variantExists
                    ? () => handleColorSelect(item.options.color)
                    : undefined
                }
                className={`w-16 h-16 flex items-center justify-center transition relative border-2 cursor-pointer
                  ${
                    isActive
                      ? "border-[#141718]"
                      : variantExists
                      ? "border-transparent hover:border-gray-300"
                      : "border-gray-200 opacity-50 cursor-not-allowed"
                  }`}
                title={
                  !variantExists
                    ? `${item.options.color} not available in ${selectedVariant.options.size} size`
                    : item.options.color
                }
              >
                <Image
                  src={item?.image || ""}
                  alt={item?.title}
                  fill
                  className="object-cover"
                />
              </div>
            );
          })}
        </div>
      ) : (
        <div className="flex flex-wrap gap-3">
          {uniqueColors.map((c, i) => {
            const isActive =
              selectedVariant.options.color === c?.options?.color;
            const variantExists = variants.some(
              (v) =>
                v.options.color === c.options.color &&
                v.options.size === selectedVariant.options.size
            );

            return (
              <button
                key={`${c.options.color}-${i}`}
                onClick={() =>
                  variantExists && handleColorSelect(c.options.color)
                }
                disabled={!variantExists}
                className={`
                  relative w-8 h-8 rounded-full border-2 transition-all duration-200
                  ${
                    isActive
                      ? "ring-2 ring-offset-2 ring-black border-white shadow-md"
                      : variantExists
                      ? "border-gray-200 hover:scale-105 hover:shadow-md cursor-pointer"
                      : "border-gray-200 opacity-50 cursor-not-allowed"
                  }`}
                style={{ backgroundColor: c?.options?.color?.toLowerCase() }}
                title={
                  !variantExists
                    ? `${c.options.color} not available in ${selectedVariant.options.size} size`
                    : c.options.color
                }
              >
                {isActive && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    {/* You can add a checkmark icon here if needed */}
                  </div>
                )}
              </button>
            );
          })}
        </div>
      )}
    </>
  );
}
