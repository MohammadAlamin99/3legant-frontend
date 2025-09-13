import Image from "next/image";
import img from "../../public/images/promotion_video_Thummbnailbanner.jpg";

export default function InstaFeed() {
  return (
    <div className="container mx-auto xl:px-3 lg:px-3 md:px-3 sm:px-3 px-8 py-10">
      <h4 className="font-inter uppercase text-center font-bold text-[#6C7275]">
        newsfeed
      </h4>
      <h2 className="my-4 text-center text-[34px] leading-[110%] lg:text-[40px] md:text-[38px] font-medium font-poppins text-black lg:pl-0 md:pl-0 sm:pl-0 pl-8">
        Instagram
      </h2>
      <p className="text-center font-inter font-normal lg:text-[20px] text-[16px] text-[#141718] mb-4">
        Follow us on social media for more discount & promotions
      </p>
      <p className="text-center font-poppins font-medium lg:text-[20px] text-[16px] text-[#6C7275] mb-6">
        @3legant_official
      </p>
      <div className="grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-2 grid-cols-1 gap-6">
        <div className="w-full lg:h-[262px]">
            <Image src={img} alt="instagram image" />
        </div>
        <div className="w-full lg:h-[262px]">
            <Image src={img} alt="instagram image" />
        </div>
        <div className="w-full lg:h-[262px]">
            <Image src={img} alt="instagram image" />
        </div>
        <div className="w-full lg:h-[262px]">
            <Image src={img} alt="instagram image" />
        </div>
      </div>
    </div>
  );
}
