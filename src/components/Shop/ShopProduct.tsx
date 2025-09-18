'use client'
import { getAllProduct } from "@/actions/product.action";
import Filter from "./Filter";
import ShopProductCard from "./ShopProductCard";
import ShopProductSkeleton from "../Loading/ShopProductSkeleton";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

export default function ShopProduct() {
  const [page, setPage] = useState<number>(1);
  const limit = 3;

  const { data, isLoading } = useQuery({
    queryKey: ["products", page, limit],
    queryFn: () => getAllProduct(page, limit),
    // keepPreviousData: true,
  })
   const hasMore = data && data.length === limit;

  if (isLoading) return <ShopProductSkeleton />;
  return (
    <div className="container mx-auto xl:px-3 lg:px-3 md:px-3 sm:px-3 px-8 lg:py-[60px] py-[32px]">
      <div className="grid lg:grid-cols-[minmax(262px,_auto)_1fr] lg:gap-6 gap-0">
        <Filter />
        <div className="w-full">
          <ShopProductCard products={data} page={page} setPage={setPage} hasMore={hasMore} />
        </div>
      </div>
    </div>
  );
}



// 'use client'
// import { getAllProduct } from "@/actions/product.action";
// import Filter from "./Filter";
// import ShopProductCard from "./ShopProductCard";
// import ShopProductSkeleton from "../Loading/ShopProductSkeleton";
// import { useInfiniteQuery } from "@tanstack/react-query";

// export default function ShopProduct() {
//   const limit = 6;

//   const {
//     data,
//     fetchNextPage,
//     hasNextPage,
//     isFetchingNextPage,
//     isLoading,
//   } = useInfiniteQuery({
//     queryKey: ["products"],
//     queryFn: ({ pageParam = 1 }) => getAllProduct(pageParam, limit),
//     getNextPageParam: (lastPage, allPages) => {
//       // যদি lastPage.length < limit হয়, তাহলে আর next page নেই
//       return lastPage.length === limit ? allPages.length + 1 : undefined;
//     },
//   });

//   if (isLoading) return <ShopProductSkeleton />;

//   // সব pages কে একত্রিত করে 1 array বানানো
//   const allProducts = data?.pages.flat() || [];

//   return (
//     <div className="container mx-auto xl:px-3 lg:px-3 md:px-3 sm:px-3 px-8 lg:py-[60px] py-[32px]">
//       <div className="grid lg:grid-cols-[minmax(262px,_auto)_1fr] lg:gap-6 gap-0">
//         <Filter />
//         <div className="w-full">
//           <ShopProductCard
//             products={allProducts}
//             hasMore={!!hasNextPage}
//             loadMore={() => fetchNextPage()}
//             isFetching={isFetchingNextPage}
//           />
//         </div>
//       </div>
//     </div>
//   );
// }
