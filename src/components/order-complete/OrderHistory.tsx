import React from 'react';
// import Image from "next/image";
const OrderHistory = () => {
    return (
        <div>
            <div className="flex justify-center gap-14 sm:gap-6 mb-10">
                <div className="relative bg-gray-100 w-20 h-24 overflow-hidden">
                    {/* <Image
                        src=""
                        alt="product"
                        className="w-full h-full object-cover"
                        width={200}
                        height={250}
                    /> */}
                    <span className="absolute -top-2 -right-2 w-6 h-6 bg-gray-900 text-white text-xs font-semibold flex items-center justify-center rounded-full">
                        12
                    </span>
                </div>
            </div>
            <div className="max-w-xs mx-auto font-inter">
                <div className="flex justify-between py-3">
                    <span className="text-gray-500 font-semibold text-sm">
                        Order code:
                    </span>
                    <span className="text-gray-900 font-semibold text-sm">
                        #1234
                    </span>
                </div>
                <div className="flex justify-between py-3">
                    <span className="text-gray-500 font-semibold text-sm">
                        Date:
                    </span>
                    <span className="text-gray-900 font-semibold text-sm">
                        10/05/1999
                    </span>
                </div>
                <div className="flex justify-between py-3">
                    <span className="text-gray-500 font-semibold text-sm">
                        Total:
                    </span>
                    <span className="text-gray-900 font-semibold text-sm">
                        TK. 00
                    </span>
                </div>
                <div className="flex justify-between py-3">
                    <span className="text-gray-500 font-semibold text-sm">
                        Payment method:
                    </span>
                    <span className="text-gray-900 font-semibold text-sm">
                        Cash On Delivery
                    </span>
                </div>
            </div>

            {/* Button */}
            <div className="mt-10 flex justify-center">
                <button className="bg-gray-900 text-white px-6 py-3 rounded-full 
                                text-base font-medium hover:bg-gray-800 transition 
                                font-inter cursor-pointer">
                    Purchase history
                </button>
            </div>
        </div>
    );
}

export default OrderHistory;
