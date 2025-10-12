"use client";
import React, { useEffect, useMemo, useState } from "react";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { getProductsByIds } from "@/actions/product.action";
import { useCart } from "../context/CartContext";
import SignUp from "../authentication/SignUp";
import Progress from "./Progress";
import ContactInfo from "./ContactInfo";
import OrderSummary from "./OrderSummary";
import { createOrder } from "@/actions/order.action";


interface CartItem {
  productId: string;
  variantId: string;
  quantity: number;
}

interface Variant {
  _id: string;
  title?: string;
  parentTitle?: string;
  image?: string;
  parentImage?: string;
  options?: {
    color?: string;
    size?: string;
    [key: string]: string | undefined;
  };
  price: number;
}

interface Product {
  _id: string;
  title: string;
  featureImage: string;
  variants: Variant[];
}

const CheckOut = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [cartData, setCartData] = useState<Product[]>([]);
  const [shippingCost] = useState<number>(110);
  const [showSignUp, setShowSignUp] = useState(false);
  const router = useRouter();
  const { setCartOpen } = useCart();
  useEffect(() => {
    setCartOpen(false);
  }, [setCartOpen]);

  // Load cart items from localStorage
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("cart") || "[]");
    setCartItems(stored);
  }, []);

  // Fetch product details by variantIds
  useEffect(() => {
    const fetchCartProducts = async () => {
      const variantIds = cartItems.map((i) => i.variantId);
      if (variantIds.length > 0) {
        const data = await getProductsByIds(variantIds);
        setCartData(data);
      }
    };
    fetchCartProducts();
  }, [cartItems]);

  // Combine variant + product info
  const allVariants: Variant[] = useMemo(() => {
    return cartItems.map((item) => {
      const product = cartData.find((p) =>
        p.variants.some((v) => v._id === item.variantId)
      );
      const variant = product?.variants.find((v) => v._id === item.variantId);
      return variant
        ? {
          ...variant,
          parentTitle: product?.title,
          parentImage: product?.featureImage,
        }
        : {
          _id: item.variantId,
          price: 0,
          options: {},
          parentTitle: "",
          parentImage: "",
        };
    });
  }, [cartItems, cartData]);

  // Quantity map
  const cartMap = useMemo(
    () => new Map(cartItems.map((i) => [i.variantId, i.quantity])),
    [cartItems]
  );

  // Subtotal & total
  const subtotal = allVariants.reduce((acc, curr) => {
    const qty = cartMap.get(curr._id) || 1;
    return acc + curr.price * qty;
  }, 0);
  const total = subtotal + shippingCost;

  // Quantity handlers
  const handleQuantityChange = (variantId: string, newQty: number) => {
    if (newQty < 1) return;
    const updated = cartItems.map((item) =>
      item.variantId === variantId ? { ...item, quantity: newQty } : item
    );
    setCartItems(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  // log in
  const getToken = () => {
    const match = document.cookie.match(new RegExp('(^| )token=([^;]+)'));
    return match ? match[2] : null;
  };

  const handleCheckout = () => {
    const token = getToken();
    if (!token) {
      setShowSignUp(true);
      return;
    }
  };

  const handlePlaceOrder = () => {
    router.push("/order-complete");
  };

  const handleOrder = async (formData: { name: string; phone: string; email: string; address: string, note: string }) => {
    try {
      const shippingAddress = { name: formData.name, address: formData.address };
      const contact = { email: formData.email, phone: formData.phone };
      const payment = { method: "COD" };
      const note = formData.note || "";
      const createdOrder = await createOrder(
        cartItems,
        shippingAddress,
        contact,
        payment,
        note
      );
      if (createdOrder && createdOrder?.order?._id) {
        await router.push(`/order-complete/${createdOrder?.order?._id}`);
      }
    } catch (err) {
      console.error("Failed to create order:", err);
    }
  };

  return (
    <div className="py-10 md:py-20">
      <div className="container mx-auto px-4">
        {/* Title */}
        <button
          onClick={() => router.back()}
          className="text-[#605F5F] font-medium text-base font-inter flex md:hidden"
        >
          <ChevronLeft />
          back
        </button>
        <div className="text-center mb-10">
          <h2 className="font-poppins text-[40px] md:text-[54px] font-medium text-black">
            Check Out
          </h2>
        </div>
        {/* Progress Steps */}
        <Progress />

        {/* Layout */}
        <div className="flex flex-col md:flex-row gap-6">
          {/* Left Section */}
          <ContactInfo
            handleCheckout={handleCheckout}
            allVariants={allVariants}
            handleOrder={handleOrder}
          />
          {/* Right Section */}
          <OrderSummary
            allVariants={allVariants}
            cartMap={cartMap}
            subtotal={subtotal}
            shippingCost={shippingCost}
            total={total}
            handleQuantityChange={handleQuantityChange}
            handlePlaceOrder={handlePlaceOrder}
            handleOrder={() => handleOrder({
              name: "",
              phone: "",
              email: "",
              address: "",
              note: ""
            })}
            handleCheckout={handleCheckout}
          />
        </div>
      </div>
      {showSignUp && <SignUp onClose={() => setShowSignUp(false)} />}
    </div>
  );
};

export default CheckOut;
