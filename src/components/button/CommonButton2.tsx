import { ArrowRight } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function CommonButton2({
  url,
  buttonText,
  color,
  bgColor,
}: {
  url?: string;
  buttonText: string;
  color?: string;
  bgColor?: string;
}) {
  return (
    <div>
      <div className="w-fit">
        <Link href={url || ""}>
          <button
            className={`relative group items-center justify-center flex cursor-pointer gap-1 text-[${color}] text-[14px] font-semibold 
            before:content-[''] before:absolute before:left-0 before:bottom-0 before:h-[1px] before:w-full before:bg-[${bgColor}]`}
            aria-label="Shop Now"
          >
            {buttonText}
            <ArrowRight
              className="transition-transform duration-300 group-hover:-rotate-45"
              color={color}
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
