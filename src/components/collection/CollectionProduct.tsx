"use client";
import { getProductByCollectionID } from "@/actions/product.action";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useState } from "react";
import ShopProductSkeleton from "../Loading/ShopProductSkeleton";
import ShopProductCard from "../Shop/ShopProductCard";
import { useParams } from "next/navigation";

export default function CollectionProduct() {
  const [hasNextCat, setHasNextCat] = useState<boolean>(true);
  const id = useParams();
  const collectionID = id?.id;
  const limit = 9;
  const {
    data: collectionProduct,
    isLoading: isCatProductLoading,
    fetchNextPage: catNextPage,
    isFetchingNextPage: isCatFatchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["collectionProduct", collectionID],
    queryFn: async ({ pageParam = 1 }) => {
      const result = await getProductByCollectionID(
        collectionID as string,
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
  });

  const collectionData = collectionProduct?.pages.flat() || [];

  // loading animation
  if (isCatProductLoading) {
    return (
      <div className="container mx-auto xl:px-3 lg:px-3 md:px-3 sm:px-3 px-8 lg:py-[60px] py-[32px]">
        <div className="w-full">
          <ShopProductSkeleton />
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="container mx-auto xl:px-3 lg:px-3 md:px-3 sm:px-3 px-8 lg:py-[60px] py-[32px]">
        <div className="w-full">
          <ShopProductCard
            products={collectionData}
            fetchNextPage={catNextPage}
            isFetchingNextPage={isCatFatchingNextPage}
            hasNextPage={hasNextCat}
          />
        </div>
      </div>
    </>
  );
}
