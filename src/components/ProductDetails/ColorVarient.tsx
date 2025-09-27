"use client";
import { IProductVariant } from "@/types/variant.type";
import { ChevronRight } from "lucide-react";
import React, { useMemo, useState } from "react";
import Image from "next/image";

export default function ColorVarient({
  variants,
}: {
  variants: IProductVariant[];
}) {
  const uniqueVariants = useMemo(() => {
    const seen = new Set<string>();
    return variants.filter((v) => {
      const key = v.image || v.options?.color?.toLocaleLowerCase();
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  }, [variants]);

  const [selectedVariant, setSelectedVariant] =
useState<IProductVariant | null>(uniqueVariants[0] || null);
console.log(selectedVariant)
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  // get available sizes from variants
  const availableSizes = variants.map((v) => v.options);
  return (
    <>
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
              Size <span className="font-semibold">{selectedSize}</span>{" "}
              selected
            </p>
          </div>
        )}

        <div className="text-xs text-gray-500 space-y-1">
          <p>• Free returns within 30 days</p>
          <p>• Need help? Contact our support team</p>
        </div>
      </div>
      {/* Price */}
      <div className="flex items-center space-x-4">
        <span className="text-[28px] font-medium text-[#121212] font-poppins">
          {/* TK. {product?.basePrice} */} TK. {selectedVariant?.price}
        </span>
        <span className="text-[20px] font-poppins text-[#6C7275] line-through">
          {/* TK. {product?.compareAtPrice} */} TK.{" "}
          {selectedVariant?.compareAtPrice}
        </span>
      </div>

      {/* Dimensions */}
      {/* {product?.dimensions && (
        <>
          <h3 className="text-[16px] font-semibold text-[#6C7275] mb-2">
            Dimensions
          </h3>
          <p className="text-black font-normal font-inter text-[20px]">
            L : {product?.dimensions?.l} x W : {product?.dimensions?.w} x H :{" "}
            {product?.dimensions?.h}
          </p>
        </>
      )} */}
      {selectedVariant && (
        <div className="flex items-center gap-1 mb-3">
          <h3 className="text-[16px] font-inter font-semibold text-[#6C7275]">
            Choose Color
          </h3>
          <ChevronRight className="w-5 h-5 text-gray-400" />
        </div>
      )}
      <p className="text-black font-inter text-[20px] font-normal mb-4">
        {selectedVariant?.options?.color}
      </p>

      <div className="flex space-x-4">
        {uniqueVariants &&
          uniqueVariants.map((variant) => {
            const isSelected = selectedVariant?._id === variant._id;
            const colorName = variant?.options?.color?.toLowerCase();
            return (
              <div
                key={variant._id}
                onClick={() => setSelectedVariant(variant)}
                className={`w-16 h-16 flex items-center justify-center cursor-pointer transition relative
                ${
                  isSelected
                    ? "border-2 border-[#141718]"
                    : "border-2 border-white"
                }
              `}
              >
                {variant.image ? (
                  <Image
                    src={variant.image}
                    alt={variant.options?.color || "color"}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div
                    className="w-full h-full border-4 border-white"
                    style={{
                      backgroundColor: colorName || "transparent",
                    }}
                  ></div>
                )}
              </div>
            );
          })}
      </div>
    </>
  );
}
