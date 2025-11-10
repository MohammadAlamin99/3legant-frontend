import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function CommonButton() {
  return (
    <div>
      <div className="relative overflow-hidden">
        <Link href={"/shop"}>
          <button
            className="group items-center justify-center hidden lg:flex cursor-pointer gap-1 
                        text-white text-[14px] font-semibold 
                        before:content-[''] before:absolute before:left-0 before:bottom-0 before:h-[1px] 
                        before:w-0 before:bg-white before:transition-all before:duration-300 
                        hover:before:w-full"
            aria-label="Shop Now"
          >
            Shop Now
            <ArrowRight
              className="transition-transform duration-300 group-hover:-rotate-45"
              color="#FFFFFF"
              width={18}
              height={18}
              strokeWidth={2}
            />
          </button>
        </Link>
      </div>
    </div>
  );
}
