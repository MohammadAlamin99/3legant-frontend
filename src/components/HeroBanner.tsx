import Link from "next/link";
import bannerImg from "../../public/images/Hero_banner.png";
import Image from "next/image";
export default function HeroBanner() {
  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-2">
      <div className="relative w-full h-[300px] md:h-[820px]">
        <Image
          src={bannerImg}
          alt="banner"
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>
      <div className="flex flex-col items-start justify-center px-8 py-12 lg:pl-16 bg-[#171D28] text-[#FEFEFE]">
        <h1 className="font-poppins font-medium max-w-[400px] leading-[44px] lg:leading-[72px] md:leading-[72px] text-[40px] mb-2.5 lg:text-[72px] md:text-[64px] sm:text-[40px]">
          Bring the warmth.
        </h1>
        <p className="font-inter text-[16px] lg:text-[20px] max-w-[424px] mb-7">
          Everyone needs a good winter jacket. Find yours with our collection
          and more.
        </p>
        <Link href={"/shop"}>
          <button className="px-14 py-3 bg-[#377DFF] rounded-[8px] font-inter text-[14px] md:text-[16px] lg:text-[18px] font-medium cursor-pointer relative overflow-hidden group">
            <span className="relative z-10">Shopping Now</span>
            <span className="absolute inset-0 bg-white/20 backdrop-blur-md border border-white/30 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500 ease-out"></span>
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-[-20deg] translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out"></span>
          </button>
        </Link>
      </div>
    </div>
  );
}
