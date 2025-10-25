
"use client";
import React, { FormEvent, useState } from "react";
import {
    CardNumberElement,
    CardExpiryElement,
    CardCvcElement,
    useStripe,
    useElements,
} from "@stripe/react-stripe-js";
import { IOrderData } from "@/types/order.type";
import { CreditCard } from "lucide-react";

export default function PaymentSummary({
    orderId,
    order,
}: {
    orderId: string;
    order: IOrderData;
}) {
    const stripe = useStripe();
    const elements = useElements();
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<string>("");
    const [isSuccess, setIsSuccess] = useState<boolean | null>(null);

    const totalPayableBalance = order?.order[0]?.totals?.grandTotal;

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!stripe || !elements) {
            setMessage("Stripe has not loaded yet. Please wait...");
            setIsSuccess(false);
            return;
        }
        setLoading(true);
        try {
            const res = await fetch(
                "https://3legant-backend-five.vercel.app/api/v1/payment",
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ orderId }),
                }
            );

            const data = await res.json();
            const clientSecret = data.clientSecret;

            if (!clientSecret) {
                setMessage("Failed to create payment intent.");
                setIsSuccess(false);
                setLoading(false);
                return;
            }

            const cardNumberElement = elements.getElement(CardNumberElement);
            if (!cardNumberElement) {
                setMessage("Card information is missing.");
                setIsSuccess(false);
                setLoading(false);
                return;
            }

            const { paymentIntent, error } = await stripe.confirmCardPayment(
                clientSecret,
                {
                    payment_method: {
                        card: cardNumberElement,
                        billing_details: {
                            name: order?.order[0]?.shippingAddress?.name || "Customer",
                        },
                    },
                }
            );

            if (error) {
                setMessage(`Payment failed: ${error.message}`);
                setIsSuccess(false);
            } else if (paymentIntent && paymentIntent.status === "succeeded") {
                setMessage("Payment successful!");
                setIsSuccess(true);
                window.location.href = `/order-complete/${orderId}`;
            }
        } catch (err) {
            console.error(err);
            setMessage("Something went wrong with payment.");
            setIsSuccess(false);
        }

        setLoading(false);
    };

    const cardStyle = {
        style: {
            base: {
                color: "#1a1a1a",
                fontSize: "16px",
                fontFamily: "'Inter', sans-serif",
                fontSmoothing: "antialiased",
                "::placeholder": { color: "#9ca3af" },
            },
            invalid: {
                color: "#ef4444",
                iconColor: "#ef4444",
            },
            complete: {
                color: "#10b981",
            },
        },
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="max-w-md mx-auto p-6 rounded-[4px] bg-white border border-[#6C7275]"
        >
            <h3 className="text-xl font-semibold text-gray-800 mb-6 text-center font-inter flex items-center justify-center gap-2.5">
                <CreditCard className="text-[#141718]" />
                <span>Secure Payment</span>
            </h3>

            {/* --- Card Number --- */}
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2 font-inter">
                    Card Number
                </label>
                <div className="border border-gray-300 rounded-xl p-3 bg-gray-50 focus-within:border-blue-500 transition">
                    <CardNumberElement options={cardStyle} />
                </div>
            </div>

            {/* --- Expiry and CVC side by side --- */}
            <div className="flex gap-3 mb-5">
                <div className="w-1/2">
                    <label className="block text-sm font-medium text-gray-700 mb-2 font-inter">
                        Expiry Date
                    </label>
                    <div className="border border-gray-300 rounded-xl p-3 bg-gray-50 focus-within:border-blue-500 transition">
                        <CardExpiryElement options={cardStyle} />
                    </div>
                </div>

                <div className="w-1/2">
                    <label className="block text-sm font-medium text-gray-700 mb-2 font-inter">
                        CVC
                    </label>
                    <div className="border border-gray-300 rounded-xl p-3 bg-gray-50 focus-within:border-blue-500 transition">
                        <CardCvcElement options={cardStyle} />
                    </div>
                </div>
            </div>

            <button
                disabled={!stripe || loading}
                type="submit"
                className={`w-full py-3 rounded-[8px] text-white font-medium font-inter transition cursor-pointer bg-[#141718] ${loading ? "cursor-not-allowed opacity-70" : "hover:bg-[#2a2e30]"
                    }`}
            >
                {loading ? "Processing..." : `Pay ${totalPayableBalance} TK`}
            </button>

            {message && (
                <p
                    className={`mt-4 text-center text-sm font-inter font-medium transition-all duration-300 ${isSuccess ? "text-green-600" : "text-red-600"
                        }`}
                >
                    {message}
                </p>
            )}
        </form>
    );
}
