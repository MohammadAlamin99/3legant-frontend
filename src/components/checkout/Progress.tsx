import React from 'react';

export default function Progress() {

    return (
        <>
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
        </>
    );
}

