import { SlidersHorizontal } from "lucide-react";
import React from "react";

export default function Filter() {
    return (
        <div className="w-full">
            <div className="flex items-center gap-2 mb-8">
                <SlidersHorizontal width={16} height={16} />
                <h2 className="text-[#121212] lg:text-[20px] text-[16px] font-inter font-semibold ">Filter</h2>
            </div>
            <div className="mb-8">
                <h4 className="text-[#121212] font-semibold mb-3 font-inter">CATEGORIES</h4>
                <ul className="max-h-56 overflow-y-scroll text-[14px] text-[#807E7E] font-inter font-semibold">
                    <li className="mb-3 cursor-pointer hover:text-[#121212] border-b border-[#fff]  hover:border-[#121212] w-fit transition-all duration-300">
                        All Products
                    </li>
                    <li className="mb-3 cursor-pointer hover:text-[#121212] border-b border-[#fff]  hover:border-[#121212] w-fit transition-all duration-300">
                        All Products
                    </li>
                    <li className="mb-3 cursor-pointer hover:text-[#121212] border-b border-[#fff]  hover:border-[#121212] w-fit transition-all duration-300">
                        All Products
                    </li>
                    <li className="mb-3 cursor-pointer hover:text-[#121212] border-b border-[#fff]  hover:border-[#121212] w-fit transition-all duration-300">
                        All Products
                    </li>
                    <li className="mb-3 cursor-pointer hover:text-[#121212] border-b border-[#fff]  hover:border-[#121212] w-fit transition-all duration-300">
                        All Products
                    </li>
                    <li className="mb-3 cursor-pointer hover:text-[#121212] border-b border-[#fff]  hover:border-[#121212] w-fit transition-all duration-300">
                        All Products
                    </li>

                </ul>
            </div>
            <div>
                <h4 className="ext-[#121212] font-semibold mb-3 font-inter">PRICE</h4>
                <ul className="space-y-2">
                    <li className="flex justify-between items-center">
                        <label className="flex justify-between items-center w-full cursor-pointer text-[#6C7275] text-[14px] font-semibold font-inter">
                            All Price
                            <input
                                type="checkbox"
                                className="w-4 h-4 border border-gray-400 accent-black rounded"
                            />
                        </label>
                    </li>
                    <li className="flex justify-between items-center">
                        <label className="flex justify-between items-center w-full cursor-pointer text-[#6C7275] text-[14px] font-semibold font-inter">
                            All Price
                            <input
                                type="checkbox"
                                className="w-4 h-4 border border-gray-400 accent-black rounded"
                            />
                        </label>
                    </li>
                    <li className="flex justify-between items-center">
                        <label className="flex justify-between items-center w-full cursor-pointer text-[#6C7275] text-[14px] font-semibold font-inter">
                            All Price
                            <input
                                type="checkbox"
                                className="w-4 h-4 border border-gray-400 accent-black rounded"
                            />
                        </label>
                    </li>
                </ul>
            </div>
        </div>
    );
};

