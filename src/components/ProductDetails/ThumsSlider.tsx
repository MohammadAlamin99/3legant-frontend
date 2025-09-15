"use client";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import img from "../../../public/images/promotion_banner.jpg";
import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";

export default function ThumsSlider() {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  return (
    <>
      <div className="relative bg-gray-50 overflow-hidden w-full lg:h-[729px] h-[414px]">
        <div className="absolute top-8 left-8 z-10">
          <span className="bg-white font-inter text-[#121212] px-3 py-1 rounded-md text-[18px] font-bold">
            NEW
          </span>
          <div className="bg-emerald-500 font-inter text-white px-3 py-1 rounded-md text-sm font-bold mt-2">
            -50%
          </div>
        </div>
        <button className="absolute left-6 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md hover:shadow-lg transition-shadow z-10 cursor-pointer prev-btn">
          <ChevronLeft className="w-5 h-5 text-gray-600" />
        </button>
        <button className="absolute right-6 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md hover:shadow-lg transition-shadow z-10 cursor-pointer next-btn">
          <ChevronRight className="w-5 h-5 text-gray-600" />
        </button>
        <Swiper
          spaceBetween={10}
          navigation={{nextEl:".next-btn", prevEl:".prev-btn"}}
          thumbs={{ swiper: thumbsSwiper }}
          modules={[FreeMode, Navigation, Thumbs]}
          className="mySwiper2"
        >
          {Array.from({ length: 6 }).map((_, i) => (
            <SwiperSlide key={i}>
              <div className="relative w-full lg:h-[729px] h-[414px]">
                <Image src={img} fill alt="img" className="object-cover" />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <Swiper
        onSwiper={(swiper) => setThumbsSwiper(swiper as any)}
        spaceBetween={24}
        slidesPerView={3}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper"
      >
        {Array.from({ length: 6 }).map((_, i) => (
          <SwiperSlide key={i}>
            <div className="w-full lg:h-[167px] md:h-[157px] sm:h-[120px] h-[100px] relative">
              <Image objectFit="cover" src={img} fill alt="img" />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
