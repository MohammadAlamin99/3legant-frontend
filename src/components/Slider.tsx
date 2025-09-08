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
      <div className="container mx-auto pt-12">
        <h2 className="text-[40px] font-medium font-poppins text-black mb-12">
          Just In
        </h2>
      </div>
      <div className="hamim">
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
