import { ICartItem } from "@/types/cartItem.type";

export const updateCartItemQuantity = (
    cartItems: ICartItem[],
    variantId: string,
    newQty: number
): ICartItem[] => {
    if (newQty < 1) return cartItems;
    const updated = cartItems.map(item =>
        item.variantId === variantId ? { ...item, quantity: newQty } : item
    );
    localStorage.setItem("cart", JSON.stringify(updated));
    return updated;
};
