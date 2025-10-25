
"use client";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { IOrderData } from "@/types/order.type";
import PaymentSumary from "./PaymentSumary";
import PaymentOrderSummary from "./PaymentOrderSummary";

const stripePromise = loadStripe("pk_test_51SL7SXPpMtwKwUIt6XVhyBG4UgkIPHp71xysDtUtTTXjMmUSaEuZwrUIxqwmrgEccVpsGCz2jBqZ1s4ImYJa47yF00tF5TZJcf");

export default function PaymentPageWrapper({ orderId, order }: { orderId: string; order: IOrderData }) {
    return (
        <div className="py-10 md:py-20">
            <div className="container mx-auto px-4">
                <div className="text-center mb-14">
                    <h2 className="text-[54px] md:text-[40px] font-medium font-poppins">Payment Method</h2>
                </div>

                <div className="flex flex-col md:flex-row gap-6">
                    {/* Left: Order Summary */}
                    <div className="md:w-1/2">
                        <PaymentOrderSummary order={order} />
                    </div>

                    {/* Right: Payment Form */}
                    <div className="md:w-1/2">
                        <Elements stripe={stripePromise}>
                            <PaymentSumary orderId={orderId} order={order} />
                        </Elements>
                    </div>
                </div>
            </div>
        </div>
    );
}
