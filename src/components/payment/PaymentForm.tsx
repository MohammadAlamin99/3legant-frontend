
"use client";

import React, { useState, FormEvent, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
    Elements,
    CardElement,
    useStripe,
    useElements,
} from "@stripe/react-stripe-js";

// Load Stripe
const stripePromise = loadStripe("pk_test_51SL7SXPpMtwKwUIt6XVhyBG4UgkIPHp71xysDtUtTTXjMmUSaEuZwrUIxqwmrgEccVpsGCz2jBqZ1s4ImYJa47yF00tF5TZJcf");

interface PaymentFormProps {
    orderId: string;
}

function PaymentForm({ orderId }: PaymentFormProps) {
    const stripe = useStripe();
    const elements = useElements();

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<string>("");
    const [amount, setAmount] = useState<number>(0);

    // Fetch order total from backend
    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const res = await fetch(`https://3legant-backend-five.vercel.app/api/v1/order/${orderId}`);
                const data = await res.json();
                if (data.order) {
                    setAmount(data.order.totals.grandTotal);
                }
            } catch (err) {
                console.error("Failed to fetch order:", err);
            }
        };
        if (orderId) fetchOrder();
    }, [orderId]);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!stripe || !elements) {
            setMessage("Stripe has not loaded yet. Please wait...");
            return;
        }

        setLoading(true);

        try {
            // Create payment intent using your backend
            const res = await fetch("https://3legant-backend-five.vercel.app/api/v1/payment", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ orderId }),
            });

            const data = await res.json();
            console.log(data)
            const clientSecret = data.clientSecret;

            if (!clientSecret) {
                setMessage("Failed to create payment intent.");
                setLoading(false);
                return;
            }

            // Confirm payment
            const cardElement = elements.getElement(CardElement);
            if (!cardElement) {
                setMessage("Card information is missing.");
                setLoading(false);
                return;
            }

            const { paymentIntent, error } = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: cardElement,
                    billing_details: { name: "Customer" }, // Replace with real user name
                },
            });

            if (error) {
                setMessage(`❌ Payment failed: ${error.message}`);
            } else if (paymentIntent && paymentIntent.status === "succeeded") {
                setMessage("✅ Payment successful!");
                // Redirect to order confirmation page
                window.location.href = `/order-complete/${orderId}`;
            }
        } catch (err) {
            console.error(err);
            setMessage("Something went wrong with payment.");
        }

        setLoading(false);
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 shadow rounded bg-white">
            <CardElement className="p-3 border rounded" />
            <button disabled={!stripe || loading} type="submit" className="mt-4 bg-blue-600 text-white py-2 px-4 rounded">
                {loading ? "Processing..." : `Pay ${amount} BDT`}
            </button>
            <p className="mt-3 text-center">{message}</p>
        </form>
    );
}

export default function PaymentPageWrapper({ orderId }: { orderId: string }) {
    return (
        <Elements stripe={stripePromise}>
            <PaymentForm orderId={orderId} />
        </Elements>
    );
}
