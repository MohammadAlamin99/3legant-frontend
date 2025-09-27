"use client"
import { IProductVariant } from "@/types/variant.type";
import { ChevronRight } from "lucide-react";
import React, { useMemo, useState } from "react";
import Image from "next/image";

export default function 
ColorVarient({ variants }: { variants: IProductVariant[] }) {

  const uniqueVariants = useMemo(() => {
    const seen = new Set<string>();
    return variants.filter((v) => {
      const key = v.image || v.options?.color?.toLocaleLowerCase();
      if (seen.has(key)) return false;
      seen.add(key)
      return true;
    })
  }, [variants])

  const [selectedVariant, setSelectedVariant] = useState<IProductVariant | null>(uniqueVariants[0] || null);
  return (
    <>
      {
        selectedVariant && (
          <div className="flex items-center gap-1 mb-3">
            <h3 className="text-[16px] font-inter font-semibold text-[#6C7275]">
              Choose Color
            </h3>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </div>
        )
      }
      <p className="text-black font-inter text-[20px] font-normal mb-4">
        {selectedVariant?.options?.color}
      </p>

      <div className="flex space-x-4">
        {
          uniqueVariants && uniqueVariants.map((variant) => {
            const isSelected = selectedVariant?._id === variant._id;
            const colorName = variant?.options?.color?.toLowerCase();
            return (
              <div
                key={variant._id}
                onClick={() => setSelectedVariant(variant)}
                className={`w-16 h-16 flex items-center justify-center cursor-pointer transition relative
                ${isSelected ? "border-2 border-[#141718]" : "border-2 border-white"}
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
            )
          })
        }
      </div>
    </>
  );
}
