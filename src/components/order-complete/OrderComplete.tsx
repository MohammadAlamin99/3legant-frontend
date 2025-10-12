import { ChevronLeft } from "lucide-react";
import OrderProgress from "./OrderProgress";
import Link from "next/link";
import OrderHistory from "./OrderHistory";
import { getOrder } from "@/actions/order.action";

export default async function OrderComplete() {
const order = await getOrder("655845");
console.log(order)
    return (
        <div className="py-20 px-4 sm:px-6">
            <div className="max-w-5xl mx-auto">
                <div className="flex items-center gap-2 mb-10 sm:hidden">
                    <ChevronLeft />
                    <Link href="/" className="text-sm font-medium text-gray-600">
                        back to home
                    </Link>
                </div>
                {/* Heading */}
                <h1 className="text-center text-3xl font-poppins font-semibold text-black mb-10">
                    Complete!
                </h1>
                {/* Progress Bar */}
                <OrderProgress />
                {/* Order Card */}
                <div className="flex justify-center">
                    <div className="bg-white shadow-lg rounded-lg w-full max-w-2xl overflow-hidden">
                        <div className="p-8 sm:p-20">
                            {/* Thank you message */}
                            <div className="text-center mb-10">
                                <p className="text-gray-500 text-2xl font-medium mb-2 font-poppins">
                                    Thank you! 🎉
                                </p>
                                <h2 className="text-gray-900 text-3xl font-medium font-poppins">
                                    Your order has been received
                                </h2>
                            </div>
                            {/* Order Details */}
                            <OrderHistory />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

