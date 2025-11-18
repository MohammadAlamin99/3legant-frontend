import React from "react";

export default function Price({
  selectedVariant,
}: {
  selectedVariant: { price: number; compareAtPrice?: number };
}) {
  return (
    <div>
      <div className="flex items-center space-x-4">
        <span className="text-[28px] font-medium text-[#121212] font-poppins">
          TK {selectedVariant?.price}
        </span>
        {selectedVariant?.compareAtPrice && (
          <span className="text-[20px] font-poppins text-[#6C7275] line-through">
            TK {selectedVariant?.compareAtPrice}
          </span>
        )}
      </div>
    </div>
  );
}
