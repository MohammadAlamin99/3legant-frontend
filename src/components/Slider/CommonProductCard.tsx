"use client";
import { Heart, Star } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Product } from "@/types/product.type";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getCookie } from "@/helper/Token";
import { addToWishlist, getWishlist } from "@/actions/wishlist.action";
import { IWishlist } from "@/types/wishlist.type";
import { toast, ToastContainer } from "react-toastify";

interface SliderClientProps {
  item: Product;
}
export default function CommonProductCard({ item }: SliderClientProps) {
  const [isWished, setIsWished] = useState(false);
  const queryClient = useQueryClient();

  // get userid from token
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

  // create wishlisht
  const { mutate } = useMutation({
    mutationFn: (productId: string) =>
      addToWishlist(token || "", payload?.userId, productId),
    onSuccess: (createWish) => {
      if (createWish.status === "success") {
        setIsWished(!isWished);
        queryClient.invalidateQueries({ queryKey: ["wishlist"] });
      }
    },
    onError: (err: unknown) => {
      console.error(err);
    },
  });

  // get wishlist
  const { data: wishlistData } = useQuery({
    queryKey: ["wishlist"],
    queryFn: () => getWishlist(token || "", payload?.userId),
  });
  // check if product is wished
  useEffect(() => {
    if (wishlistData?.data?.length > 0) {
      const wishedProducts = wishlistData.data[0].products.map(
        (p: IWishlist) => p._id
      );
      setIsWished(wishedProducts.includes(item?._id));
    }
  }, [wishlistData, item?._id]);

  //   handler on wish
  const onWishHandler = () => {
    if (!token) {
      toast.error("Please Login to add to wishlist");
      return;
    }
    mutate(item?._id);
  };
  return (
    <>
      <div>
        <div className="relative group">
          <Heart
            onClick={onWishHandler}
            width={32}
            height={32}
            color={isWished ? "#EF4444" : "#6C7275"}
            fill={isWished ? "#EF4444" : "none"}
            className={`
            rounded-[50%] p-1.5 cursor-pointer absolute top-4 right-4 z-30
            transition-all duration-300
            group-hover:opacity-100 opacity-0
            ${isWished ? "bg-red-100" : "bg-white"}
            group-hover:bg-gray-100
          `}
          />
          <div className="absolute top-4 left-4 z-10">
            {item?.badge && (
              <span className="bg-white font-inter text-[#121212] px-3 py-1 rounded-md text-sm font-bold uppercase">
                {item?.badge}
              </span>
            )}
            {item.compareAtPrice && (
              <div className="bg-[#38CB89] font-inter text-white px-3 py-1 rounded-md text-sm font-bold mt-2">
                -
                {(
                  ((item?.compareAtPrice - item?.basePrice) /
                    item?.compareAtPrice) *
                  100
                ).toFixed(0)}
                %
              </div>
            )}
          </div>
          <Link href={`product/${item?._id}`}>
            <div className="group overflow-hidden relative w-full h-[308px] lg:h-[349px] md:h-[320px] sm:h-[310px]">
              <Image
                className="object-cover group-hover:scale-110 transition-transform duration-300 ease-in-out"
                src={item.featureImage}
                fill
                alt={item.title}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
            </div>
          </Link>
          <Link href={`product/${item?._id}`}>
            <button
              className="font-inter text-[#FEFEFE] text-[16px] font-medium bg-[#141718] 
                cursor-pointer leading-[28px] py-2.5 w-[80%] rounded-[8px] 
                absolute bottom-4 left-[50%] translate-x-[-50%] opacity-0 group-hover:opacity-100 transition-all duration-300"
            >
              View More
            </button>
          </Link>
        </div>

        <div className="flex items-center gap-0.5 mt-3 mb-1">
          {Array.from({
            length: Math.floor(item?.rating?.average || 0),
          }).map((_, index) => (
            <Star
              width={16}
              height={16}
              key={index}
              className="text-[#343839] fill-[#343839]"
            />
          ))}
          {Array.from({
            length: 5 - Math.floor(item?.rating?.average || 0),
          }).map((_, index) => (
            <Star
              width={16}
              height={16}
              key={index}
              className="text-[#6C7275] fill-[#6C7275]"
            />
          ))}
          <span className="ml-1.5 font-inter text-sm font-medium">
            ({item?.rating?.average})
          </span>
        </div>
        <h2 className="text-[16px] font-semibold text-[#141718] leading-8">
          {item?.title}
        </h2>
        <div className="flex items-center gap-3">
          <p className="text-[14px] font-semibold text-[#141718]">
            TK. {item?.basePrice}
          </p>
          <p className="text-[14px] font-normal text-[#6C7275] line-through">
            TK. {item?.compareAtPrice}
          </p>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}
