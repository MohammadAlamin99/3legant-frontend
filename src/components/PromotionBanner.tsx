import Image from "next/image";
import img from "../../public/images/insta2.jpg";
import CommonButton2 from "./button/CommonButton2";
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
          <h2 className="font-poppins font-bold text-[16px] text-[#377DFF]">
            SALE UP TO 35% OFF
          </h2>
          <h3 className="font-inter text-[34px] lg:text-[40px] max-w-[424px] text-[#141718] leading-[44px] mb-4 mt-4">
            HUNDREDS of New lower prices!
          </h3>
          <p className="font-poppins text-[20px] text-[#141718] mb-6">
            Hurry up!!! Winter is coming!
          </p>
          <div className="relative z-10 w-fit">
            <CommonButton2
              url="/shop"
              buttonText="Shop Now"
              color="#141718"
              bgColor="#141718"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
