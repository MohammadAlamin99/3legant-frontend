"use client";
import { addToWishlist, getWishlist } from "@/actions/wishlist.action";
import { getCookie } from "@/helper/Token";
import { IWishlist } from "@/types/wishlist.type";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { toast, ToastContainer } from "react-toastify";
import EmptyWishlist from "./EmptyWishlist";

export default function WishlistMainContent() {
  const queryClient = useQueryClient();
  const token: string | undefined = getCookie("token");
  function base64UrlDecode(str: string) {
    str = str.replace(/-/g, "+").replace(/_/g, "/");
    while (str.length % 4) str += "=";
    return decodeURIComponent(
      atob(str)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );
  }
  const payload = token
    ? JSON.parse(base64UrlDecode(token.split(".")[1]))
    : null;

  const { data: wishlistData } = useQuery({
    queryKey: ["wishlist"],
    queryFn: () => getWishlist(token || "", payload?.userId),
  });

  const wishlist = wishlistData?.data[0]?.products || [];

  // update wishlist
  const { mutate } = useMutation({
    mutationFn: (productId: string) =>
      addToWishlist(token || "", payload?.userId, productId),
    onSuccess: (createWish) => {
      if (createWish.status === "success") {
        toast.success(createWish.message);
        queryClient.invalidateQueries({ queryKey: ["wishlist"] });
      }
    },
    onError: (err: unknown) => {
      toast.error((err as Error).message || "Failed to add to wishlist");
    },
  });

  const onRemoveHandler = (productId: string) => {
    mutate(productId);
  };

  return (
    <div className="lg:col-span-3">
      <div className="w-full">
        <h2 className="text-[20px] font-semibold text-black mb-10 font-inter">
          Your Wishlist
        </h2>

        <div className="w-full">
          {/* Header */}
          <div className="hidden md:grid grid-cols-2 border-b border-gray-200 pb-2 mb-2 font-inter">
            <div className="text-sm text-gray-500 font-medium">Product</div>
            <div className="text-sm text-gray-500 font-medium">Action</div>
          </div>

          {/* Items */}
          {wishlist.map((item: IWishlist, index: number) => (
            <div
              key={index}
              className="grid md:grid-cols-2 items-center py-6 border-b border-gray-200 md:gap-0 gap-4"
            >
              {/* Product Info */}
              <div className="flex items-center space-x-4">
                {/* Remove Icon (no action) */}
                <X
                  onClick={() => onRemoveHandler(item._id)}
                  className="w-5 h-5 text-gray-500 hover:text-gray-700 cursor-pointer"
                />

                {/* Product Image */}
                <div className="w-[60px] h-[72px] bg-gray-100 overflow-hidden flex items-center justify-center">
                  <Image
                    src={item.featureImage}
                    alt={item.featureImage || "Product image"}
                    width={60}
                    height={72}
                    className="object-contain"
                  />
                </div>

                {/* Details */}
                <div className="flex flex-col gap-1">
                  <h3 className="text-[14px] font-semibold text-gray-900 font-inter">
                    {item.title}
                  </h3>
                </div>
              </div>
              {/* Action */}
              <div className="md:text-left text-center">
                <Link
                  href={`/product/${item._id}`}
                  type="button"
                  className="bg-gray-900 font-inter cursor-pointer text-white text-[14px] font-medium px-6 py-2 rounded-lg"
                >
                  Order Now
                </Link>
              </div>
            </div>
          ))}

          {/* Empty State */}
          {wishlist.length === 0 && <EmptyWishlist />}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
