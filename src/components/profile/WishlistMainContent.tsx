"use client";

import { X } from "lucide-react";
import Image from "next/image";

export default function WishlistMainContent() {
  // Static demo data (no logic)
  const wishlist = [
    {
      id: 1,
      product: {
        image: "/images/insta2.jpg",
        title: "Modern Shirt",
        price: 2500,
      },
      color: "Navy",
    },
    {
      id: 2,
      product: {
        image: "/images/insta2.jpg",
        title: "Casual Pants",
        price: 3200,
      },
      color: "Gray",
    },
  ];

  return (
    <div className="lg:col-span-3">
      <div className="w-full">
        <h2 className="text-[20px] font-semibold text-black mb-10 font-inter">
          Your Wishlist
        </h2>

        <div className="w-full">
          {/* Header */}
          <div className="hidden md:grid grid-cols-3 border-b border-gray-200 pb-2 mb-2 font-inter">
            <div className="text-sm text-gray-500 font-medium">Product</div>
            <div className="text-sm text-gray-500 font-medium">Price</div>
            <div className="text-sm text-gray-500 font-medium">Action</div>
          </div>

          {/* Items */}
          {wishlist.map((item) => (
            <div
              key={item.id}
              className="grid md:grid-cols-3 items-center py-6 border-b border-gray-200 md:gap-0 gap-4"
            >
              {/* Product Info */}
              <div className="flex items-center space-x-4">
                {/* Remove Icon (no action) */}
                <X className="w-5 h-5 text-gray-500 hover:text-gray-700 cursor-pointer" />

                {/* Product Image */}
                <div className="w-[60px] h-[72px] bg-gray-100 overflow-hidden flex items-center justify-center">
                  <Image
                    src={item.product.image}
                    alt={item.product.title}
                    width={60}
                    height={72}
                    className="object-contain"
                  />
                </div>

                {/* Details */}
                <div className="flex flex-col gap-1">
                  <h3 className="text-[14px] font-semibold text-gray-900 font-inter">
                    {item.product.title}
                  </h3>
                  <p className="text-[12px] text-gray-500 font-inter">
                    Color: {item.color}
                  </p>
                </div>
              </div>

              {/* Price */}
              <div className="text-[14px] text-gray-800 font-medium md:text-left text-center font-inter">
                TK. {item.product.price}
              </div>

              {/* Action */}
              <div className="md:text-left text-center">
                <button
                  type="button"
                  className="bg-gray-900 font-inter cursor-pointer text-white text-[14px] font-medium px-6 py-2 rounded-lg"
                >
                  Order Now
                </button>
              </div>
            </div>
          ))}

          {/* Empty State */}
          {wishlist.length === 0 && (
            <p className="text-gray-500 text-sm mt-4">
              Your wishlist is empty.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
