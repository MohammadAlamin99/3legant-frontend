"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import { Product } from "@/types/product.type";
import CommonProductCard from "./CommonProductCard";

interface SliderClientProps {
  products: Product[];
}
export default function ProductSlider({ products }: SliderClientProps) {
  return (
    <Swiper
      spaceBetween={16}
      slidesPerView={1.5}
      modules={[Pagination]}
      pagination={{
        el: "#main_bullets",
        clickable: true,
        renderBullet: function (index, className) {
          return `<span class="custom-bullet ${className}"></span>`;
        },
      }}
      breakpoints={{
        640: { slidesPerView: 1.5, spaceBetween: 16 },
        768: { slidesPerView: 2.5, spaceBetween: 24 },
        1024: { slidesPerView: 4.5, spaceBetween: 24 },
        1280: { slidesPerView: 5.5, spaceBetween: 24 },
      }}
    >
      {products &&
        products.map((item, i) => (
          <SwiperSlide key={i}>
            {/* product card */}
            <CommonProductCard item={item} />
          </SwiperSlide>
        ))}
    </Swiper>
  );
}
