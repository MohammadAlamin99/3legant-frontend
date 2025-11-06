import "swiper/css";
import "swiper/css/pagination";
import ProductSlider from "./Slider/ProductSlide";
import { getProduct } from "@/actions/product.action";
import { Suspense } from "react";
import ProductSliderSkeleton from "./Loading/ProductSliderSkeleton";

async function ProductSliderWrapper() {
  const products = await getProduct("justin", 1, 10);
  return <ProductSlider products={products} />
}
export default function JustIn() {
  return (
    <>
      <div className="lg:px-3 md:px-3 sm:px-3 container mx-auto lg:pt-12 pt-8 flex justify-between items-start just-in-section">
        <h2 className="text-[34px] leading-[110%] lg:text-[40px] md:text-[38px] font-medium font-poppins text-black lg:mb-12 md:mb-10 mb-10 lg:pl-0 md:pl-0 sm:pl-0 pl-8">
          Just In
        </h2>
        <div id="main_bullets" className="mt-2.5"></div>
      </div>
      <div className="pl-0 md:pl-3 sm:pl-3 ml-[calc((100%-1536px)/2)] max-[1536px]:ml-[calc((100%-1280px)/2)] max-[1280px]:ml-[calc((100%-1024px)/2)] max-[1023px]:ml-[calc((100%-768px)/2)] max-[768px]:ml-[calc((100%-640px)/2)] max-[640px]:ml-8 lg:pb-12 md:pb-12 pb-8">
        <Suspense fallback={<ProductSliderSkeleton />}>
          <ProductSliderWrapper />
        </Suspense>
      </div>
    </>
  );
}
