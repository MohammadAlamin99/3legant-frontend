// import { ChevronRight } from "lucide-react";
// import Link from "next/link";

export default function Banner() {
  return (
    <section className="h-[60vh] bg-[url('/images/shopbanner.jpg')] bg-center bg-no-repeat bg-cover flex items-center justify-center">
      <div className="text-center">
        {/* Breadcrumb */}
        {/* <div className="flex justify-center items-center">
          <Link
            href="/"
            className="flex items-center gap-1 text-white font-inter text-sm font-medium"
          >
            Home
            <ChevronRight width={18} height={18} />
          </Link>
          <h4 className="ml-4 text-white font-inter text-sm font-medium">
            Shop
          </h4>
        </div> */}

        {/* Title */}
        {/* <h2 className="text-white text-[54px] font-medium leading-[58px] tracking-[-1px] py-6 max-md:text-[44px] max-sm:text-[34px] max-sm:leading-[120%] max-sm:py-3">
                    Shop Page
                </h2> */}

        {/* Subtitle */}
        {/* <p className="text-white text-base max-md:text-lg max-sm:text-sm">
                    Let’s design the place you always imagined.
                </p> */}
      </div>
    </section>
  );
}
