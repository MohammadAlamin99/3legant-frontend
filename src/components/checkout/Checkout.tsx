"use client";
import React, { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { ChevronLeft, Minus, Plus, ShoppingCart } from "lucide-react";
import { useRouter } from "next/navigation";
import { getProductsByIds } from "@/actions/product.action";
import { useCart } from "../context/CartContext";
import SignUp from "../authentication/SignUp";

interface CartItem {
    productId: string;
    variantId: string;
    quantity: number;
}

interface Variant {
    _id: string;
    title?: string;
    parentTitle?: string;
    image?: string;
    parentImage?: string;
    options?: { color?: string; size?: string;[key: string]: string | undefined };
    price: number;
}

interface Product {
    _id: string;
    title: string;
    featureImage: string;
    variants: Variant[];
}

const CheckOut = () => {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [cartData, setCartData] = useState<Product[]>([]);
    const [shippingCost] = useState<number>(110);
    const [showSignUp, setShowSignUp] = useState(false);
    const router = useRouter();
    const { setCartOpen } = useCart();
    useEffect(() => { setCartOpen(false) }, [setCartOpen]);

    // Load cart items from localStorage
    useEffect(() => {
        const stored = JSON.parse(localStorage.getItem("cart") || "[]");
        setCartItems(stored);
    }, []);

    // Fetch product details by variantIds
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

    // Combine variant + product info
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

    // Quantity map
    const cartMap = useMemo(
        () => new Map(cartItems.map((i) => [i.variantId, i.quantity])),
        [cartItems]
    );

    // Subtotal & total
    const subtotal = allVariants.reduce((acc, curr) => {
        const qty = cartMap.get(curr._id) || 1;
        return acc + curr.price * qty;
    }, 0);
    const total = subtotal + shippingCost;

    // Quantity handlers
    const handleQuantityChange = (variantId: string, newQty: number) => {
        if (newQty < 1) return;
        const updated = cartItems.map((item) =>
            item.variantId === variantId ? { ...item, quantity: newQty } : item
        );
        setCartItems(updated);
        localStorage.setItem("cart", JSON.stringify(updated));
    };

    // log in
    const handleCheckout = () => {
        const isLoggedIn = false;
        if (!isLoggedIn) {
            setShowSignUp(true);
            return;
        }
    };

    const handlePlaceOrder = () => {
        router.push("/order-complete");
    };

    return (
        <div className="py-10 md:py-20">
            <div className="container mx-auto px-4">
                {/* Title */}
                <button onClick={() => router.back()} className="text-[#605F5F] font-medium text-base font-inter flex md:hidden">
                    <ChevronLeft />
                    back
                </button>
                <div className="text-center mb-10">
                    <h2 className="font-poppins text-[40px] md:text-[54px] font-medium text-black">
                        Check Out
                    </h2>
                </div>

                {/* Progress Steps */}
                <div className="flex gap-8 flex-nowrap overflow-x-auto md:max-w-[832px] md:mx-auto scrollbar-none mb-6 md:mb-20">
                    <div className="flex items-center w-64 gap-4 border-b border-[#38CB89] pb-5 shrink-0">
                        <div className="w-[42px] h-[42px] font-inter flex items-center justify-center rounded-full bg-[#38CB89] text-white font-semibold">
                            1
                        </div>
                        <div className="text-[#38CB89] font-semibold text-base font-inter">
                            Shopping cart
                        </div>
                    </div>
                    <div className="flex items-center w-64 gap-4 border-b border-[#23262F] pb-5 shrink-0">
                        <div className="w-[42px] h-[42px] font-inter flex items-center justify-center rounded-full bg-[#23262F] text-white font-semibold">
                            2
                        </div>
                        <div className="text-[#23262F] font-semibold text-base font-inter">
                            Checkout details
                        </div>
                    </div>
                    <div className="flex items-center w-64 gap-4 border-b border-gray-800 pb-5 shrink-0">
                        <div className="w-[42px] h-[42px] font-inter flex items-center justify-center rounded-full bg-[#B1B5C3] text-white font-semibold">
                            3
                        </div>
                        <div className="text-[#B1B5C3] font-semibold text-base font-inter">
                            Order complete
                        </div>
                    </div>
                </div>

                {/* Layout */}
                <div className="flex flex-col md:flex-row gap-6">
                    {/* Left Section */}
                    <div className="md:w-7/12 space-y-6">
                        {/* Contact Info */}
                        <div className="bg-white border border-[#6C7275] rounded-lg p-6">
                            <h3 className="text-[16px] md:text-[14px] font-medium mb-4 font-poppins">
                                Contact Information
                            </h3>
                            <div className="space-y-4">
                                <span className="font-bold text-sm text-[#6C7275] mb-3 block font-inter uppercase">Name *</span>
                                <input
                                    type="text"
                                    placeholder="Full Name"
                                    className="w-full border border-[#6C7275] rounded-md p-2 text-[#6C7275]"
                                />
                                <span className="font-bold text-sm text-[#6C7275] mb-3 block font-inter uppercase">Phone number *</span>
                                <input
                                    type="tel"
                                    placeholder="Phone Number"
                                    className="w-full border border-[#6C7275] rounded-md p-2 text-[#6C7275]"
                                />
                                <span className="font-bold text-sm text-[#6C7275] mb-3 block font-inter uppercase">email address *</span>
                                <input
                                    type="email"
                                    placeholder="Email Address"
                                    className="w-full border border-[#6C7275] rounded-md p-2 text-[#6C7275]"
                                />
                            </div>
                        </div>

                        {/* Shipping Address */}
                        <div className="bg-white border border-[#6C7275] rounded-lg p-6">
                            <h3 className="text-[16px] md:text-[14px] font-medium mb-4 font-poppins text-[#141718]">
                                Shipping Address
                            </h3>
                            <span className="font-bold text-sm text-[#6C7275] mb-3 block font-inter uppercase">Full Address *</span>
                            <input
                                type="text"
                                placeholder="Full Address"
                                className="w-full border border-[#6C7275] rounded-md p-2 text-[#6C7275]"
                            />
                        </div>

                        {/* Place Order (Desktop) */}
                        {allVariants.length > 0 && (
                            <div className="hidden md:block">
                                <button
                                    onClick={handleCheckout}
                                    className="w-full bg-[#141718] text-white rounded-lg py-3 font-medium font-inter cursor-pointer"
                                >
                                    Place Order
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Right Section (Order Summary) */}
                    <div className="md:w-5/12 space-y-6">
                        <div className="bg-white border border-[#6C7275] rounded-lg p-6">
                            <h3 className="md:text-[28px] text-[20px] font-medium md:mb-6 mb-4 font-poppins">Order summary</h3>

                            {allVariants.length > 0 ? (
                                <div className="space-y-6">
                                    {allVariants.map((item, i) => {
                                        const qty = cartMap.get(item._id) || 1;
                                        return (
                                            <div
                                                key={i}
                                                className="grid md:grid-cols-[80px_1fr_auto] grid-cols-[80px_2fr_1fr] gap-4 border-b border-gray-200 pb-6 pt-6"
                                            >
                                                <div className="w-20 h-24 bg-gray-100 flex items-center justify-center">
                                                    <Image
                                                        src={item.parentImage || "/images/sample-product.jpg"}
                                                        alt={item.parentTitle || "Product"}
                                                        width={80}
                                                        height={96}
                                                        className="object-contain"
                                                    />
                                                </div>
                                                <div className="flex flex-col gap-1">
                                                    <h4 className="text-sm font-semibold text-[#141718] font-inter">
                                                        {item.parentTitle}
                                                    </h4>
                                                    <p className="text-xs text-[#6C7275] font-inter">
                                                        Color: {item.options?.color || "-"}
                                                    </p>
                                                    <p className="text-xs text-[#6C7275] font-inter">
                                                        Size: {item.options?.size || "-"}
                                                    </p>
                                                    <div className="flex items-center border border-gray-300 rounded-md p-2 w-fit gap-2">
                                                        <button
                                                            className="p-1 cursor-pointer"
                                                            onClick={() =>
                                                                handleQuantityChange(item._id, qty - 1)
                                                            }
                                                        >
                                                            <Minus size={16} />
                                                        </button>
                                                        <span className="text-[12px] font-inter font-semibold">{qty}</span>
                                                        <button
                                                            className="p-1 cursor-pointer"
                                                            onClick={() =>
                                                                handleQuantityChange(item._id, qty + 1)
                                                            }
                                                        >
                                                            <Plus size={16} />
                                                        </button>
                                                    </div>
                                                </div>
                                                <div className="text-[#121212] font-semibold font-inter text-[14px] md:text-[16px]">
                                                    TK. {item.price * qty}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            ) : (
                                <div className="flex flex-col items-center gap-1 justify-center text-center text-[#6C7275] my-auto py-10 md:py-20">
                                    <ShoppingCart width={40} height={40} />
                                    <p className="font-inter text-lg font-medium">
                                        Your cart is empty
                                    </p>
                                    <p className="font-inter text-sm text-[#9CA3AF]">
                                        Add some items to get started!
                                    </p>
                                </div>
                            )}

                            {/* Summary Totals */}
                            {allVariants.length > 0 && (
                                <div className="mt-6 space-y-2">
                                    <div className="flex justify-between text-[#141718] font-inter text-sm">
                                        <span>Subtotal</span>
                                        <span>TK. {subtotal}</span>
                                    </div>
                                    <div className="flex justify-between text-[#141718] font-inter text-sm">
                                        <span>Delivary Charge</span>
                                        <span>TK. {shippingCost}</span>
                                    </div>
                                    <div className="flex justify-between font-semibold text-[#141718] font-inter text-base pt-2">
                                        <span>Total</span>
                                        <span>TK. {total}</span>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Place Order (Mobile) */}
                        {allVariants.length > 0 && (
                            <div className="block md:hidden">
                                <button
                                    onClick={handlePlaceOrder}
                                    className="w-full bg-[#141718] text-white rounded-lg py-3 font-medium"
                                >
                                    Place Order
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            {showSignUp && <SignUp onClose={() => setShowSignUp(false)}/>}
        </div>
    );
};

export default CheckOut;
