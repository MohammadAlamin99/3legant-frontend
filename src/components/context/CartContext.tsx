import React, { createContext, ReactNode, useContext, useState } from 'react';


interface CartContextType {
    cartOpen: boolean;
    setCartOpen: (open: boolean) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
    const [cartOpen, setCartOpen] = useState(false);
    return (
        <div>
            <CartContext.Provider value={{ cartOpen, setCartOpen }}>
                {children}
            </CartContext.Provider>
        </div>
    );
}

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) throw new Error("useCart must be used within CartProvider");
    return context;
};

