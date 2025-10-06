"use client"
import Image from "next/image";
import { getProductsByIds } from "@/actions/product.action";
import { useQuery } from "@tanstack/react-query";
import { Minus, Plus, X } from "lucide-react";
import { useEffect, useState } from "react";

interface CartDrawerProps {
    cartOpen: boolean;
    onClose?: () => void;
}
export interface Variant {
    _id: string;
    sku: string;
    barcode: string;
    title: string;
    parentTitle?: string;
    image: string;
    parentImage?: string;
    options?: {
        color?: string;
        size?: string;
        [key: string]: string | undefined;
    };
    price: number;
    compareAtPrice?: number;
    stock: number;
    isActive: boolean;
}

export interface Product {
    _id: string;
    title: string;
    featureImage: string;
    description?: string;
    variants: Variant[];
}

export interface CartItem {
    productId: string;
    variantId: string;
    quantity: number;
}

export default function CartDrawer({ cartOpen, onClose }: CartDrawerProps) {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");
        setCartItems(storedCart);
    }, []);

    // get porducts by ids
    const variantIds = cartItems.map((item: { productId: string; variantId?: string }) => item?.variantId || "")
    const { data: cartData } = useQuery({
        queryKey: ['cartData', variantIds],
        queryFn: () => getProductsByIds(variantIds),
        enabled: variantIds.length > 0,
    });

    const allVariants = cartData?.flatMap((product: Product) =>
        product?.variants?.map((variant: Variant) => ({
            ...variant,
            parentTitle: product.title,
            parentImage: product.featureImage,
        })) || []
    ) || [];

    // update quantity
    const handleQuantityChange = (variantId: string, newQty: number) => {
        if (newQty < 1) return;
        const updated = cartItems.map((item) =>
            item?.variantId === variantId ? { ...item, quantity: newQty } : item
        );
        setCartItems(updated);
        localStorage.setItem("cart", JSON.stringify(updated));
    };

    // remove item form cart
    const handleRemoveCart = (variantId: string) => {
        const updated = cartItems.filter((item) => item?.variantId !== variantId);
        setCartItems(updated);
        localStorage.setItem("cart", JSON.stringify(updated));
    }

    // calculate subtotal
    const subtotal = allVariants.reduce((accumulator:number, currentValue:Variant) => {
        const cartItem = cartItems.find((c) => c.variantId === currentValue?._id);
        return accumulator + currentValue?.price * (cartItem?.quantity || 1);
    }, 0)

    return (
        <>
            <div className={`fixed inset-0 bg-black z-30 opacity-50 visible-0 transition-opacity duration-300 
                ${cartOpen ? 'opcacity-100 visible' : 'opacity-0 invisible'}`} />
            <div className={`fixed flex top-0 right-0 h-screen bg-white shadow-lg z-40 w-[30%] 
                max-[1200px]:w-[45%] max-[768px]:w-[70%] max-[575px]:w-[90%] flex-col transition-transform duration-300 p-6 ${cartOpen ? 'translate-x-0' : 'translate-x-full'}`}>
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
                    {
                        allVariants && allVariants?.map((item: Variant, i: number) => {
                            const cartItem = cartItems.find((c) => c?.variantId === item?._id)
                            return (
                                <div key={i} className="flex items-center border-b border-[#E8ECEF] py-6">
                                    <div className="w-20 aspect-[80/96] bg-[#F3F5F7] mr-4 flex-shrink-0">
                                        <Image
                                            src={item?.parentImage || ""}
                                            alt={item?.parentTitle || ""}
                                            className="w-full h-full object-contain"
                                            width={80}
                                            height={96}
                                        />
                                    </div>

                                    <div className="flex flex-col flex-1">
                                        <div className="flex justify-between mb-2">
                                            <h2 className="max-w-[180px] text-sm font-inter font-semibold text-[#141718] leading-6">
                                                {item?.parentTitle || ""}
                                            </h2>
                                            <span className="text-sm font-semibold text-[#141718]">TK. {item?.price}</span>
                                        </div>
                                        <p className="text-xs text-[#6C7275] font-inter mb-2">
                                            Color: {item?.options?.color} | Size: {item?.options?.size}
                                        </p>
                                        <div className="flex justify-between items-center mt-auto">
                                            {/* Quantity */}
                                            <div className="flex border border-[#6C7275] rounded w-[100px] items-center justify-between px-2 py-1">
                                                <button className="p-1 cursor-pointer" aria-label="Decrease quantity" onClick={() => handleQuantityChange(item?._id, (cartItem?.quantity || 1) - 1)}>
                                                    <Minus width={16} height={16} />
                                                </button>
                                                <span className="text-xs font-inter font-semibold">{cartItem?.quantity || 1}</span>
                                                <button className="p-1 cursor-pointer" aria-label="Increase quantity" onClick={() => handleQuantityChange(item?._id, (cartItem?.quantity || 1) + 1)}>
                                                    <Plus width={16} height={16} />
                                                </button>
                                            </div>

                                            {/* Remove */}
                                            <button className="cursor-pointer" aria-label="Remove item">
                                                <X
                                                    onClick={() => handleRemoveCart(item?._id)}
                                                    color="#6C7275"
                                                    width={24}
                                                    height={24}
                                                    strokeWidth={2}
                                                />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>

                {/* Summary */}
                <div className="mt-6 border-t border-[#E8ECEF] pt-4">
                    <div className="flex justify-between py-3 border-b border-[#E8ECEF]">
                        <span className="text-base text-[#141718]">Subtotal</span>
                        <span className="text-base font-semibold text-[#141718]">TK.{subtotal}/=</span>
                    </div>
                    <div className="flex justify-between py-3 text-lg font-medium">
                        <span>Total</span>
                        <span>TK.{subtotal}/=</span>
                    </div>
                </div>

                {/* Actions */}
                <div className="mt-4 flex flex-col items-center">
                    <div className="w-full py-3 mb-4 rounded-md bg-[#141718] text-white text-lg font-medium text-center">
                        Checkout
                    </div>
                    <div className="text-sm font-semibold text-[#121212] border-b border-[#121212]">
                        View Cart
                    </div>
                </div>
            </div>
        </>
    );
};

