import React from "react";
import { IReview } from "@/types/review.type";
import ProductRating from "../Slider/ProductRating";
import Image from "next/image";
interface ReviewListProps {
  getReview: IReview[];
}
export default function ReviewList({ getReview }: ReviewListProps) {
  return (
    <>
      <h2 className="text-xl font-medium font-poppins mb-6">
        {getReview?.length || 0} Reviews
      </h2>
      <div className="space-y-6">
        {getReview &&
          getReview.map((item: IReview, i: number) => (
            <div
              key={i}
              className="flex max-[575px]:flex-col gap-6 border-b border-gray-200 pb-6"
            >
              <div className="relative flex-shrink-0 w-[72px] h-[72px]">
                <Image
                  className="rounded-full object-cover"
                  src={item?.user?.photo || "/images/userProfile.jpg"}
                  alt="Reviewer"
                  fill
                />
              </div>
              <div>
                <h3 className="text-lg font-inter font-semibold text-gray-900 mb-2">
                  {item?.user?.name || "Anonymous"}
                </h3>
                <ProductRating
                  item={{
                    _id: "review-" + i,
                    title: "",
                    description: "",
                    basePrice: 0,
                    featureImage: "",
                    metafields: [],
                    rating: { average: item?.rating || 0 },
                  }}
                />

                <p className="text-[#353945] font-inter font-normal text-sm">
                  {item?.comment || ""}
                </p>
              </div>
            </div>
          ))}
      </div>
    </>
  );
}
