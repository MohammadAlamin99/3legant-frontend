import Image from "next/image";
import img from "../../public/images/promotion_banner.jpg"
import { ArrowRight } from "lucide-react";
export default function PromotionBanner() {
    return (
        <div>
            <div className="w-full grid grid-cols-1 md:grid-cols-2">
                <div className="relative w-full h-[300px] md:h-[532px]">
                    <Image
                        src={img}
                        alt="banner"
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 50vw"
                    />
                </div>
                <div className="flex flex-col items-start justify-center px-8 py-12 lg:pl-16 bg-[#F3F5F7] text-[#FEFEFE]">
                    <h4 className="font-poppins font-bold text-[16px] text-[#377DFF]">SALE UP TO 35% OFF</h4>
                    <p className="font-inter text-[34px] lg:text-[40px] max-w-[424px] text-[#141718] leading-[44px] mb-4 mt-4">
                        HUNDREDS of New lower prices!
                    </p>
                    <p className="font-poppins text-[20px] text-[#141718] mb-6">Hurry up!!! Winter is coming!</p>
                    <div className="relative z-10 w-fit">
                        <button
                            className="group items-center justify-center flex cursor-pointer gap-1 text-[#141718] text-[14px] font-semibold 
                        before:content-[''] before:absolute before:left-0 before:bottom-0 before:h-[1px] 
                        before:w-full before:bg-[#141718]"
                            aria-label="Shop Now"
                        >
                            Shop Now
                            <ArrowRight
                                className="transition-transform duration-300 group-hover:-rotate-45"
                                color="#141718"
                                width={18}
                                height={18}
                                strokeWidth={2}
                            />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

