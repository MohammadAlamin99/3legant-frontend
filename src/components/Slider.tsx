"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import Image from "next/image";
import dammyprodcut from "../../public/images/dammy_product.png";
import { Star } from "lucide-react";

export default function Slider() {
  return (
    <>
      <div className="container mx-auto lg:pt-12 pt-8">
        <h2 className="text-[34px] lg:text-[40px] md:text-[38px] font-medium font-poppins text-black lg:mb-12 md:mb-10 mb-10 lg:pl-0 md:pl-0 sm:pl-0 pl-8">
          Just In
        </h2>
      </div>
      <div className="ml-[calc((100%-1536px)/2)] max-[1535px]:ml-[calc((100%-1280px)/2)] 
      max-[1279px]:ml-[calc((100%-1024px)/2)] max-[1023px]:ml-[calc((100%-768px)/2)] max-[768px]:ml-[calc((100%-640px)/2)] max-[640px]:ml-8 lg:pb-12 md:pb-12 pb-8">
        <Swiper
          spaceBetween={16}
          slidesPerView={1.5}
          loop={false}
          modules={[Pagination]}
          pagination={{
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
          <SwiperSlide>
            <div className="relative">
              <span className="px-3.5 py-1 bg-white font-inter text-[16px] font-bold absolute left-4 top-4 rounded-[4px]">
                NEW
              </span>
              <Image
                className="w-full"
                src={dammyprodcut}
                height={349}
                alt=""
              />
            </div>
            <div className="flex items-center gap-0.5 mt-3 mb-1">
              <Star width={16} height={16} />
              <Star width={16} height={16} />
              <Star width={16} height={16} />
              <Star width={16} height={16} />
              <Star width={16} height={16} />
            </div>
            <h4 className="text-[16px] font-semibold text-[#141718]">
              96 Nuptse Dip Dye Korea Puffers Jacket
            </h4>
            <h4 className="text-[14px] font-semibold text-[#141718]">
              $400.00
            </h4>
          </SwiperSlide>
          <SwiperSlide>
            <div className="relative">
              <span className="px-3.5 py-1 bg-white font-inter text-[16px] font-bold absolute left-4 top-4 rounded-[4px]">
                NEW
              </span>
              <Image
                className="w-full"
                src={dammyprodcut}
                height={349}
                alt=""
              />
            </div>
            <div className="flex items-center gap-0.5 mt-3 mb-1">
              <Star width={16} height={16} />
              <Star width={16} height={16} />
              <Star width={16} height={16} />
              <Star width={16} height={16} />
              <Star width={16} height={16} />
            </div>
            <h4 className="text-[16px] font-semibold text-[#141718]">
              96 Nuptse Dip Dye Korea Puffers Jacket
            </h4>
            <h4 className="text-[14px] font-semibold text-[#141718]">
              $400.00
            </h4>
          </SwiperSlide>

          <SwiperSlide>
            <div className="relative">
              <span className="px-3.5 py-1 bg-white font-inter text-[16px] font-bold absolute left-4 top-4 rounded-[4px]">
                NEW
              </span>
              <Image
                className="w-full"
                src={dammyprodcut}
                height={349}
                alt=""
              />
            </div>
            <div className="flex items-center gap-0.5 mt-3 mb-1">
              <Star width={16} height={16} />
              <Star width={16} height={16} />
              <Star width={16} height={16} />
              <Star width={16} height={16} />
              <Star width={16} height={16} />
            </div>
            <h4 className="text-[16px] font-semibold text-[#141718]">
              96 Nuptse Dip Dye Korea Puffers Jacket
            </h4>
            <h4 className="text-[14px] font-semibold text-[#141718]">
              $400.00
            </h4>
          </SwiperSlide>

          <SwiperSlide>
            <div className="relative">
              <span className="px-3.5 py-1 bg-white font-inter text-[16px] font-bold absolute left-4 top-4 rounded-[4px]">
                NEW
              </span>
              <Image
                className="w-full"
                src={dammyprodcut}
                height={349}
                alt=""
              />
            </div>
            <div className="flex items-center gap-0.5 mt-3 mb-1">
              <Star width={16} height={16} />
              <Star width={16} height={16} />
              <Star width={16} height={16} />
              <Star width={16} height={16} />
              <Star width={16} height={16} />
            </div>
            <h4 className="text-[16px] font-semibold text-[#141718]">
              96 Nuptse Dip Dye Korea Puffers Jacket
            </h4>
            <h4 className="text-[14px] font-semibold text-[#141718]">
              $400.00
            </h4>
          </SwiperSlide>
          <SwiperSlide>
            <div className="relative">
              <span className="px-3.5 py-1 bg-white font-inter text-[16px] font-bold absolute left-4 top-4 rounded-[4px]">
                NEW
              </span>
              <Image
                className="w-full"
                src={dammyprodcut}
                height={349}
                alt=""
              />
            </div>
            <div className="flex items-center gap-0.5 mt-3 mb-1">
              <Star width={16} height={16} />
              <Star width={16} height={16} />
              <Star width={16} height={16} />
              <Star width={16} height={16} />
              <Star width={16} height={16} />
            </div>
            <h4 className="text-[16px] font-semibold text-[#141718]">
              96 Nuptse Dip Dye Korea Puffers Jacket
            </h4>
            <h4 className="text-[14px] font-semibold text-[#141718]">
              $400.00
            </h4>
          </SwiperSlide>

          <SwiperSlide>
            <div className="relative">
              <span className="px-3.5 py-1 bg-white font-inter text-[16px] font-bold absolute left-4 top-4 rounded-[4px]">
                NEW
              </span>
              <Image
                className="w-full"
                src={dammyprodcut}
                height={349}
                alt=""
              />
            </div>
            <div className="flex items-center gap-0.5 mt-3 mb-1">
              <Star width={16} height={16} />
              <Star width={16} height={16} />
              <Star width={16} height={16} />
              <Star width={16} height={16} />
              <Star width={16} height={16} />
            </div>
            <h4 className="text-[16px] font-semibold text-[#141718]">
              96 Nuptse Dip Dye Korea Puffers Jacket
            </h4>
            <h4 className="text-[14px] font-semibold text-[#141718]">
              $400.00
            </h4>
          </SwiperSlide>
        </Swiper>
      </div>
    </>
  );
}
