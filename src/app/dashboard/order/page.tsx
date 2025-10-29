import DashboardHeader from '@/components/admin/DashboardHeader'
import Sidebar from '@/components/admin/Sidebar'
import React from 'react'

export default function Page() {
    return (
        <>
            <div className="flex min-h-screen bg-gray-50">
                <Sidebar />
                <div className="flex-1 flex flex-col">
                    <DashboardHeader />
                    <div className="flex-1 p-8 overflow-auto">
                        <h1>Order Page</h1>
                    </div>
                </div>
            </div>
        </>
    )
}
