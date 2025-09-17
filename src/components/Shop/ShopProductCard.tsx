import { Star } from 'lucide-react';
import Link from "next/link";
import React from 'react';
import Image from 'next/image';
const ShopProductCard = () => {
    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <h4 className="text-black font-inter font-semibold">All Products</h4>
                <select className="cursor-pointer font-inter text-[#121212] font-semibold text-[16px] w-fit focus:outline-0">
                    <option>Sort by</option>
                    <option>Name (Z-A)</option>
                    <option>Price (Low &gt; High)</option>
                    <option>Price (High &gt; Low)</option>
                </select>
            </div>

            <div className="grid grid-cols-2 gap-2 lg:grid-cols-3 lg:gap-6">
                <div>
                    <Link href="#">
                        <div className="relative group">
                            {/* <div className="absolute top-4 left-4 z-10">
                                            {
                                                item?.badge && (
                                                    <span className="bg-white font-inter text-[#121212] px-3 py-1 rounded-md text-sm font-bold uppercase">
                                                        {item?.badge}
                                                    </span>
                                                )
                                            }
                                            {
                                                item.compareAtPrice && (
                                                    <div className="bg-[#38CB89] font-inter text-white px-3 py-1 rounded-md text-sm font-bold mt-2">
                                                        -
                                                        {
                                                            ((item?.compareAtPrice - item?.basePrice) / item?.compareAtPrice * 100).toFixed(0)
                                                        }
                                                        %
                                                    </div>
                                                )
                                            }
                            </div> */}
                            <Image
                                className="w-full object-cover aspect-[300/349]"
                                src="/images/heroBannner.jpg"
                                width={300}
                                height={349}
                                alt="best seller"
                            />
                        </div>
                    </Link>
                    <div className="flex items-center gap-0.5 mt-3 mb-1">
                        {Array.from({ length: 5 }).map(
                            (_, index) => (
                                <Star width={16} height={16} key={index} className="text-[#343839] fill-[#343839]" />
                            )
                        )}
                        <span className="ml-1.5 font-inter text-sm font-medium">(5.00)</span>
                    </div>
                    <h2 className="text-[16px] font-semibold text-[#141718] leading-8">
                        Demo Product title
                    </h2>
                    <div className="flex items-center gap-3">
                        <p className="text-[14px] font-semibold text-[#141718]">
                            TK. 700
                        </p>
                        <p className="text-[14px] font-normal text-[#6C7275] line-through">
                            TK. 1000
                        </p>
                    </div>
                </div>
                <div>
                    <Link href="#">
                        <div className="relative group">
                            {/* <div className="absolute top-4 left-4 z-10">
                                            {
                                                item?.badge && (
                                                    <span className="bg-white font-inter text-[#121212] px-3 py-1 rounded-md text-sm font-bold uppercase">
                                                        {item?.badge}
                                                    </span>
                                                )
                                            }
                                            {
                                                item.compareAtPrice && (
                                                    <div className="bg-[#38CB89] font-inter text-white px-3 py-1 rounded-md text-sm font-bold mt-2">
                                                        -
                                                        {
                                                            ((item?.compareAtPrice - item?.basePrice) / item?.compareAtPrice * 100).toFixed(0)
                                                        }
                                                        %
                                                    </div>
                                                )
                                            }
                                        </div> */}
                            <Image
                                className="w-full object-cover aspect-[300/349]"
                                src="/images/heroBannner.jpg"
                                width={300}
                                height={349}
                                alt="best seller"
                            />
                        </div>
                    </Link>
                    <div className="flex items-center gap-0.5 mt-3 mb-1">
                        {Array.from({ length: 5 }).map(
                            (_, index) => (
                                <Star width={16} height={16} key={index} className="text-[#343839] fill-[#343839]" />
                            )
                        )}
                        <span className="ml-1.5 font-inter text-sm font-medium">(5.00)</span>
                    </div>
                    <h2 className="text-[16px] font-semibold text-[#141718] leading-8">
                        Demo Product title
                    </h2>
                    <div className="flex items-center gap-3">
                        <p className="text-[14px] font-semibold text-[#141718]">
                            TK. 700
                        </p>
                        <p className="text-[14px] font-normal text-[#6C7275] line-through">
                            TK. 1000
                        </p>
                    </div>
                </div>
                <div>
                    <Link href="#">
                        <div className="relative group">
                            {/* <div className="absolute top-4 left-4 z-10">
                                            {
                                                item?.badge && (
                                                    <span className="bg-white font-inter text-[#121212] px-3 py-1 rounded-md text-sm font-bold uppercase">
                                                        {item?.badge}
                                                    </span>
                                                )
                                            }
                                            {
                                                item.compareAtPrice && (
                                                    <div className="bg-[#38CB89] font-inter text-white px-3 py-1 rounded-md text-sm font-bold mt-2">
                                                        -
                                                        {
                                                            ((item?.compareAtPrice - item?.basePrice) / item?.compareAtPrice * 100).toFixed(0)
                                                        }
                                                        %
                                                    </div>
                                                )
                                            }
                                        </div> */}
                            <Image
                                className="w-full object-cover aspect-[300/349]"
                                src="/images/heroBannner.jpg"
                                width={300}
                                height={349}
                                alt="best seller"
                            />
                        </div>
                    </Link>
                    <div className="flex items-center gap-0.5 mt-3 mb-1">
                        {Array.from({ length: 5 }).map(
                            (_, index) => (
                                <Star width={16} height={16} key={index} className="text-[#343839] fill-[#343839]" />
                            )
                        )}
                        <span className="ml-1.5 font-inter text-sm font-medium">(5.00)</span>
                    </div>
                    <h2 className="text-[16px] font-semibold text-[#141718] leading-8">
                        Demo Product title
                    </h2>
                    <div className="flex items-center gap-3">
                        <p className="text-[14px] font-semibold text-[#141718]">
                            TK. 700
                        </p>
                        <p className="text-[14px] font-normal text-[#6C7275] line-through">
                            TK. 1000
                        </p>
                    </div>
                </div>
                <div>
                    <Link href="#">
                        <div className="relative group">
                            {/* <div className="absolute top-4 left-4 z-10">
                                            {
                                                item?.badge && (
                                                    <span className="bg-white font-inter text-[#121212] px-3 py-1 rounded-md text-sm font-bold uppercase">
                                                        {item?.badge}
                                                    </span>
                                                )
                                            }
                                            {
                                                item.compareAtPrice && (
                                                    <div className="bg-[#38CB89] font-inter text-white px-3 py-1 rounded-md text-sm font-bold mt-2">
                                                        -
                                                        {
                                                            ((item?.compareAtPrice - item?.basePrice) / item?.compareAtPrice * 100).toFixed(0)
                                                        }
                                                        %
                                                    </div>
                                                )
                                            }
                                        </div> */}
                            <Image
                                className="w-full object-cover aspect-[300/349]"
                                src="/images/heroBannner.jpg"
                                width={300}
                                height={349}
                                alt="best seller"
                            />
                        </div>
                    </Link>
                    <div className="flex items-center gap-0.5 mt-3 mb-1">
                        {Array.from({ length: 5 }).map(
                            (_, index) => (
                                <Star width={16} height={16} key={index} className="text-[#343839] fill-[#343839]" />
                            )
                        )}
                        <span className="ml-1.5 font-inter text-sm font-medium">(5.00)</span>
                    </div>
                    <h2 className="text-[16px] font-semibold text-[#141718] leading-8">
                        Demo Product title
                    </h2>
                    <div className="flex items-center gap-3">
                        <p className="text-[14px] font-semibold text-[#141718]">
                            TK. 700
                        </p>
                        <p className="text-[14px] font-normal text-[#6C7275] line-through">
                            TK. 1000
                        </p>
                    </div>
                </div>
                <div>
                    <Link href="#">
                        <div className="relative group">
                            {/* <div className="absolute top-4 left-4 z-10">
                                            {
                                                item?.badge && (
                                                    <span className="bg-white font-inter text-[#121212] px-3 py-1 rounded-md text-sm font-bold uppercase">
                                                        {item?.badge}
                                                    </span>
                                                )
                                            }
                                            {
                                                item.compareAtPrice && (
                                                    <div className="bg-[#38CB89] font-inter text-white px-3 py-1 rounded-md text-sm font-bold mt-2">
                                                        -
                                                        {
                                                            ((item?.compareAtPrice - item?.basePrice) / item?.compareAtPrice * 100).toFixed(0)
                                                        }
                                                        %
                                                    </div>
                                                )
                                            }
                                        </div> */}
                            <Image
                                className="w-full object-cover aspect-[300/349]"
                                src="/images/heroBannner.jpg"
                                width={300}
                                height={349}
                                alt="best seller"
                            />
                        </div>
                    </Link>
                    <div className="flex items-center gap-0.5 mt-3 mb-1">
                        {Array.from({ length: 5 }).map(
                            (_, index) => (
                                <Star width={16} height={16} key={index} className="text-[#343839] fill-[#343839]" />
                            )
                        )}
                        <span className="ml-1.5 font-inter text-sm font-medium">(5.00)</span>
                    </div>
                    <h2 className="text-[16px] font-semibold text-[#141718] leading-8">
                        Demo Product title
                    </h2>
                    <div className="flex items-center gap-3">
                        <p className="text-[14px] font-semibold text-[#141718]">
                            TK. 700
                        </p>
                        <p className="text-[14px] font-normal text-[#6C7275] line-through">
                            TK. 1000
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ShopProductCard;
