"use client";
// import React, { useState } from "react";
// import Image from "next/image";
import { Minus, Plus, X } from "lucide-react";
import { useState } from "react";

interface CartDrawerProps {
    cartOpen: boolean;
    onClose?: () => void;
}

export default function CartDrawer({ cartOpen, onClose }: CartDrawerProps) {


    const [quantity, setQuantity] = useState(1);

    const handleQuantityChange = (newQty: number) => {
        if(newQty<1){
            return
        }
        setQuantity(newQty)
    }

    const subtotal = 1200;
    const total = 1200;

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
                    <div className="flex items-center border-b border-[#E8ECEF] py-6">
                        <div className="w-20 aspect-[80/96] bg-[#F3F5F7] mr-4 flex-shrink-0">
                            {/* <Image
                src="/images/sample-product.jpg"
                alt="Sample Product"
                className="w-full h-full object-contain"
              /> */}
                        </div>

                        <div className="flex flex-col flex-1">
                            <div className="flex justify-between mb-2">
                                <h2 className="max-w-[180px] text-sm font-inter font-semibold text-[#141718] leading-6">
                                    Sample Product Name
                                </h2>
                                <span className="text-sm font-semibold text-[#141718]">TK. 1200</span>
                            </div>

                            <p className="text-xs text-[#6C7275] font-inter mb-2">Color: Red | Size: M</p>

                            <div className="flex justify-between items-center mt-auto">
                                {/* Quantity */}
                                <div className="flex border border-[#6C7275] rounded w-[100px] items-center justify-between px-2 py-1">
                                    <button className="p-1 cursor-pointer" aria-label="Decrease quantity" onClick={()=> handleQuantityChange(quantity-1)}>
                                        <Minus width={16} height={16} />
                                    </button>
                                    <span className="text-xs font-inter font-semibold">{quantity}</span>
                                    <button className="p-1 cursor-pointer" aria-label="Increase quantity" onClick={() => handleQuantityChange(quantity + 1)}>
                                        <Plus width={16} height={16} />
                                    </button>
                                </div>

                                {/* Remove */}
                                <button className="cursor-pointer" aria-label="Remove item">
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
                </div>

                {/* Summary */}
                <div className="mt-6 border-t border-[#E8ECEF] pt-4">
                    <div className="flex justify-between py-3 border-b border-[#E8ECEF]">
                        <span className="text-base text-[#141718]">Subtotal</span>
                        <span className="text-base font-semibold text-[#141718]">TK. {subtotal}</span>
                    </div>
                    <div className="flex justify-between py-3 text-lg font-medium">
                        <span>Total</span>
                        <span>TK. {total}</span>
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

