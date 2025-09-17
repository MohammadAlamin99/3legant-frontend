"use client";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import { Product } from "@/types/product.type";
import type { Swiper as SwiperType } from "swiper";
interface ProductDetailsProps {
  product: Product;
}
export default function ThumsSlider({ product }: ProductDetailsProps) {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);

  const images = [
    ...(product?.featureImage ? [{ url: product?.featureImage }] : []),
    ...(product?.images
      ? product.images.filter((img) => img.url !== product?.featureImage)
      : []),
  ];
  return (
    <>
      <div className="relative bg-gray-50 overflow-hidden w-full lg:h-[729px] h-[414px]">
        <div className="absolute top-8 left-8 z-10">
          {product?.badge && (
            <span className="bg-white font-inter text-[#121212] px-3 py-1 rounded-md text-sm font-bold uppercase">
              {product?.badge}
            </span>
          )}
          {product.compareAtPrice && (
            <div className="bg-[#38CB89] font-inter text-white px-3 py-1 rounded-md text-sm font-bold mt-2">
              -
              {(
                ((product?.compareAtPrice - product?.basePrice) /
                  product?.compareAtPrice) *
                100
              ).toFixed(0)}
              %
            </div>
          )}
        </div>
        <button className="absolute left-6 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md hover:shadow-lg transition-shadow z-10 cursor-pointer prev-btn">
          <ChevronLeft className="w-5 h-5 text-gray-600" />
        </button>
        <button className="absolute right-6 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md hover:shadow-lg transition-shadow z-10 cursor-pointer next-btn">
          <ChevronRight className="w-5 h-5 text-gray-600" />
        </button>
        <Swiper
          spaceBetween={10}
          navigation={{ nextEl: ".next-btn", prevEl: ".prev-btn" }}
          thumbs={{ swiper: thumbsSwiper }}
          modules={[FreeMode, Navigation, Thumbs]}
          className="mySwiper2"
        >
          {images?.map((item, i) => (
            <SwiperSlide key={i}>
              <div className="relative w-full lg:h-[729px] h-[414px]">
                <Image
                  src={item?.url}
                  fill
                  alt="feature image"
                  className="object-cover"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <Swiper
        onSwiper={(swiper) => setThumbsSwiper(swiper)}
        spaceBetween={24}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper"
      >
        {images?.map((item, i) => (
          <SwiperSlide key={i}>
            <div className="w-full xl:h-[167px] lg:h-[110px] md:h-[140px] sm:h-[120px] h-[80px] relative cursor-pointer">
              <Image objectFit="cover" src={item?.url} fill alt="thums image" />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
