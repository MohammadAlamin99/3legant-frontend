"use client";
import React, { useEffect, useState, useMemo } from "react";
import Image from "next/image";
import { ChevronLeft, Minus, Plus, ShoppingCart, X } from "lucide-react";
import { getProductsByIds } from "@/actions/product.action";
import { useCart } from "../context/CartContext";
import { useRouter } from "next/navigation";

export interface CartItem {
    productId: string;
    variantId: string;
    quantity: number;
}

export interface Variant {
    _id: string;
    title?: string;
    parentTitle?: string;
    image?: string;
    parentImage?: string;
    options?: { color?: string; size?: string;[key: string]: string | undefined };
    price: number;
}

export interface Product {
    _id: string;
    title: string;
    featureImage: string;
    variants: Variant[];
}

export default function CartDetails() {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [cartData, setCartData] = useState<Product[]>([]);
    const router = useRouter();

    const { setCartOpen } = useCart();
    useEffect(() => { setCartOpen(false) }, [setCartOpen]);

    // Load cart items from localStorage
    useEffect(() => {
        const stored = JSON.parse(localStorage.getItem("cart") || "[]");
        setCartItems(stored);
    }, []);

    // Fetch products by variantIds
    useEffect(() => {
        const fetchCartProducts = async () => {
            const variantIds = cartItems.map(i => i.variantId);
            if (variantIds.length > 0) {
                const data = await getProductsByIds(variantIds);
                setCartData(data);
            }
        };
        fetchCartProducts();
    }, [cartItems]);

    // Map cartItems to full variant info
    const allVariants: Variant[] = useMemo(() => {
        return cartItems.map(item => {
            const product = cartData.find(p => p.variants.some(v => v._id === item.variantId));
            const variant = product?.variants.find(v => v._id === item.variantId);
            return variant
                ? { ...variant, parentTitle: product?.title, parentImage: product?.featureImage }
                : { _id: item.variantId, price: 0, options: {}, parentTitle: "", parentImage: "" };
        });
    }, [cartItems, cartData]);

    // Map of variantId -> quantity
    const cartMap = useMemo(() => new Map(cartItems.map(i => [i.variantId, i.quantity])), [cartItems]);

    // Subtotal calculation
    const subtotal = allVariants.reduce((acc, curr) => {
        const qty = cartMap.get(curr._id) || 1;
        return acc + curr.price * qty;
    }, 0);

    // Quantity change handler
    const handleQuantityChange = (variantId: string, newQty: number) => {
        if (newQty < 1) return;
        const updated = cartItems.map(item => (item.variantId === variantId ? { ...item, quantity: newQty } : item));
        setCartItems(updated);
        localStorage.setItem("cart", JSON.stringify(updated));
    };

    // Remove item from cart
    const handleRemoveCart = (variantId: string) => {
        const updated = cartItems.filter(item => item.variantId !== variantId);
        setCartItems(updated);
        localStorage.setItem("cart", JSON.stringify(updated));
    };

    return (
        <div className="py-10 md:py-20">
            <div className="lg:px-3 md:px-3 sm:px-3 container mx-auto px-8">
                {/* Title */}
                <button onClick={() => router.back()} className="text-[#605F5F] font-medium text-base font-inter flex md:hidden">
                    <ChevronLeft />
                    back
                </button>
                <h1 className="font-poppins text-center text-black text-[40px] md:text-[54px] font-medium leading-[58px] tracking-[-1px] mb-6 md:mb-10">
                    Cart
                </h1>

                {/* Progress Steps */}
                <div className="flex gap-8 flex-nowrap overflow-x-auto md:max-w-[832px] md:mx-auto scrollbar-none">
                    <div className="flex items-center w-64 gap-4 border-b border-[#23262F] pb-5 shrink-0">
                        <div className="w-[42px] h-[42px] font-inter flex items-center justify-center rounded-full bg-[#23262F] text-white font-semibold">
                            1
                        </div>
                        <div className="text-[#23262F] font-semibold text-base font-inter">Shopping cart</div>
                    </div>
                    <div className="flex items-center w-64 gap-4 border-b border-gray-800 pb-5 shrink-0">
                        <div className="w-[42px] h-[42px] font-inter flex items-center justify-center rounded-full bg-[#B1B5C3] text-white font-semibold">
                            2
                        </div>
                        <div className="text-[#B1B5C3] font-semibold text-base">Checkout details</div>
                    </div>
                    <div className="flex items-center w-64 gap-4 border-b border-gray-800 pb-5 shrink-0">
                        <div className="w-[42px] h-[42px] font-inter flex items-center justify-center rounded-full bg-[#B1B5C3] text-white font-semibold">
                            3
                        </div>
                        <div className="text-[#B1B5C3] font-semibold text-base">Order complete</div>
                    </div>
                </div>

                {/* Cart Content */}
                <div className="flex flex-col lg:flex-row gap-16 py-10 md:py-20 justify-center items-start lg:items-end">
                    {/* Cart Items */}
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
                                    <div key={i} className="grid grid-cols-[3fr_1fr] md:grid-cols-[2fr_1fr_1fr_1fr] items-center border-b border-gray-200 py-6">
                                        <div className="flex items-center gap-4 col-span-1 md:col-span-1">
                                            <div className="w-20 h-24 bg-gray-100 overflow-hidden flex items-center justify-center shrink-0">
                                                <Image
                                                    src={item.parentImage || "/images/sample-product.jpg"}
                                                    alt={item.parentTitle || "Product"}
                                                    width={80}
                                                    height={96}
                                                    className="object-contain"
                                                />
                                            </div>
                                            <div className="flex flex-col gap-2 md:gap-0.5">
                                                <p className="font-semibold text-[#141718]">{item.parentTitle}</p>
                                                <p className="text-xs text-[#6C7275] font-inter">
                                                    Color: {item.options?.color || "-"} | Size: {item.options?.size || "-"}
                                                </p>
                                                <button
                                                    className="cursor-pointer items-center text-sm text-[#6C7275] hidden md:flex"
                                                    onClick={() => handleRemoveCart(item._id)}
                                                >
                                                    <X color="#6C7275" width={16} height={16} />
                                                    Remove
                                                </button>
                                                <div className="items-center justify-between border w-[80px] border-[#6C7275] rounded-md p-2 flex md:hidden">
                                                    <button onClick={() => handleQuantityChange(item._id, qty - 1)}>
                                                        <Minus color="#121212" width={16} height={16} />
                                                    </button>
                                                    <span className="text-[12px] text-[#121212] font-semibold">{qty}</span>
                                                    <button onClick={() => handleQuantityChange(item._id, qty + 1)}>
                                                        <Plus color="#121212" width={16} height={16} />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Quantity */}
                                        <div className="flex md:justify-end flex-col">
                                            <div className="text-right text-gray-800 block md:hidden">TK. {item.price}</div>
                                            <button
                                                className="cursor-pointer items-center justify-end text-sm text-[#6C7275] flex md:hidden mt-2"
                                                onClick={() => handleRemoveCart(item._id)}
                                            >
                                                <X color="#6C7275" width={24} height={24} />
                                            </button>
                                            <div className="items-center justify-between border w-[80px] border-[#6C7275] rounded-md p-2 hidden md:flex">
                                                <button onClick={() => handleQuantityChange(item._id, qty - 1)}>
                                                    <Minus color="#121212" width={16} height={16} />
                                                </button>
                                                <span className="text-[12px] text-[#121212] font-semibold">{qty}</span>
                                                <button onClick={() => handleQuantityChange(item._id, qty + 1)}>
                                                    <Plus color="#121212" width={16} height={16} />
                                                </button>
                                            </div>
                                        </div>

                                        {/* Price */}
                                        <div className="text-right text-gray-800 hidden md:block">TK. {item.price}</div>

                                        {/* Subtotal */}
                                        <div className="text-right text-gray-900 font-semibold hidden md:block">
                                            TK. {item.price * qty}
                                        </div>
                                    </div>
                                );
                            })
                        ) : (
                            // Empty Cart Message
                            <div className="flex flex-col items-center gap-1 justify-center text-center text-[#6C7275] my-auto py-10 md:py-20">
                                <ShoppingCart width={40} height={40} />
                                <p className="font-inter text-lg font-medium">Your cart is empty</p>
                                <p className="font-inter text-sm text-[#9CA3AF]">Add some items to get started!</p>
                            </div>
                        )}
                    </div>

                    {/* Cart Summary */}
                    <div className="w-full lg:w-[400px] border border-gray-400 rounded-lg p-6 h-fit">
                        <h2 className="text-lg font-medium text-[#141718] font-inter mb-4">Cart Summary</h2>

                        {/* Subtotal & Total */}
                        <div className="border-b border-gray-200 pb-3 mb-3 flex justify-between text-sm">
                            <span className="texttext-[#141718] font-inter">Subtotal</span>
                            <span className="font-semibold text-[#141718] font-inter">TK. {subtotal}</span>
                        </div>

                        <div className="flex justify-between text-base font-semibold">
                            <span>Total</span>
                            <span>TK. {subtotal}</span>
                        </div>

                        {/* Checkout Button */}
                        <button className="cursor-pointer w-full bg-[#141718] font-inter
                         text-white rounded-md py-3 mt-6 font-medium hover:bg-gray-800 
                         transition" onClick={() => router.push("/checkout")}>
                            Checkout
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
