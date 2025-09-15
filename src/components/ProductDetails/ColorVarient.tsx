import { ChevronRight } from "lucide-react";
import React from "react";

export default function ColorVarient() {
  return (
    <div>
      <div>
        <div className="flex items-center gap-1 mb-3">
          <h3 className="text-[16px] font-inter font-semibold text-[#6C7275]">
            Choose Color
          </h3>
          <ChevronRight className="w-5 h-5 text-gray-400" />
        </div>
        <p className="text-black font-inter text-[20px] font-normal mb-4">
          Black
        </p>

        <div className="flex space-x-3">
          <div className="w-12 h-12 border-2 border-black rounded-lg p-1">
            <div className="w-full h-full bg-black rounded"></div>
          </div>
          <div className="w-12 h-12 border-2 border-gray-200 rounded-lg p-1">
            <div className="w-full h-full bg-gray-200 rounded"></div>
          </div>
          <div className="w-12 h-12 border-2 border-gray-200 rounded-lg p-1">
            <div className="w-full h-full bg-red-500 rounded"></div>
          </div>
          <div className="w-12 h-12 border-2 border-gray-200 rounded-lg p-1">
            <div className="w-full h-full bg-white border border-gray-300 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
