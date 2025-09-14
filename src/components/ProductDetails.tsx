import React from 'react';
import { ChevronLeft, ChevronRight, Heart, Minus, Plus, Star } from 'lucide-react';

const TrayTable = () => {
    return (
        <div className="lx:px-0 lg:px-3 md:px-3 container mx-auto p-6 bg-white">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-4">
                    <div className="relative bg-gray-50 rounded-lg overflow-hidden">
                        <div className="absolute top-8 left-8 z-10">
                            <span className="bg-white font-inter text-[#121212] px-3 py-1 rounded-md text-[18px] font-bold">
                                NEW
                            </span>
                            <div className="bg-emerald-500 font-inter text-white px-3 py-1 rounded-md text-sm font-bold mt-2">
                                -50%
                            </div>
                        </div>

                        <button className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md hover:shadow-lg transition-shadow">
                            <ChevronLeft className="w-5 h-5 text-gray-600" />
                        </button>
                        <button className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md hover:shadow-lg transition-shadow">
                            <ChevronRight className="w-5 h-5 text-gray-600" />
                        </button>

                        <div className="aspect-square flex items-center justify-center p-12">
                            <div className="relative">
                                <div className="w-48 h-48 bg-black rounded-full relative shadow-lg">
                                    <div className="absolute inset-2 border border-gray-600 rounded-full"></div>
                                </div>
                                <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2">
                                    <div className="relative w-32 h-16">
                                        <div className="absolute inset-0">
                                            <div className="w-full h-1 bg-black absolute top-8 transform rotate-12"></div>
                                            <div className="w-full h-1 bg-black absolute top-8 transform -rotate-12"></div>
                                            <div className="w-1 h-full bg-black absolute left-4"></div>
                                            <div className="w-1 h-full bg-black absolute right-4"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                        <div className="aspect-square bg-gray-100 rounded-lg p-4">
                            <div className="w-full h-full bg-gray-300 rounded-full relative">
                                <div className="absolute inset-2 border border-gray-400 rounded-full"></div>
                            </div>
                        </div>
                        <div className="aspect-square bg-gray-100 rounded-lg p-4">
                            <div className="w-full h-full bg-gray-300 rounded relative">
                                <div className="w-8 h-8 bg-gray-400 rounded-full absolute top-2 left-2"></div>
                                <div className="w-12 h-2 bg-gray-400 absolute bottom-4 left-4"></div>
                            </div>
                        </div>
                        <div className="aspect-square bg-gray-100 rounded-lg p-4">
                            <div className="w-full h-full bg-gray-300 rounded relative">
                                <div className="w-full h-6 bg-gray-400 absolute bottom-0 rounded-b"></div>
                                <div className="w-4 h-4 bg-gray-500 absolute top-2 right-2 rounded"></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="space-y-6">
                    <div className="flex items-center space-x-2">
                        <div className="flex space-x-1">
                            {
                                Array.from({ length: 5 }).map((_, i) => (
                                    <span key={i} className="text-[#343839] text-sm"><Star width={16} height={16} /></span>
                                ))
                            }
                        </div>
                        <span className="text-[#141718] text-[12px] font-inter font-normal">11 Reviews</span>
                    </div>

                    {/* Title */}
                    <h1 className="text-[40px] font-medium font-poppins">Tray Table</h1>

                    {/* Description */}
                    <p className="text-[#6C7275] text-[16px] font-normal font-inter leading-relaxed">
                        Buy one or buy a few and make every space where you sit more
                        convenient. Light and easy to move around with removable tray
                        top, handy for serving snacks.
                    </p>

                    {/* Price */}
                    <div className="flex items-center space-x-4">
                        <span className="text-[28px] font-medium text-[#121212] font-poppins">$199.00</span>
                        <span className="text-[20px] font-poppins text-[#6C7275] line-through">$400.00</span>
                    </div>

                    {/* Measurements */}
                    <div>
                        <h3 className="text-[16px] font-semibold text-[#6C7275] mb-2">Measurements</h3>
                        <p className="text-black font-normal font-inter text-[20px]">17 1/2×20 5/8</p>
                    </div>

                    {/* Color Selection */}
                    <div>
                        <div className="flex items-center gap-1 mb-3">
                            <h3 className="text-[16px] font-inter font-semibold text-[#6C7275]">Choose Color</h3>
                            <ChevronRight className="w-5 h-5 text-gray-400" />
                        </div>
                        <p className="text-black font-inter text-[20px] font-normal mb-4">Black</p>

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

                    {/* Quantity and Actions */}
                    <div className="space-y-4">
                        <div className="flex items-center space-x-4">
                            <div className="flex items-center rounded-lg bg-[#F5F5F5]">
                                <button className="p-3.5 transition-colors cursor-pointer">
                                    <Minus width={20} height={20} />
                                </button>
                                <span className="px-4 py-2 text-gray-900 font-medium">1</span>
                                <button className="p-3.5 transition-colors cursor-pointer">
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

                    {/* Product Info */}
                    <div className="space-y-2 pt-4 border-t border-gray-200">
                        <div className="flex gap-[98px]">
                            <span className="text-[#6C7275] font-normal font-inter text[12px] w-20">SKU</span>
                            <span className="text-[#141718] font-inter text[12px]">1117</span>
                        </div>
                        <div className="flex gap-[98px]">
                            <span className="text-[#6C7275] font-normal font-inter text[12px] w-20">CATEGORY</span>
                            <span className="text-[#141718] font-inter text[12px]">Living Room, Bedroom</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TrayTable;