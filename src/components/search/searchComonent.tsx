"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Heart, Star } from "lucide-react";

const SearchComonent = () => {
  // Static products example
  const products = [
    {
      _id: "1",
      title: "Product 1",
      basePrice: 1200,
      compareAtPrice: 1500,
      featureImage: "https://cdn.shopify.com/s/files/1/0766/5100/4159/files/panjabi2.jpg?v=1759054927",
      rating: { average: 4.5 },
      badge: "New",
    },
    {
      _id: "2",
      title: "Product 2",
      basePrice: 800,
      compareAtPrice: 1000,
      featureImage: "https://cdn.shopify.com/s/files/1/0766/5100/4159/files/panjabi2.jpg?v=1759054927",
      rating: { average: 4.0 },
      badge: "",
    },
    {
      _id: "3",
      title: "Product 3",
      basePrice: 500,
      compareAtPrice: 700,
      featureImage: "https://cdn.shopify.com/s/files/1/0766/5100/4159/files/panjabi2.jpg?v=1759054927",
      rating: { average: 3.5 },
      badge: "Sale",
    },
    {
      _id: "4",
      title: "Product 3",
      basePrice: 500,
      compareAtPrice: 700,
      featureImage: "https://cdn.shopify.com/s/files/1/0766/5100/4159/files/panjabi2.jpg?v=1759054927",
      rating: { average: 3.5 },
      badge: "Sale",
    },
  ];

  return (
    <div className="container mx-auto py-8 md:px-3 sm:px-3 px-8">
      {/* Search Bar */}
      <div className="flex gap-2 mb-8 justify-center">
        <input
          type="text"
          placeholder="Search products..."
          className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#141718]"
        />
        <button className="bg-[#141718] text-white px-6 py-2 rounded-md font-semibold">
          Search
        </button>
      </div>

      {/* Product Cards */}
      <div className="grid grid-cols-2 gap-2 lg:grid-cols-4 lg:gap-6">
        {products.map((item) => (
          <div key={item._id}>
            <div className="relative group">
              <Heart
                width={32}
                height={32}
                color="#6C7275"
                className="bg-white rounded-full p-1.5
                absolute top-4 z-30 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300"
              />
              <div className="absolute top-4 left-4 z-10">
                {item.badge && (
                  <span className="bg-white font-inter text-[#121212] px-3 py-1 rounded-md text-sm font-bold uppercase">
                    {item.badge}
                  </span>
                )}
                {item.compareAtPrice && (
                  <div className="bg-[#38CB89] font-inter text-white px-3 py-1 rounded-md text-sm font-bold mt-2">
                    -
                    {(
                      ((item.compareAtPrice - item.basePrice) / item.compareAtPrice) *
                      100
                    ).toFixed(0)}
                    %
                  </div>
                )}
              </div>
              <Link href={`/product/${item._id}`}>
                <Image
                  className="w-full object-cover aspect-[300/349]"
                  src={item.featureImage}
                  width={300}
                  height={349}
                  alt={item.title}
                />
              </Link>
              <button
                className="font-inter text-[#FEFEFE] text-[16px] font-medium bg-[#141718]
                cursor-pointer leading-[28px] py-2.5 w-[80%] rounded-[8px]
                absolute bottom-4 left-[50%] translate-x-[-50%] opacity-0 group-hover:opacity-100 transition-all duration-300"
              >
                Add to cart
              </button>
            </div>
            <div className="flex items-center gap-0.5 mt-3 mb-1">
              {Array.from({ length: 5 }).map((_, index) => (
                <Star
                  width={16}
                  height={16}
                  key={index}
                  className="text-[#343839] fill-[#343839]"
                />
              ))}
              <span className="ml-1.5 font-inter text-sm font-medium">
                ({item.rating.average})
              </span>
            </div>
            <h2 className="text-[16px] font-semibold text-[#141718] leading-8">
              {item.title}
            </h2>
            <div className="flex items-center gap-3">
              <p className="text-[14px] font-semibold text-[#141718]">
                TK. {item.basePrice}
              </p>
              <p className="text-[14px] font-normal text-[#6C7275] line-through">
                TK. {item.compareAtPrice}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchComonent;
