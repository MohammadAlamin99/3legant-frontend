'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
    BarChart3,
    HelpCircle,
    LogOut,
    Package,
    Settings,
    ShoppingCart,
    Store,
    Users,
} from 'lucide-react'
import React from 'react'

export default function Sidebar() {
    const pathname = usePathname()

    const links = [
        { name: 'Sales Overview', icon: BarChart3, href: '/dashboard' },
        { name: 'Order Management', icon: ShoppingCart, href: '/dashboard/order' },
        { name: 'Inventory', icon: Package, href: '/dashboard/product' },
        { name: 'Customer', icon: Users, href: '/dashboard/customer' },
        { name: 'Setting', icon: Settings, href: '/dashboard/setting' },
    ]

    const currentPath = pathname.endsWith('/')
        ? pathname.slice(0, -1)
        : pathname


    return (
        <aside className="w-64 bg-white border-r border-gray-200 flex flex-col min-h-screen">
            <div className="p-6 border-b-[1px] border-[#E9EAEB]">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center">
                        <Store color='white' width={20} height={20} />
                    </div>
                    <span className="text-[20px] font-bold font-inter leading-[150%] text-[#1F2937]">Eco-Dashboard</span>
                </div>
            </div>

            <nav className="flex-1 px-4 pt-6">
                {links.map(({ name, icon: Icon, href }) => {
                    const normalizedHref = href.endsWith('/') ? href.slice(0, -1) : href
                    const isActive =
                        currentPath === normalizedHref ||
                        (currentPath.startsWith(normalizedHref + '/') &&
                            normalizedHref !== '/dashboard')

                    return (
                        <Link
                            key={href}
                            href={href}
                            className={`w-full flex items-center gap-3  px-4 py-3 mb-2 rounded-lg transition-colors font-normal text-[16px] font-inter ${isActive
                                ? 'bg-[#4F46E5] text-white'
                                : 'text-[#1F2937] hover:bg-gray-50'
                                }`}
                        >
                            <Icon className="w-5 h-5" />
                            <span>{name}</span>
                        </Link>
                    )
                })}
            </nav>

            <div className="p-4 border-t border-gray-200">
                <button className="w-full flex items-center text-[16px] font-inter cursor-pointer gap-3 px-4 py-3 text-[#1F2937] hover:bg-gray-50 rounded-lg mb-2">
                    <HelpCircle className="w-5 h-5" />
                    <span>Help</span>
                </button>
                <button className="w-full flex items-center gap-3 px-4  text-[16px] font-inter cursor-pointer  py-3 text-[#1F2937] hover:bg-gray-50 rounded-lg">
                    <LogOut className="w-5 h-5" />
                    <span>Logout</span>
                </button>
            </div>
        </aside>
    )
}
