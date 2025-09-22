"use client";
import { getAllProduct } from "@/actions/product.action";
import Filter from "./Filter";
import ShopProductCard from "./ShopProductCard";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { getCollection } from "@/actions/collection.action";
import { useState } from "react";
import ShopProductSkeleton from "../Loading/ShopProductSkeleton";
import CategoryListSkeleton from "../Loading/CategoryListSkeleton";

export default function ShopProduct() {
  const [categoryId, setCategoryId] = useState<string>("");
  const [hasNext, setHasNext] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  console.log(currentPage)

  // product data query
  const limit = 2;
  const { data, isLoading, fetchNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["products"],
      queryFn: async ({ pageParam = 1 }) => {
        const result = await getAllProduct(pageParam as number, limit);
        setCurrentPage(pageParam);
        setHasNext(result.totalProducts > limit * pageParam);
        return result.products;
      },
      initialPageParam: 1,
      getNextPageParam: (lastPage, pages) => {
        return lastPage.length === limit ? pages.length + 1 : undefined;
      },
    });

  // category collection query
  const { data: categoryData, isLoading: isCategoryLoading } = useQuery({
    queryKey: ["categorys"],
    queryFn: () => getCollection("shop_by_category"),
  });
  const allProducts = data?.pages.flat() || [];

  // filter products by category
  const filterProducts = allProducts.filter((item) =>
    item?.collections?.includes(categoryId)
  );
  const productTshow = filterProducts.length > 0 ? filterProducts : allProducts;

  // cetegory handler
  const handleCategoryChange = (id: string) => {
    if(productTshow){
      setHasNext(productTshow.length > limit * currentPage);
    }
    setCategoryId(id);
  };

  // loading animation
  if (isLoading || isCategoryLoading) {
    return (
      <div className="container mx-auto xl:px-3 lg:px-3 md:px-3 sm:px-3 px-8 lg:py-[60px] py-[32px]">
        <div className="grid lg:grid-cols-[minmax(262px,_auto)_1fr] lg:gap-6 gap-0">
          <CategoryListSkeleton />
          <div className="w-full">
            <ShopProductSkeleton />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto xl:px-3 lg:px-3 md:px-3 sm:px-3 px-8 lg:py-[60px] py-[32px]">
      <div className="grid lg:grid-cols-[minmax(262px,_auto)_1fr] lg:gap-6 gap-0">
        <Filter
          categoryData={categoryData}
          handleCategoryChange={handleCategoryChange}
          categoryId={categoryId}
        />
        <div className="w-full">
          <ShopProductCard
            products={productTshow}
            fetchNextPage={() => fetchNextPage()}
            isFetchingNextPage={isFetchingNextPage}
             hasNextPage={hasNext}
          />
        </div>
      </div>
    </div>
  );
}
