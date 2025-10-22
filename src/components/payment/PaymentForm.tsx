"use client";

import React, { useState, FormEvent } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
    Elements,
    CardElement,
    useStripe,
    useElements,
} from "@stripe/react-stripe-js";

// ✅ Load Stripe with your publishable key
const stripePromise = loadStripe(
    "pk_test_51SL7SXPpMtwKwUIt6XVhyBG4UgkIPHp71xysDtUtTTXjMmUSaEuZwrUIxqwmrgEccVpsGCz2jBqZ1s4ImYJa47yF00tF5TZJcf"
);

function PaymentForm() {
    const stripe = useStripe();
    const elements = useElements();

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<string>("");

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!stripe || !elements) {
            setMessage("Stripe has not loaded yet. Please wait...");
            return;
        }

        setLoading(true);

        try {
            // 1️⃣ Create PaymentIntent from backend
            const res = await fetch("http://localhost:5000/api/v1/payment", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    amount: 2000,
                    currency: "usd",
                    orderId: "order_123",
                }),
            });

            const data = await res.json();
            const clientSecret = data.clientSecret;

            if (!clientSecret) {
                setMessage("Failed to create payment intent.");
                setLoading(false);
                return;
            }

            // 2️⃣ Confirm payment on frontend
            const cardElement = elements.getElement(CardElement);

            if (!cardElement) {
                setMessage("Card information is missing.");
                setLoading(false);
                return;
            }

            const { paymentIntent, error } = await stripe.confirmCardPayment(
                clientSecret,
                {
                    payment_method: {
                        card: cardElement,
                        billing_details: { name: "Test User" },
                    },
                }
            );

            if (error) {
                setMessage(`❌ Payment failed: ${error.message}`);
            } else if (paymentIntent && paymentIntent.status === "succeeded") {
                setMessage("✅ Payment successful!");
            }
        } catch (err) {
            console.error(err);
            setMessage("Something went wrong with payment.");
        }

        setLoading(false);
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="max-w-md mx-auto p-6 shadow rounded bg-white"
        >
            <CardElement className="p-3 border rounded" />
            <button
                disabled={!stripe || loading}
                type="submit"
                className="mt-4 bg-blue-600 text-white py-2 px-4 rounded"
            >
                {loading ? "Processing..." : "Pay $20"}
            </button>
            <p className="mt-3 text-center">{message}</p>
        </form>
    );
}

export default function PaymentPage() {
    return (
        <Elements stripe={stripePromise}>
            <PaymentForm />
        </Elements>
    );
}
