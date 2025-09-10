"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import Image from "next/image";
import dammyprodcut from "../../public/images/dammy_product.png";
import { Heart, Star } from "lucide-react";
import Link from "next/link";
import { Product } from "@/types/product.type";

interface SliderProps {
  products: Product[];
}

export default function Slider({ products }: SliderProps) {
  return (
    <>
      <div className="container mx-auto lg:pt-12 pt-8 flex justify-between items-start lg lg:pr-0 md:pr-0 sm:pr-0 pr-8">
        <h2 className="text-[34px] leading-[110%] lg:text-[40px] md:text-[38px] font-medium font-poppins text-black lg:mb-12 md:mb-10 mb-10 lg:pl-0 md:pl-0 sm:pl-0 pl-8">
          Just In
        </h2>
        <div id="main_bullets" className="mt-2.5"></div>
      </div>
      <div
        className="ml-[calc((100%-1536px)/2)] max-[1535px]:ml-[calc((100%-1280px)/2)] 
      max-[1280px]:ml-[calc((100%-1024px)/2)] max-[1023px]:ml-[calc((100%-768px)/2)] max-[768px]:ml-[calc((100%-640px)/2)] max-[640px]:ml-8 lg:pb-12 md:pb-12 pb-8"
      >
        <Swiper
          spaceBetween={16}
          slidesPerView={1.5}
          loop={false}
          modules={[Pagination]}
          pagination={{
            el: "#main_bullets",
            clickable: true,
            bulletClass: "custom-bullet",
            bulletActiveClass: "custom-bullet-active",
          }}
          breakpoints={{
            640: { slidesPerView: 1.5, spaceBetween: 16 },
            768: { slidesPerView: 2.5, spaceBetween: 24 },
            1024: { slidesPerView: 4.5, spaceBetween: 24 },
          }}
        >
          {products &&
            products.map((item, i) => (
              <SwiperSlide key={i}>
                <Link href="#">
                  <div className="relative group">
                    <div className="absolute top-4 left-4 flex flex-col gap-2">
                      <span className="px-3.5 py-1 bg-white font-inter text-[16px] font-bold rounded-[4px]">
                        NEW
                      </span>
                      <span className="px-3.5 py-1 bg-[#38CB89] text-white font-inter text-[16px] font-bold rounded-[4px]">
                        -{" "}
                        {Math.round(
                          (((item?.compareAtPrice || 0) - item?.basePrice) /
                            (item?.compareAtPrice || 0)) *
                            100
                        )}
                        %
                      </span>
                    </div>
                    <Heart
                      width={32}
                      height={32}
                      color="#6C7275"
                      className="bg-white rounded-[50%] p-1.5 
                      absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all
                      duration-300"
                    />
                    <Image
                      className="w-full h-auto"
                      src={item?.featureImage}
                      width={300}
                      height={349}
                      alt={item?.title || "Feature image"}
                    />
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
                  {Array.from({
                    length: Math.floor(item?.rating?.average || 0),
                  }).map((_, index) => (
                    <Star key={index} width={16} height={16} />
                  ))}
                  {/* Show empty stars for remaining */}
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
                  <span className="text-[14px] font-inter text-[#000] font-semibold ml-1.5">
                    ({item?.rating?.average})
                  </span>
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
      </div>
    </>
  );
}
