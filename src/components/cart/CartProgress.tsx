import React from "react";

export default function CartProgress() {
  return (
    <>
      <div className="flex gap-8 flex-nowrap overflow-x-auto md:max-w-[832px] md:mx-auto scrollbar-none">
        <div className="flex items-center w-64 gap-4 border-b border-[#23262F] pb-5 shrink-0">
          <div className="w-[42px] h-[42px] font-inter flex items-center justify-center rounded-full bg-[#23262F] text-white font-semibold">
            1
          </div>
          <div className="text-[#23262F] font-semibold text-base font-inter">
            Shopping cart
          </div>
        </div>
        <div className="flex items-center w-64 gap-4 border-b border-gray-800 pb-5 shrink-0">
          <div className="w-[42px] h-[42px] font-inter flex items-center justify-center rounded-full bg-[#B1B5C3] text-white font-semibold">
            2
          </div>
          <div className="text-[#B1B5C3] font-semibold text-base">
            Checkout details
          </div>
        </div>
        <div className="flex items-center w-64 gap-4 border-b border-gray-800 pb-5 shrink-0">
          <div className="w-[42px] h-[42px] font-inter flex items-center justify-center rounded-full bg-[#B1B5C3] text-white font-semibold">
            3
          </div>
          <div className="text-[#B1B5C3] font-semibold text-base">
            Order complete
          </div>
        </div>
      </div>
    </>
  );
}
