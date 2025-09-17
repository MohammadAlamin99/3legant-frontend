"use client"
import { Heart, Minus, Plus } from "lucide-react";
import React, { useState } from "react";

export default function QtyAndATC() {
  const [qty, setQty] = useState(1);

  const qtyHandler = (value: number) => {
    if(value<1) return;
    setQty(value)
  }
  return (
    <div>
      <div className="space-y-4">
        <div className="flex items-center space-x-4">
          <div className="flex items-center rounded-lg bg-[#F5F5F5]">
            <button className="p-3.5 transition-colors cursor-pointer" onClick={() => qtyHandler(qty - 1)}>
              <Minus width={20} height={20} />
            </button>
            <span className="px-4 py-2 text-gray-900 font-medium">{qty}</span>
            <button className="p-3.5 transition-colors cursor-pointer" onClick={() => qtyHandler(qty + 1)}>
              <Plus width={20} height={20} />
            </button>
          </div>
          <button className="w-full cursor-pointer bg-white border border-[#141718] text-[#141718] py-3 px-6 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center space-x-2">
            <Heart className="w-5 h-5" />
            <span>Wishlist</span>
          </button>
        </div>

        <button className="w-full bg-[#141718] font-inter text-[18px] font-medium text-white py-4 px-6 rounded-lg hover:bg-gray-800 transition-colors cursor-pointer">
          Add to Cart
        </button>
      </div>
    </div>
  );
}
