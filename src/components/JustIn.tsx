import "swiper/css";
import "swiper/css/pagination";
import ProductSlider from "./Slider/ProductSlide";
import { getProduct } from "@/actions/product.action";
export default async function JustIn() {
  const products = await getProduct();
  return (
    <>
      <div className="container mx-auto lg:pt-12 pt-8 flex justify-between items-start lg lg:pr-0 md:pr-0 sm:pr-0 pr-8">
        <h2 className="text-[34px] leading-[110%] lg:text-[40px] md:text-[38px] font-medium font-poppins text-black lg:mb-12 md:mb-10 mb-10 lg:pl-0 md:pl-0 sm:pl-0 pl-8">
          Just In
        </h2>
        <div id="main_bullets" className="mt-2.5"></div>
      </div>
      <div
        className="ml-[calc((100%-1536px)/2)] max-[1535px]:ml-[calc((100%-1280px)/2)] 
      max-[1280px]:ml-[calc((100%-1024px)/2)] max-[1023px]:ml-[calc((100%-768px)/2)] max-[768px]:ml-[calc((100%-640px)/2)] max-[640px]:ml-8 lg:pb-12 md:pb-12 pb-8"
      >
        <ProductSlider products={products}/>      
      </div>
    </>
  );
}
