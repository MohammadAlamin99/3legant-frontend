import { IProductVariant } from "@/types/variant.type";
import { Heart, Minus, Plus } from "lucide-react";
import React from "react";

interface DetailsButtonProps {
  qtyHandler: (value: number) => void;
  qty: number;
  productId: string;
  selectedVariant: IProductVariant;
  handleAddToCart: (productId: string, variantId: string) => void;
}

export default function DetailsButton({
  qtyHandler,
  qty,
  productId,
  selectedVariant,
  handleAddToCart,
}: DetailsButtonProps) {
  return (
    <>
      <div className="space-y-4">
        <div className="flex items-center space-x-4">
          <div className="flex items-center rounded-lg bg-[#F5F5F5]">
            <button
              className="p-3.5 transition-colors cursor-pointer"
              onClick={() => qtyHandler(qty - 1)}
            >
              <Minus width={20} height={20} />
            </button>
            <span className="px-4 py-2 text-gray-900 font-medium">{qty}</span>
            <button
              className="p-3.5 transition-colors cursor-pointer"
              onClick={() => qtyHandler(qty + 1)}
            >
              <Plus width={20} height={20} />
            </button>
          </div>
          <button className="w-full cursor-pointer bg-white border border-[#141718] text-[#141718] py-3 px-6 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center space-x-2">
            <Heart className="w-5 h-5" />
            <span>Wishlist</span>
          </button>
        </div>

        <button
          disabled={selectedVariant?.stock < qty}
          onClick={() =>
            handleAddToCart(productId || "", selectedVariant?._id || "")
          }
          className={`w-full font-inter text-[18px] font-medium py-4 px-6 rounded-lg transition-colors relative overflow-hidden group ${
            selectedVariant?.stock >= qty
              ? "bg-[#141718] text-white cursor-pointer"
              : "bg-gray-400 text-gray-200 cursor-not-allowed"
          }`}
        >
          <span className="relative z-10">
            {selectedVariant?.stock >= qty ? "Add to Cart" : "Out of Stock"}
          </span>
          {selectedVariant?.stock >= qty && (
            <>
              <span className="absolute inset-0 bg-white/20 backdrop-blur-md border border-white/30 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500 ease-out z-0"></span>
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-[-20deg] translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out z-0"></span>
            </>
          )}
        </button>
      </div>
    </>
  );
}
