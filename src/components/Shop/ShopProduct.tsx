'use client'
import { getAllProduct } from "@/actions/product.action";
import Filter from "./Filter";
import ShopProductCard from "./ShopProductCard";
import ShopProductSkeleton from "../Loading/ShopProductSkeleton";
import { useInfiniteQuery } from "@tanstack/react-query";

export default function ShopProduct() {
  const limit = 6;

  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery({
    queryKey: ["products"],
    queryFn: ({ pageParam }) => getAllProduct(pageParam as number, limit),
    initialPageParam: 1,
    getNextPageParam: (lastPage, pages) => {
      return lastPage.length === limit ? pages.length + 1 : undefined;
    }
  })

  if (isLoading) return <ShopProductSkeleton />;

  const allProducts = data?.pages.flat() || [];
  return (
    <div className="container mx-auto xl:px-3 lg:px-3 md:px-3 sm:px-3 px-8 lg:py-[60px] py-[32px]">
      <div className="grid lg:grid-cols-[minmax(262px,_auto)_1fr] lg:gap-6 gap-0">
        <Filter />
        <div className="w-full">
          <ShopProductCard
            products={allProducts}
            loadMore={() => fetchNextPage()}
            isFetchingNextPage={isFetchingNextPage}
            hasNextPage={hasNextPage}
          />
        </div>
      </div>
    </div>
  );
}
