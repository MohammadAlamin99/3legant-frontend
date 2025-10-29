import { Bell, ChevronDown } from 'lucide-react'
import React from 'react'
import Image from 'next/image'
export default function DashboardHeader() {
    return (
        <>
            {/* Header */}
            <header className="bg-white border-b border-gray-200 px-6 py-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold font-inter text-[#1F2937]">Sales Overview</h1>
                    <div className="flex items-center gap-4">
                        <button className="p-2 hover:bg-gray-50 rounded-lg relative">
                            <Bell className="w-6 h-6 text-gray-600" />
                            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                        </button>
                        <button className="flex items-center gap-2">
                            <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden">
                                <Image
                                    src="/images/promotion_banner.jpg"
                                    width={40}
                                    height={40}
                                    alt="user-profile"
                                />

                            </div>
                            <ChevronDown className="w-4 h-4 text-gray-600" />
                        </button>
                    </div>
                </div>
            </header>
        </>
    )
}
