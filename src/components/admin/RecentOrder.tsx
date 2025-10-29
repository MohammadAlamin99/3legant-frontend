import React from 'react'
interface recentOrders {
    id: number;
    name: string;
    category: string;
    price: string;
}
export default function RecentOrder({ recentOrders }: { recentOrders: recentOrders[] }) {
    return (
        <>
            <div className="space-y-4">
                {recentOrders.map((order) => (
                    <div key={order.id} className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-xl">
                            ⌚
                        </div>
                        <div className="flex-1">
                            <p className="font-medium text-sm text-[#1F2937] font-inter">{order.name}</p>
                            <p className="text-xs text-[#6B7280] font-inter">{order.category}</p>
                        </div>
                        <span className="text-[#6B7280] text-sm font-inter font-normal">TK. {order.price}</span>
                    </div>
                ))}
            </div>
        </>
    )
}
