"use client";
import { getAllProduct, getProductByCollectionID } from "@/actions/product.action";
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
  const [hasNextCat, setHasNextCat] = useState<boolean>(true);

  // product data query
  const limit = 9;
  const { data, isLoading, fetchNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["products"],
      queryFn: async ({ pageParam = 1 }) => {
        const result = await getAllProduct(pageParam as number, limit);
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


  // product filter by collection id query
  const { data: collectionProduct, isLoading: isCatProductLoading, fetchNextPage: catNextPage, isFetchingNextPage: isCatFatchingNextPage } = useInfiniteQuery({
    queryKey: ["collectionProduct", categoryId],
    queryFn: async ({ pageParam = 1 }) => {
      const result = await getProductByCollectionID(categoryId, pageParam, limit);
      setHasNextCat(result.totalProducts > limit * pageParam)
      return result?.products;
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage, pages) => {
      return lastPage.length === limit ? pages.length + 1 : undefined;
    },
    enabled: !!categoryId,
  })

  // cetegory handler
  const handleCategoryChange = (id: string) => {
    setCategoryId(id);
  };

  // loading animation
  if (isLoading || isCategoryLoading || isCatProductLoading) {
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
            products={categoryId ? (collectionProduct?.pages.flat() || []) : allProducts}
            fetchNextPage={categoryId ? catNextPage : fetchNextPage}
            isFetchingNextPage={categoryId ? isCatFatchingNextPage : isFetchingNextPage}
            hasNextPage={categoryId ? hasNextCat : hasNext}
            categoryData={categoryData}
            categoryId={categoryId}
          />
        </div>
      </div>
    </div>
  );
}
