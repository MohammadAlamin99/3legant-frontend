"use client";
import { IProductVariant } from "@/types/variant.type";
import { ChevronRight } from "lucide-react";
import React, { useState } from "react";
import Image from "next/image";

type dimensions = {
  l?: number,
  w?: number,
  h?: number,
}

export default function ColorVarient({ variants, dimensions }: { variants: IProductVariant[]; dimensions?: dimensions }) {
  const [selectedVariant, setSeletedVariant] = useState(variants[0]);
  const [color, setColor] = useState<string>(selectedVariant?.options?.color);
  return (
    <>
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">Size</h3>
        <div className="grid grid-cols-3 gap-3 sm:flex sm:gap-2">
          {variants &&
            variants.map((v, i) => {
              const isActive = selectedVariant?.options?.size === v?.options?.size;
              return (
                <button
                  key={i}
                  onClick={() => setSeletedVariant(v)}
                  className={`px-4 py-2 rounded-lg border text-sm font-medium transition-all cursor-pointer
                  ${isActive
                      ? "border-black bg-[#141718] text-white shadow-md"
                      : "border-gray-300 bg-white text-gray-700 hover:border-black hover:bg-gray-50"}`}
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
            L : {dimensions?.l} x W : {dimensions?.w} x H :{" "}
            {dimensions?.h}
          </p>
        </>
      )}

      {/* color veriants */}

      <div className="flex items-center gap-1 mb-2">
        <h3 className="text-[16px] font-inter font-semibold text-[#6C7275]">
          Choose Color
        </h3>
        <ChevronRight className="w-5 h-5 text-gray-400" />
      </div>
      <span className="text-[20px] font-inter font-normal text-black mb-4 block">{color}</span>

      {
        selectedVariant?.image ?
          <div className="flex space-x-4">
            {variants &&
              [...new Map(variants?.map(v => [v.options.color, v])).values()].map((item, i) => {
                const isActive = selectedVariant?.options?.color === item?.options?.color;
                return (
                  <div
                    key={i}
                    onClick={isActive ? () => setColor(item?.options?.color || "") : undefined}
                    className={`w-16 h-16 flex items-center justify-center transition relative 
                    ${isActive ? "border border-[#141718] cursor-pointer" : "cursor-not-allowed"}`}>
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
          :
          <div className="flex flex-wrap gap-3">
            {[...new Map(variants?.map(v => [v.options.color, v])).values()].map((c, i) => {
              const isActive = color === c?.options?.color;
              return (
                <button
                  key={i}
                  onClick={() => setColor(c?.options?.color || "")}
                  className={`
                  relative w-8 h-8 rounded-full border-2 transition-all duration-200 cursor-pointer
                  ${isActive
                      ? "ring-1 ring-offset-1 ring-black border-white shadow-md"
                      : "border-gray-200 hover:scale-105 hover:shadow-md"
                    }`}
                  style={{ backgroundColor: c?.options?.color?.toLowerCase() }}
                  title={c?.options?.color}
                >
                  {isActive && (
                    <div className="absolute inset-0 flex items-center justify-center">
                    </div>
                  )}
                </button>
              );
            })}
          </div>
      }
    </>
  );
}
