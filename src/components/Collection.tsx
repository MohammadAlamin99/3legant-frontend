import { ArrowRight } from "lucide-react";
import Image from "next/image";
export default function Collection() {
  return (
    <>
      <div className="container mx-auto py-10 lg:py-12 lg:px-0 max-[640px]:px-8 grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 lg:gap-6 md:gap-4 sm:gap-4 gap-4">
        <div className="relative">
          <Image
            className="w-full"
            src="https://cdn.shopify.com/s/files/1/0766/5100/4159/files/Paste_image.png?v=1757519975"
            alt=""
            width={548}
            height={664}
          />
          <div className="absolute lg:left-12 lg:bottom-12 md:left-8 md:bottom-8 left-8 bottom-8">
            <h2 className="font-poppins text-[28px] text-white font-medium lg:text-[34px]">
              November Outfits
            </h2>
            <div className="relative w-fit">
              <button
                className="group items-center justify-center flex cursor-pointer gap-1 text-white text-[14px] font-semibold 
            before:content-[''] before:absolute before:left-0 before:bottom-0 before:h-[1px] 
            before:w-full before:bg-white"
                aria-label="Shop Now"
              >
                Collection
                <ArrowRight
                  className="transition-transform duration-300 group-hover:-rotate-45"
                  color="#FFFFFF"
                  width={18}
                  height={18}
                  strokeWidth={2}
                />
              </button>
            </div>
          </div>
        </div>
        <div className="relative">
          <Image
            className="w-full"
            src="https://cdn.shopify.com/s/files/1/0766/5100/4159/files/Paste_image.png?v=1757519975"
            alt=""
            width={548}
            height={664}
          />
          <div className="absolute lg:left-12 lg:bottom-12 md:left-8 md:bottom-8 left-8 bottom-8">
            <h2 className="font-poppins text-[28px] text-white font-medium lg:text-[34px]">
              November Outfits
            </h2>
            <div className="relative w-fit">
              <button
                className="group items-center justify-center flex cursor-pointer gap-1 text-white text-[14px] font-semibold 
            before:content-[''] before:absolute before:left-0 before:bottom-0 before:h-[1px] 
            before:w-full before:bg-white"
                aria-label="Shop Now"
              >
                Collection
                <ArrowRight
                  className="transition-transform duration-300 group-hover:-rotate-45"
                  color="#FFFFFF"
                  width={18}
                  height={18}
                  strokeWidth={2}
                />
              </button>
            </div>
          </div>
        </div>
        <div className="relative">
          <Image
            className="w-full"
            src="https://cdn.shopify.com/s/files/1/0766/5100/4159/files/Paste_image.png?v=1757519975"
            alt=""
            width={548}
            height={664}
          />
          <div className="absolute lg:left-12 lg:bottom-12 md:left-8 md:bottom-8 left-8 bottom-8">
            <h2 className="font-poppins text-[28px] text-white font-medium lg:text-[34px]">
              November Outfits
            </h2>
            <div className="relative w-fit">
              <button
                className="group items-center justify-center flex cursor-pointer gap-1 text-white text-[14px] font-semibold 
            before:content-[''] before:absolute before:left-0 before:bottom-0 before:h-[1px] 
            before:w-full before:bg-white"
                aria-label="Shop Now"
              >
                Collection
                <ArrowRight
                  className="transition-transform duration-300 group-hover:-rotate-45"
                  color="#FFFFFF"
                  width={18}
                  height={18}
                  strokeWidth={2}
                />
              </button>
            </div>
          </div>
        </div>
        <div className="relative">
          <Image
            className="w-full"
            src="https://cdn.shopify.com/s/files/1/0766/5100/4159/files/Paste_image.png?v=1757519975"
            alt=""
            width={548}
            height={664}
          />
          <div className="absolute lg:left-12 lg:bottom-12 md:left-8 md:bottom-8 left-8 bottom-8">
            <h2 className="font-poppins text-[28px] text-white font-medium lg:text-[34px]">
              November Outfits
            </h2>
            <div className="relative w-fit">
              <button
                className="group items-center justify-center flex cursor-pointer gap-1 text-white text-[14px] font-semibold 
            before:content-[''] before:absolute before:left-0 before:bottom-0 before:h-[1px] 
            before:w-full before:bg-white"
                aria-label="Shop Now"
              >
                Collection
                <ArrowRight
                  className="transition-transform duration-300 group-hover:-rotate-45"
                  color="#FFFFFF"
                  width={18}
                  height={18}
                  strokeWidth={2}
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
