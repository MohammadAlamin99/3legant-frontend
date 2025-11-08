import { useRouter } from "next/navigation";
import React from 'react'

export default function CardSummery({ subtotal }: { subtotal: number }) {
    const router = useRouter();
    return (
        <>
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
        </>
    )
}
