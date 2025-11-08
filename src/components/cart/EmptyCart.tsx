import { ShoppingCart } from 'lucide-react'
import React from 'react'

export default function EmptyCart() {
    return (
        <>
            <div className="flex flex-col items-center gap-1 justify-center text-center text-[#6C7275] my-auto py-10 md:py-20">
                <ShoppingCart width={40} height={40} />
                <p className="font-inter text-lg font-medium">Your cart is empty</p>
                <p className="font-inter text-sm text-[#9CA3AF]">Add some items to get started!</p>
            </div>
        </>
    )
}
