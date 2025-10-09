import { Product } from "@/types/product.type";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
export default function PredectiveSearch({predictions, setKeyword, setSearchTerm, setDebouncedTerm}:{
    predictions: Product[];
    setKeyword: (keyword: string) => void;
    setSearchTerm: (term: string) => void;
    setDebouncedTerm: (term: string) => void;
}){
    return (
        <>
            <div className="absolute top-[52px] bg-white w-full max-w-md shadow-2xl rounded-lg border border-gray-200 z-50 overflow-hidden animate-fadeIn">
                    <div className="px-4 py-2 bg-gray-50 border-b border-gray-200">
                        <p className="text-xs font-medium text-gray-500 uppercase tracking-wide font-inter">
                            Suggested Products
                        </p>
                    </div>
                    <div className="max-h-[320px] overflow-y-auto">
                        {predictions.map((item, index) => (
                            <button
                                key={item._id}
                                onClick={() => {
                                    setKeyword(item.title);
                                    setSearchTerm(item.title);
                                    setDebouncedTerm("");
                                }}
                                className="flex items-center cursor-pointer gap-3 w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors duration-150 border-b border-gray-100 last:border-none group"
                                style={{
                                    animationDelay: `${index * 30}ms`,
                                }}
                            >
                                <div className="flex-shrink-0 w-12 h-12 overflow-hidden bg-gray-100 border border-gray-200 group-hover:border-gray-300 transition-colors">
                                    <Image
                                        src={item?.featureImage}
                                        alt={item.title}
                                        width={48}
                                        height={48}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="font-inter text-sm font-medium text-gray-900 truncate group-hover:text-[#141718] transition-colors">
                                        {item.title}
                                    </p>
                                </div>
                                <ChevronRight className="w-4 h-4 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </button>
                        ))}
                    </div>
                </div> 
        </>
    );
}

