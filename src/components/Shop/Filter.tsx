import { Icollection } from "@/types/collection.type";
import { SlidersHorizontal } from "lucide-react";


export default function Filter({ categoryData, handleCategoryChange, categoryId, handlePriceChange }:
    { categoryData: Icollection[]; handleCategoryChange: (id: string) => void; categoryId: string; handlePriceChange: (min: number, max: number) => void }) {
    const priceRanges = [
        { min: 0, max: 100 },
        { min: 101, max: 200 },
        { min: 201, max: 300 },
        { min: 301, max: Infinity }
    ];
    return (
        <div className="w-full">
            <div className="flex items-center gap-2 mb-8">
                <SlidersHorizontal width={16} height={16} />
                <h2 className="text-[#121212] lg:text-[20px] text-[16px] font-inter font-semibold ">Filter</h2>
            </div>
            <div className="lg:block flex justify-between">
                <div className="mb-8">
                    <h4 className="text-[#121212] font-semibold mb-3 font-inter">CATEGORIES</h4>
                    <ul className="max-h-56 overflow-y-scroll text-[14px] text-[#807E7E] font-inter font-semibold">
                        {
                            categoryData && categoryData.map((item, i) => (
                                <li key={i} className={`mb-3 cursor-pointer
                                 hover:text-[#121212] border-b border-[#fff] 
                                 hover:border-[#121212] w-fit transition-all duration-300 ${categoryId === item?._id ? 'text-[#121212] border-b-[#121212]' : ''}`}
                                    onClick={() => handleCategoryChange(item._id)}>
                                    {item?.name}
                                </li>
                            ))
                        }
                    </ul>
                </div>
                <div>
                    <h4 className="ext-[#121212] font-semibold mb-3 font-inter">PRICE</h4>
                    <ul className="space-y-2">
                        {
                            priceRanges && priceRanges.map((item, i) => (
                                <li key={i} className="flex justify-between items-center">
                                    <label className="flex justify-between items-center w-full cursor-pointer text-[#6C7275] text-[14px] font-semibold font-inter lg:gap-0 gap-4">
                                        {
                                            item.max === Infinity ? `TK ${item?.min} +` : `TK ${item?.min} - TK ${item?.max}`
                                        }
                                        <input
                                            type="checkbox"
                                            onChange={() => handlePriceChange(item.min, item.max)}
                                            className="w-4 h-4 border border-gray-400 accent-black rounded"
                                        />
                                    </label>
                                </li>
                            ))
                        }

                    </ul>
                </div>
            </div>
        </div>
    );
};

