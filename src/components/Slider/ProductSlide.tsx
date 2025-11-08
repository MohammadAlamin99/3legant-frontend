"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import Image from "next/image";
import { Heart, Star } from "lucide-react";
import Link from "next/link";
import { Product } from "@/types/product.type";
import { useState } from "react";

interface SliderClientProps {
  products: Product[];
}
export default function ProductSlider({ products }: SliderClientProps) {
  const [data, setData] = useState<string>();
  console.log(data);
  const addToCart = (id: string) => {
    setData(id);
  };
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
            <div className="relative group">
              <Heart
                width={32}
                height={32}
                color="#6C7275"
                className="bg-white rounded-[50%] p-1.5 
                absolute top-4 z-30 right-4 opacity-0 group-hover:opacity-100 transition-all
                duration-300"
              />
              <div className="absolute top-4 left-4 z-10">
                {item?.badge && (
                  <span className="bg-white font-inter text-[#121212] px-3 py-1 rounded-md text-sm font-bold uppercase">
                    {item?.badge}
                  </span>
                )}
                {item.compareAtPrice && (
                  <div className="bg-[#38CB89] font-inter text-white px-3 py-1 rounded-md text-sm font-bold mt-2">
                    -
                    {(
                      ((item?.compareAtPrice - item?.basePrice) /
                        item?.compareAtPrice) *
                      100
                    ).toFixed(0)}
                    %
                  </div>
                )}
              </div>
              <Link href={`product/${item?._id}`}>
                <div className="relative w-full h-[308px] lg:h-[349px] md:h-[320px] sm:h-[310px]">
                  <Image
                    className="object-cover"
                    src={item.featureImage}
                    fill
                    alt={item.title}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
              </Link>

              <button
                onClick={() => addToCart(item?._id)}
                className="font-inter text-[#FEFEFE] text-[16px] font-medium bg-[#141718] 
                cursor-pointer leading-[28px] py-2.5 w-[80%] rounded-[8px] 
                absolute bottom-4 left-[50%] translate-x-[-50%] opacity-0 group-hover:opacity-100 transition-all duration-300"
              >
                Add to cart
              </button>
            </div>

            <div className="flex items-center gap-0.5 mt-3 mb-1">
              {Array.from({
                length: Math.floor(item?.rating?.average || 0),
              }).map((_, index) => (
                <Star
                  width={16}
                  height={16}
                  key={index}
                  className="text-[#343839] fill-[#343839]"
                />
              ))}
              {Array.from({
                length: 5 - Math.floor(item?.rating?.average || 0),
              }).map((_, index) => (
                <Star
                  width={16}
                  height={16}
                  key={index}
                  className="text-[#6C7275] fill-[#6C7275]"
                />
              ))}
              <span className="ml-1.5 font-inter text-sm font-medium">
                ({item?.rating?.average})
              </span>
            </div>
            <h2 className="text-[16px] font-semibold text-[#141718] leading-8">
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
