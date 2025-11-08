import { ICartItem } from "@/types/cartItem.type";

export const removeCartItem = (cartItems: ICartItem[], variantId: string): ICartItem[] => {
    const updated = cartItems.filter(item => item.variantId !== variantId);
    localStorage.setItem("cart", JSON.stringify(updated));
    return updated;
};