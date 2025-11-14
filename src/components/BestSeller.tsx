import { getProduct } from "@/actions/product.action";
import { Product } from "@/types/product.type";
import CommonProductCard from "./Slider/CommonProductCard";
export default async function BestSeller() {
  const products: Product[] = await getProduct("best-seller", 1, 8);
  return (
    <>
      <div className="lg:px-3 md:px-3 sm:px-3 container mx-auto py-10 lg:py-12 px-8">
        <h2 className="text-[34px] lg:text-[40px] text-[#23262F] center font-poppins font-medium text-center mb-4 lg:mb-11">
          Best Seller
        </h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 lg:gap-6 md:gap-4 sm:gap-2 gap-2">
          {products &&
            products.map((item, i) => (
              <div key={i}>
                <CommonProductCard item={item} />
              </div>
            ))}
        </div>
      </div>
    </>
  );
}
