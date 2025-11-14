import { HeartCrack } from "lucide-react";
import React from "react";

export default function EmptyWishlist() {
  return (
    <>
      <div className="flex flex-col gap-2 items-center justify-center py-20">
        {/* Icon */}
        <HeartCrack width={32} height={32} />
        {/* Main Text */}
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2 font-inter">
          Your Wishlist is Empty
        </h2>

        {/* Sub Text */}
        <p className="text-gray-500 text-sm md:text-base text-center mb-6 px-4">
          Looks like you haven’t added any products yet. Start exploring and add
          your favorite items!
        </p>

        {/* Button */}
        <a
          href="/shop"
          className="bg-[#141718] transition-colors duration-300 text-white font-medium px-6 py-3 rounded-lg shadow-md font-inter"
        >
          Go Shopping
        </a>
      </div>
    </>
  );
}
