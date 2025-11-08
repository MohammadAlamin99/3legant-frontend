"use client";
import React, { useEffect, useState, useMemo } from "react";
import Image from "next/image";
import { ChevronLeft, X } from "lucide-react";
import { getProductsByIds } from "@/actions/product.action";
import { useCart } from "../context/CartContext";
import { useRouter } from "next/navigation";
import { updateCartItemQuantity } from "@/helper/QuantityChange";
import { removeCartItem } from "@/helper/RemoveItem";
import { ICartItem } from "@/types/cartItem.type";
import { Product, Variant } from "@/types/variant.type";
import CardSummery from "./CardSummery";
import EmptyCart from "./EmptyCart";
import QuantityButton from "./QuantityButton";
import CartProgress from "./CartProgress";
export default function CartDetails() {
  const [cartItems, setCartItems] = useState<ICartItem[]>([]);
  const [cartData, setCartData] = useState<Product[]>([]);
  const router = useRouter();

  const { setCartOpen } = useCart();
  useEffect(() => {
    setCartOpen(false);
  }, [setCartOpen]);

  // Load cart items from localStorage
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("cart") || "[]");
    setCartItems(stored);
  }, []);

  // Fetch products by variantIds
  useEffect(() => {
    const fetchCartProducts = async () => {
      const variantIds = cartItems.map((i) => i.variantId);
      if (variantIds.length > 0) {
        const data = await getProductsByIds(variantIds);
        setCartData(data);
      }
    };
    fetchCartProducts();
  }, [cartItems]);

  // Map cartItems to full variant info
  const allVariants: Variant[] = useMemo(() => {
    return cartItems.map((item) => {
      const product = cartData.find((p) =>
        p.variants.some((v) => v._id === item.variantId)
      );
      const variant = product?.variants.find((v) => v._id === item.variantId);
      return variant
        ? {
            ...variant,
            parentTitle: product?.title,
            parentImage: product?.featureImage,
          }
        : {
            _id: item.variantId,
            price: 0,
            options: {},
            parentTitle: "",
            parentImage: "",
          };
    });
  }, [cartItems, cartData]);

  // Map of variantId -> quantity
  const cartMap = useMemo(
    () => new Map(cartItems.map((i) => [i.variantId, i.quantity])),
    [cartItems]
  );

  // Subtotal calculation
  const subtotal = allVariants.reduce((acc, curr) => {
    const qty = cartMap.get(curr._id) || 1;
    return acc + curr.price * qty;
  }, 0);

  // Quantity change handler
  const handleQuantityChange = (variantId: string, newQty: number) => {
    const updated = updateCartItemQuantity(cartItems, variantId, newQty);
    setCartItems(updated);
  };

  // Remove item from cart
  const handleRemoveCart = (variantId: string) => {
    const updated = removeCartItem(cartItems, variantId);
    setCartItems(updated);
  };

  return (
    <div className="py-10 md:py-20">
      <div className="lg:px-3 md:px-3 sm:px-3 container mx-auto px-8">
        <button
          onClick={() => router.back()}
          className="text-[#605F5F] font-medium text-base font-inter flex md:hidden"
        >
          <ChevronLeft />
          back
        </button>
        <h1 className="font-poppins text-center text-black text-[40px] md:text-[54px] font-medium leading-[58px] tracking-[-1px] mb-6 md:mb-10">
          Cart
        </h1>

        {/* Progress Steps */}
        <CartProgress />
        {/* Cart Content */}
        <div className="flex flex-col lg:flex-row gap-16 py-10 md:py-20 justify-center items-start lg:items-end">
          <div className="flex-1 w-full">
            <div className="grid font-inter text-[16px] grid-cols-3 md:grid-cols-[2fr_1fr_1fr_1fr] border-b border-[#6C7275] pb-6 mb-6 font-semibold text-[#121212]">
              <div>Product</div>
              <div className="text-right hidden md:block">Quantity</div>
              <div className="text-right hidden md:block">Price</div>
              <div className="text-right hidden md:block">Subtotal</div>
            </div>

            {allVariants.length > 0 ? (
              allVariants.map((item, i) => {
                const qty = cartMap.get(item._id) || 1;
                return (
                  <div
                    key={i}
                    className="grid grid-cols-[3fr_1fr] md:grid-cols-[2fr_1fr_1fr_1fr] items-center border-b border-gray-200 py-6"
                  >
                    <div className="flex items-center gap-4 col-span-1 md:col-span-1">
                      <div className="w-20 h-24 bg-gray-100 overflow-hidden flex items-center justify-center shrink-0">
                        <Image
                          src={item?.image || "/images/sample-product.jpg"}
                          alt={item?.parentTitle || "Product"}
                          width={80}
                          height={96}
                          className="object-contain"
                        />
                      </div>
                      <div className="flex flex-col gap-2 md:gap-0.5">
                        <p className="font-semibold text-[#141718]">
                          {item?.parentTitle}
                        </p>
                        <p className="text-xs text-[#6C7275] font-inter">
                          Color: {item?.options?.color || "-"} | Size:{" "}
                          {item.options?.size || "-"}
                        </p>
                        <button
                          className="cursor-pointer items-center text-sm text-[#6C7275] hidden md:flex"
                          onClick={() => handleRemoveCart(item._id)}
                        >
                          <X color="#6C7275" width={16} height={16} />
                          Remove
                        </button>
                        {/* phone qty buttons */}
                        <div className="items-center justify-between border w-[80px] border-[#6C7275] rounded-md p-2 flex md:hidden">
                          <QuantityButton
                            item={item}
                            qty={qty}
                            handleQuantityChange={handleQuantityChange}
                          />
                        </div>
                      </div>
                    </div>
                    {/* quantity button */}

                    <div className="flex md:justify-end flex-col">
                      <div className="text-right text-gray-800 block md:hidden">
                        TK. {item.price}
                      </div>
                      <button
                        className="cursor-pointer items-center justify-end text-sm text-[#6C7275] flex md:hidden mt-2"
                        onClick={() => handleRemoveCart(item._id)}
                      >
                        <X color="#6C7275" width={24} height={24} />
                      </button>
                      <QuantityButton
                        item={item}
                        qty={qty}
                        handleQuantityChange={handleQuantityChange}
                      />
                    </div>

                    {/* Price */}
                    <div className="text-right text-gray-800 hidden md:block">
                      TK. {item.price}
                    </div>

                    {/* Subtotal */}
                    <div className="text-right text-gray-900 font-semibold hidden md:block">
                      TK. {item.price * qty}
                    </div>
                  </div>
                );
              })
            ) : (
              <EmptyCart />
            )}
          </div>
          <CardSummery subtotal={subtotal} />
        </div>
      </div>
    </div>
  );
}
