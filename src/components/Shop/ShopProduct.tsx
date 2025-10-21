"use client";
import {
  getAllProduct,
  getProductByCollectionID,
  getProductbyPriceRange,
} from "@/actions/product.action";
import Filter from "./Filter";
import ShopProductCard from "./ShopProductCard";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { getCollection } from "@/actions/collection.action";
import { useMemo, useState } from "react";
import ShopProductSkeleton from "../Loading/ShopProductSkeleton";
import CategoryListSkeleton from "../Loading/CategoryListSkeleton";
import { FolderOpen } from "lucide-react";

export default function ShopProduct() {
  const [categoryId, setCategoryId] = useState<string>("");
  const [hasNext, setHasNext] = useState<boolean>(true);
  const [hasNextCat, setHasNextCat] = useState<boolean>(true);
  const [hasNextPRange, setHasNextPRange] = useState<boolean>(true);
  const [priceRange, setPriceRange] = useState<{ min: number; max: number }>({
    min: 0,
    max: Infinity,
  });

  const limit = 9;

  // all products query
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

  const allProducts = useMemo(() => data?.pages.flat() || [], [data?.pages]);

  // filter by collection
  const {
    data: collectionProduct,
    isLoading: isCatProductLoading,
    fetchNextPage: catNextPage,
    isFetchingNextPage: isCatFatchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["collectionProduct", categoryId],
    queryFn: async ({ pageParam = 1 }) => {
      const result = await getProductByCollectionID(
        categoryId,
        pageParam,
        limit
      );
      setHasNextCat(result.totalProducts > limit * pageParam);
      return result?.products;
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage, pages) => {
      return lastPage.length === limit ? pages.length + 1 : undefined;
    },
    enabled: !!categoryId,
  });

  // filter by price range
  const {
    data: priceRangeProduct,
    isLoading: isPriceRangeLoading,
    fetchNextPage: priceRangeNextPage,
    isFetchingNextPage: isPRnageFatchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["priceRangeProduct", priceRange],
    queryFn: async ({ pageParam = 1 }) => {
      const result = await getProductbyPriceRange(
        priceRange.min,
        priceRange.max,
        pageParam,
        limit
      );
      setHasNextPRange(result.totalProducts > limit * pageParam);
      return result?.products;
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage, pages) => {
      return lastPage.length === limit ? pages.length + 1 : undefined;
    },
    enabled: priceRange.min !== 0 || priceRange.max !== Infinity,
  });

  // category handler
  const handleCategoryChange = (id: string) => {
    setCategoryId(id);
    setPriceRange({ min: 0, max: Infinity });
  };

  // price range handler
  const handlePriceChange = (min: number, max: number) => {
    setPriceRange({ max, min });
    setCategoryId("");
  };

  // displayed products
  const displayedProducts = useMemo(() => {
    if (categoryId) {
      return collectionProduct?.pages.flat() || [];
    } else if (priceRange.min !== 0 || priceRange.max !== Infinity) {
      return priceRangeProduct?.pages.flat() || [];
    } else {
      return allProducts;
    }
  }, [
    categoryId,
    collectionProduct,
    priceRange,
    priceRangeProduct,
    allProducts,
  ]);

  // loading skeleton
  if (
    isLoading ||
    isCategoryLoading ||
    isCatProductLoading ||
    isPriceRangeLoading
  ) {
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

  // main render
  return (
    <div className="container mx-auto xl:px-3 lg:px-3 md:px-3 sm:px-3 px-8 lg:py-[60px] py-[32px]">
      <div className="grid lg:grid-cols-[minmax(262px,_auto)_1fr] lg:gap-6 gap-0">
        <Filter
          categoryData={categoryData}
          handleCategoryChange={handleCategoryChange}
          categoryId={categoryId}
          handlePriceChange={handlePriceChange}
          priceRange={priceRange}
        />

        <div className="w-full">
          {displayedProducts.length > 0 ? (
            <ShopProductCard
              products={displayedProducts}
              fetchNextPage={
                categoryId
                  ? catNextPage
                  : priceRange.min !== 0 || priceRange.max !== Infinity
                    ? priceRangeNextPage
                    : fetchNextPage
              }
              isFetchingNextPage={
                categoryId
                  ? isCatFatchingNextPage
                  : priceRange.min !== 0 || priceRange.max !== Infinity
                    ? isPRnageFatchingNextPage
                    : isFetchingNextPage
              }
              hasNextPage={
                categoryId
                  ? hasNextCat
                  : priceRange.min !== 0 || priceRange.max !== Infinity
                    ? hasNextPRange
                    : hasNext
              }
              categoryData={categoryData}
              categoryId={categoryId}
            />
          ) : (
            <div className="flex flex-col items-center justify-center text-center bg-gray-100 rounded-xl p-10">
              <FolderOpen className="w-10 h-10 text-gray-400 mb-3" />
              <h2 className="text-lg font-poppins font-semibold text-[#141718]">
                No Products Found
              </h2>
              <p className="text-sm text-gray-500 mt-1 font-inter">
                There are currently no products in this collection. Please check back later.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
