"use client";
import Image from "next/image";
import { getProductsByIds } from "@/actions/product.action";
import { useQuery } from "@tanstack/react-query";
import { X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { updateCartItemQuantity } from "@/helper/QuantityChange";
import EmptyCart from "./cart/EmptyCart";
import QuantityButton from "./cart/QuantityButton";
import { ICartItem } from "@/types/cartItem.type";
import { IProductVariant, Product } from "@/types/variant.type";

interface CartDrawerProps {
  cartOpen: boolean;
  onClose: () => void;
}

export default function CartDrawer({ cartOpen, onClose }: CartDrawerProps) {
  const [cartItems, setCartItems] = useState<ICartItem[]>([]);
  useEffect(() => {
    const updateCart = () => {
      const stored = JSON.parse(localStorage.getItem("cart") || "[]").map(
        (item: ICartItem) => ({
          ...item,
          quantity: Number(item.quantity),
        })
      );
      setCartItems(stored);
    };
    updateCart();
    window.addEventListener("cart-updated", updateCart);
    return () => window.removeEventListener("cart-updated", updateCart);
  }, [cartOpen]);

  // get porducts by ids
  const variantIds = useMemo(
    () => cartItems.map((i) => i.variantId),
    [cartItems]
  );
  const { data: cartData } = useQuery({
    queryKey: ["cartData", variantIds],
    queryFn: () => getProductsByIds(variantIds),
    enabled: variantIds.length > 0,
  });
  // final variants array
  const allVariants: IProductVariant[] = cartItems.map((item: ICartItem) => {
    const product = cartData?.find((p: Product) =>
      p.variants.some((v) => v._id === item?.variantId)
    );
    const variant: IProductVariant | undefined = product?.variants.find(
      (v: IProductVariant) => v._id === item?.variantId
    );
    return variant
      ? {
          ...variant,
          stock: 0,
          parentTitle: product.title,
          parentImage: product.featureImage,
        }
      : {
          _id: item.variantId,
          price: 0,
          stock: 0,
          options: {},
          parentTitle: "",
          parentImage: "",
        };
  });

  // update quantity
  const handleQuantityChange = (variantId: string, newQty: number) => {
    const updated = updateCartItemQuantity(cartItems, variantId, newQty);
    setCartItems(updated);
  };

  // remove item form cart
  const handleRemoveCart = (variantId: string) => {
    const updated = cartItems.filter((item) => item?.variantId !== variantId);
    setCartItems(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
    window.dispatchEvent(new Event("cart-updated"));
  };

  // calculate subtotal
  const cartMap = useMemo(
    () => new Map(cartItems.map((i) => [i.variantId, i.quantity])),
    [cartItems]
  );

  const subtotal = allVariants.reduce((acc: number, curr) => {
    const qty = cartMap.get(curr._id) || 1;
    return acc + curr.price * qty;
  }, 0);

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };
  return (
    <>
      <div
        className={`fixed inset-0 bg-black z-30 opacity-50 visible-0 transition-opacity duration-300 
                ${cartOpen ? "opacity-50 visible" : "opacity-0 invisible"}`}
        onClick={handleOverlayClick}
      />
      <div
        className={`fixed flex top-0 right-0 h-screen bg-white shadow-lg z-40 w-[30%] 
                max-[1200px]:w-[45%] max-[768px]:w-[70%] max-[575px]:w-[90%] flex-col transition-transform duration-300 p-6 ${
                  cartOpen ? "translate-x-0" : "translate-x-full"
                }`}
      >
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-poppins text-[28px] font-medium leading-[34px] tracking-[-0.6px] text-[#121212]">
            Cart
          </h3>
          <button className="cursor-pointer" aria-label="Close cart drawer">
            <X
              onClick={onClose}
              color="#6C7275"
              width={24}
              height={24}
              strokeWidth={2}
            />
          </button>
        </div>
        <div className="flex flex-col gap-6 overflow-y-auto flex-1">
          {allVariants && allVariants.length > 0 ? (
            allVariants.map((item, i) => {
              const cartItem = cartItems.find(
                (c) => c?.variantId === item?._id
              );
              return (
                <div
                  key={i}
                  className="flex items-center border-b border-[#E8ECEF] py-6"
                >
                  <div className="w-20 aspect-[80/96] bg-[#F3F5F7] mr-4 flex-shrink-0">
                    <Image
                      src={item?.image || "/placeholder.png"}
                      alt={item?.parentTitle || "Product image"}
                      className="w-full h-full object-contain"
                      width={80}
                      height={96}
                      sizes="(max-width: 768px) 80px, 100px"
                    />
                  </div>

                  <div className="flex flex-col flex-1">
                    <div className="flex justify-between mb-2">
                      <h2 className="max-w-[180px] text-sm font-inter font-semibold text-[#141718] leading-6">
                        {item?.parentTitle || ""}
                      </h2>
                      <span className="text-sm font-semibold text-[#141718]">
                        TK. {item?.price}
                      </span>
                    </div>
                    <p className="text-xs text-[#6C7275] font-inter mb-2">
                      Color: {item?.options?.color} | Size:{" "}
                      {item?.options?.size}
                    </p>

                    <div className="flex justify-between items-center mt-auto">
                      {/* Quantity */}
                      <QuantityButton
                        item={item}
                        qty={cartItem?.quantity || 1}
                        handleQuantityChange={handleQuantityChange}
                      />

                      {/* Remove */}
                      <button
                        className="cursor-pointer"
                        aria-label="Remove item"
                        onClick={() => handleRemoveCart(item?._id)}
                      >
                        <X
                          color="#6C7275"
                          width={24}
                          height={24}
                          strokeWidth={2}
                        />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <EmptyCart />
          )}
        </div>

        {/* Summary */}
        <div className="mt-6 border-t border-[#E8ECEF] pt-4">
          <div className="flex justify-between py-3 border-b border-[#E8ECEF]">
            <span className="text-base text-[#141718]">Subtotal</span>
            <span className="text-base font-semibold text-[#141718]">
              TK.{subtotal.toFixed(2)}
            </span>
          </div>
          <div className="flex justify-between py-3 text-lg font-medium">
            <span>Total</span>
            <span>TK.{subtotal.toFixed(2)}</span>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-4 flex flex-col items-center">
          <div className="w-full py-3 mb-4 rounded-md bg-[#141718] text-white text-lg font-medium text-center">
            <Link href={"/checkout"}>Checkout</Link>
          </div>
          <div className="text-sm font-semibold text-[#121212] border-b border-[#121212]">
            <Link href="/cart">View Cart</Link>
          </div>
        </div>
      </div>
    </>
  );
}
