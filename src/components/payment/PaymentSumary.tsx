import React, { FormEvent, useState } from 'react'
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { IOrderData } from '@/types/order.type';
export default function PaymentSumary({ orderId, order }: { orderId: string; order: IOrderData }) {
    const stripe = useStripe();
    const elements = useElements();
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<string>("");

    const totalPayableBalance = order?.order[0]?.totals?.grandTotal;

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!stripe || !elements) {
            setMessage("Stripe has not loaded yet. Please wait...");
            return;
        }
        setLoading(true);
        try {
            const res = await fetch("https://3legant-backend-five.vercel.app/api/v1/payment", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ orderId }),
            });

            const data = await res.json();
            const clientSecret = data.clientSecret;

            if (!clientSecret) {
                setMessage("Failed to create payment intent.");
                setLoading(false);
                return;
            }

            const cardElement = elements.getElement(CardElement);
            if (!cardElement) {
                setMessage("Card information is missing.");
                setLoading(false);
                return;
            }

            const { paymentIntent, error } = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: cardElement,
                    billing_details: { name: order?.order[0]?.shippingAddress?.name || "Customer" },
                },
            });

            if (error) {
                setMessage(`Payment failed: ${error.message}`);
            } else if (paymentIntent && paymentIntent.status === "succeeded") {
                setMessage("Payment successful!");
                window.location.href = `/order-complete/${orderId}`;
            }
        } catch (err) {
            console.error(err);
            setMessage("Something went wrong with payment.");
        }

        setLoading(false);
    };

    return (
        <>
            <form onSubmit={handleSubmit} className="p-6 shadow rounded bg-white">
                <h3 className="text-lg font-medium mb-4">Payment</h3>
                <CardElement className="p-3 border rounded mb-4" />
                <button disabled={!stripe || loading} type="submit" className="w-full bg-blue-600 text-white py-2 px-4 rounded">
                    {loading ? "Processing..." : `Pay ${totalPayableBalance} BDT`}
                </button>
                {message && <p className="mt-3 text-center text-red-600">{message}</p>}
            </form>
        </>
    )
}
