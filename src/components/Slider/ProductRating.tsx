import { Product } from '@/types/product.type';
import { Star } from 'lucide-react';
import React from 'react'

export default function ProductRating({item}: {item: Product}) {
  return (
    <>
     <div className={`flex items-center gap-0.5 mt-3 mb-1`}>
          {(() => {
            const rating = item?.rating?.average || 0;
            const fullStars = Math.floor(rating);
            const hasHalf = rating % 1 >= 0.5;
            const emptyStars = 5 - fullStars - (hasHalf ? 1 : 0);

            return (
              <>
                {Array.from({ length: fullStars }).map((_, i) => (
                  <Star
                    key={"full-" + i}
                    width={16}
                    height={16}
                    className="text-[#141718] fill-[#141718]"
                  />
                ))}
                {hasHalf && (
                  <div className="relative w-[16px] h-[16px]">
                    <Star
                      width={16}
                      height={16}
                      className="text-[#141718] fill-[#141718] absolute left-0 top-0"
                      style={{ clipPath: "inset(0 50% 0 0)" }} 
                    />
                    <Star
                      width={16}
                      height={16}
                      className="text-[#141718]"
                      fill="transparent"
                    />
                  </div>
                )}
                {Array.from({ length: emptyStars }).map((_, i) => (
                  <Star
                    key={"empty-" + i}
                    width={16}
                    height={16}
                    className="text-[#141718]"
                    fill="transparent"
                  />
                ))}
              </>
            );
          })()}

          <span className="ml-1.5 font-inter text-sm font-medium">
            ({item?.rating?.average})
          </span>
        </div>
    </>
  )
}
