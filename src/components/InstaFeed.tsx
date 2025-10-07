import Image from "next/image";
import img from "../../public/images/promotion_video_Thummbnailbanner.jpg";
import Link from "next/link";

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
        <div className="w-full lg:h-[262px] relative">
          <Link href={"https://www.instagram.com/reel/DPG4nt2j5LG/?utm_source=ig_web_copy_link"}>
            <Image src={img} className="object-cover" fill alt="instagram image" />
          </Link>
        </div>
        <div className="w-full lg:h-[262px] relative">
          <Link href={"https://www.instagram.com/reel/DPG4nt2j5LG/?utm_source=ig_web_copy_link"}>
            <Image src={img} className="object-cover" fill alt="instagram image" />
          </Link>
        </div>
        <div className="w-full lg:h-[262px] relative">
          <Link href={"https://www.instagram.com/reel/DPG4nt2j5LG/?utm_source=ig_web_copy_link"}>
            <Image src={img} className="object-cover" fill alt="instagram image" />
          </Link>
        </div>
        <div className="w-full lg:h-[262px] relative">
          <Link href={"https://www.instagram.com/reel/DPG4nt2j5LG/?utm_source=ig_web_copy_link"}>
            <Image src={img} className="object-cover" fill alt="instagram image" />
          </Link>
        </div>
      </div>
    </div>
  );
}

