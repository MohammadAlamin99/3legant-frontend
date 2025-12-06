import { IProductVariant } from "@/types/variant.type";
import { Heart, Minus, Plus } from "lucide-react";
import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addToWishlist, getWishlist } from "@/actions/wishlist.action";
import { getCookie } from "@/helper/Token";
import SignInModal from "../authentication/SignIn";
import SignUpModal from "../authentication/SignUp";
import { IWishlist } from "@/types/wishlist.type";

interface DetailsButtonProps {
  qtyHandler: (value: number) => void;
  qty: number;
  productId: string;
  selectedVariant: IProductVariant;
  handleAddToCart: (productId: string, variantId: string) => void;
}

export default function DetailsButton({
  qtyHandler,
  qty,
  productId,
  selectedVariant,
  handleAddToCart,
}: DetailsButtonProps) {
  // state
  const [showSignIn, setShowSignIn] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);
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
    mutationFn: () => addToWishlist(token || "", payload?.userId, productId),
    onSuccess: (createWish) => {
      if (createWish.status === "success") {
        setIsWished(!isWished);
        toast.success(createWish.message);
        queryClient.invalidateQueries({ queryKey: ["wishlist"] });
      }
    },
    onError: (err: unknown) => {
      toast.error((err as Error).message || "Failed to add to wishlist");
    },
  });

  // get wishlist
  const { data: wishlistData, isLoading } = useQuery({
    queryKey: ["wishlist"],
    queryFn: () => getWishlist(token || "", payload?.userId),
  });
  // check if product is wished
  useEffect(() => {
    if (wishlistData?.data?.length > 0) {
      const wishedProducts = wishlistData.data[0].products.map(
        (p: IWishlist) => p._id
      );
      setIsWished(wishedProducts.includes(productId));
    }
  }, [wishlistData, productId]);

  const onWishHandler = () => {
    if (!token) {
      setShowSignIn(true);
      return;
    }
    mutate();
  };

  // authentication
  const handleSwitchToSignUp = () => {
    setShowSignIn(false);
    setShowSignUp(true);
  };

  const handleSwitchToSignIn = () => {
    setShowSignUp(false);
    setShowSignIn(true);
  };

  const handleLoginSuccess = () => {
    setShowSignIn(false);
  };

  return (
    <>
      <div className="space-y-4">
        <div className="flex items-center space-x-4">
          <div className="flex items-center rounded-lg bg-[#F5F5F5]">
            <button
              className="p-3.5 transition-colors cursor-pointer"
              onClick={() => qtyHandler(qty - 1)}
            >
              <Minus width={20} height={20} />
            </button>
            <span className="px-4 py-2 text-gray-900 font-medium">{qty}</span>
            <button
              className="p-3.5 transition-colors cursor-pointer"
              onClick={() => qtyHandler(qty + 1)}
            >
              <Plus width={20} height={20} />
            </button>
          </div>
          <button
            onClick={onWishHandler}
            disabled={isLoading}
            className={`
              w-full cursor-pointer py-3 px-6 rounded-lg transition-colors flex items-center justify-center space-x-2
              border 
              ${
                isWished
                  ? "bg-red-500 border-red-600 text-white hover:bg-red-600"
                  : "bg-white border-[#141718] text-[#141718] hover:bg-gray-100"
              }
            `}
          >
            <Heart className={`w-5 h-5 ${isWished ? "fill-white" : ""}`} />
            <span>{isWished ? "Wishlisted" : "Wishlist"}</span>
          </button>
        </div>

        <button
          disabled={selectedVariant?.stock < qty}
          onClick={() =>
            handleAddToCart(productId || "", selectedVariant?._id || "")
          }
          className={`w-full font-inter text-[18px] font-medium py-4 px-6 rounded-lg transition-colors relative overflow-hidden group ${
            selectedVariant?.stock >= qty
              ? "bg-[#141718] text-white cursor-pointer"
              : "bg-gray-400 text-gray-200 cursor-not-allowed"
          }`}
        >
          <span className="relative z-10">
            {selectedVariant?.stock >= qty ? "Add to Cart" : "Out of Stock"}
          </span>
          {selectedVariant?.stock >= qty && (
            <>
              <span className="absolute inset-0 bg-white/20 backdrop-blur-md border border-white/30 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500 ease-out z-0"></span>
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-[-20deg] translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out z-0"></span>
            </>
          )}
        </button>
      </div>
      <ToastContainer />
      {/* Modals */}
      {showSignIn && (
        <SignInModal
          onClose={() => setShowSignIn(false)}
          onSwitchToSignUp={handleSwitchToSignUp}
          onLoginSuccess={handleLoginSuccess}
        />
      )}

      {showSignUp && (
        <SignUpModal
          onClose={() => setShowSignUp(false)}
          onSwitchToSignIn={handleSwitchToSignIn}
        />
      )}
    </>
  );
}
