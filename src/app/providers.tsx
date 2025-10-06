"use client";
import { CartProvider } from "@/components/context/CartContext";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { useState } from "react";

export default function Providers({ children }: { children: React.ReactNode }) {
    const [queryClient] = useState(() => new QueryClient());
    return (
        <QueryClientProvider client={queryClient}>
            <CartProvider>
                {children}
            </CartProvider>
        </QueryClientProvider>
    );
}