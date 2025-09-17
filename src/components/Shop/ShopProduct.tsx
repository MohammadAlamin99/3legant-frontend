import { getAllProduct } from "@/actions/product.action";
import Filter from "./Filter";
import ShopProductCard from "./ShopProductCard";
import { Suspense } from "react";
import ProductSliderSkeleton from "../Loading/ProductSliderSkeleton";
export default async function ShopProduct() {
  const products = await getAllProduct(1, 10);
  return (
    <div className="container mx-auto xl:px-3 lg:px-3 md:px-3 sm:px-3 px-8 lg:py-[60px] py-[32px]">
      <div className="grid lg:grid-cols-[minmax(262px,_auto)_1fr] lg:gap-6 gap-0">
        <div className="">
          <Filter />
        </div>
        <div className="w-full">
          <Suspense fallback={<ProductSliderSkeleton />}>
            <ShopProductCard products={products} />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
