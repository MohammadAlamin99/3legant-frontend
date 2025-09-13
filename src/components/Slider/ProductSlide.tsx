"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import Image from "next/image";
import { Heart, Star } from "lucide-react";
import Link from "next/link";
import { Product } from "@/types/product.type";

interface SliderClientProps {
  products: Product[];
}
export default function ProductSlider({ products }: SliderClientProps) {
  return (
    <Swiper
      spaceBetween={16}
      slidesPerView={1.5}
      modules={[Pagination]}
      breakpoints={{
        640: { slidesPerView: 1.5, spaceBetween: 16 },
        768: { slidesPerView: 2.5, spaceBetween: 24 },
        1024: { slidesPerView: 4.5, spaceBetween: 24 },
      }}
    >
      {products.map((item, i) => (
        <SwiperSlide key={i}>
          <Link href="#">
            <div className="relative group">
              <Heart
                width={32}
                height={32}
                color="#6C7275"
                className="bg-white rounded-[50%] p-1.5 
                absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all
                duration-300"
              />
              <div className="w-full h-[308px] lg:[349px]">
                <Image
                  className="object-cover"
                  src={item.featureImage}
                  fill
                  alt={item.title}
                />
              </div>
              <button
                className="font-inter text-[#FEFEFE] text-[16px] font-medium bg-[#141718] 
                cursor-pointer leading-[28px] py-2.5 w-[80%] rounded-[8px] 
                absolute bottom-4 left-[50%] translate-x-[-50%] opacity-0 group-hover:opacity-100 transition-all duration-300"
              >
                Add to cart
              </button>
            </div>
          </Link>
          <div className="flex items-center gap-0.5 mt-3 mb-1">
            {Array.from({ length: Math.floor(item?.rating?.average || 0) }).map(
              (_, index) => (
                <Star key={index} width={16} height={16} />
              )
            )}
            {Array.from({
              length: 5 - Math.floor(item?.rating?.average || 0),
            }).map((_, index) => (
              <Star
                key={index}
                width={16}
                height={16}
                className="text-[#6C7275]"
              />
            ))}
            <span className="ml-1.5">({item?.rating?.average})</span>
          </div>
          <h2 className="text-[16px] font-semibold text-[#141718]">
            {item?.title}
          </h2>
          <div className="flex items-center gap-3">
            <p className="text-[14px] font-semibold text-[#141718]">
              TK. {item?.basePrice}
            </p>
            <p className="text-[14px] font-normal text-[#6C7275] line-through">
              TK. {item?.compareAtPrice}
            </p>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
