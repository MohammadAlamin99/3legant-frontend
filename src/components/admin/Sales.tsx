import React from 'react';
import RecentOrder from './RecentOrder';
import DashboardHeader from './DashboardHeader';
import Sidebar from './Sidebar';
export default function Sales() {
    const recentOrders = [
        { id: 1, name: 'Samrt watch', category: 'Watch', price: '250' },
        { id: 2, name: 'Samrt watch', category: 'Watch', price: '250' },
        { id: 3, name: 'Samrt watch', category: 'Watch', price: '250' },
        { id: 4, name: 'Samrt watch', category: 'Watch', price: '250' }
    ];

    return (
        <div className="flex min-h-screen bg-gray-50">
            {/* Sidebar */}
            <Sidebar />
            {/* Main Content */}
            <div className="flex-1 flex flex-col">
                {/* Dashboard Header */}
                <DashboardHeader />
                {/* Dashboard Content */}
                <main className="flex-1 p-8 overflow-auto">
                    {/* Stats Grid */}
                    <div className="grid grid-cols-4 gap-6 mb-8">
                        {/* <StateCard title="Total" value="160" change="+12.5%" isPositive={true} />
                        <StateCard title="Total" value="160" change="+12.5%" isPositive={true} />
                        <StateCard title="Total" value="160" change="+12.5%" isPositive={true} />
                        <StateCard title="Total" value="160" change="+12.5%" isPositive={true} /> */}
                    </div>
                    <div className="grid grid-cols-3 gap-6 mb-8">
                        {/* Recent Order */}
                        <div className="bg-white rounded-lg p-6 shadow-sm">
                            <h2 className="text-lg font-semibold mb-6 font-inter text-[#1F2937]">Recent Order</h2>
                            <RecentOrder recentOrders={recentOrders} />
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};
