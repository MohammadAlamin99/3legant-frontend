"use client"
import Image from "next/image";
import { getProductsByIds } from "@/actions/product.action";
import { useQuery } from "@tanstack/react-query";
import { Minus, Plus, X } from "lucide-react";
import { useEffect, useState } from "react";

interface CartDrawerProps {
    cartOpen: boolean;
    onClose?: () => void;
}

export default function CartDrawer({ cartOpen, onClose }: CartDrawerProps) {

    const [quantity, setQuantity] = useState(1);
    const [cartItems, setCartItems] = useState<{ productId: string }[]>([]);

    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");
        setCartItems(storedCart);
    }, []);

    // get porducts by ids
    const variantIds = cartItems.map((item: { productId: string }) => item?.variantId || "")
    const { data: cartData } = useQuery({
        queryKey: ['cartData', variantIds],
        queryFn: () => getProductsByIds(variantIds),
        enabled: variantIds.length > 0,
    });

    const handleQuantityChange = (newQty: number) => {
        if (newQty < 1) return;
        setQuantity(newQty);
    };

    const allVariants = cartData?.map((product) =>
        product.variants?.map((variant: any) => ({
            ...variant,
            parentTitle: product.title,
            parentImage: product.featureImage,
        })) || []
    ) || [];

const filteredVariants = allVariants.filter((variant) =>
    variantIds.includes(variant._id)
  );
  console.log(allVariants)


    const subtotal = 1200;
    const total = 1200;
    // console.log(cartData);
    return (
        <>
            <div className={`fixed inset-0 bg-black z-30 opacity-50 visible-0 transition-opacity duration-300 
                ${cartOpen ? 'opcacity-100 visible' : 'opacity-0 invisible'}`} />
            <div className={`fixed flex top-0 right-0 h-screen bg-white shadow-lg z-40 w-[30%] 
                max-[1200px]:w-[45%] max-[768px]:w-[70%] max-[575px]:w-[90%] flex-col transition-transform duration-300 p-6 ${cartOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                <div className="flex justify-between items-center mb-4">
                    <h3 className="font-poppins text-[28px] font-medium leading-[34px] tracking-[-0.6px] text-[#121212]">
                        Cart
                    </h3>
                    <button className="cursor-pointer" aria-label="Close cart drawer">
                        <X
                            onClick={onClose}
                            color="#6C7275"
                            width={24}
                            height={24}
                            strokeWidth={2}
                        />
                    </button>
                </div>
                <div className="flex flex-col gap-6 overflow-y-auto flex-1">
                    {
                        cartData && cartData?.map((item: { featureImage?: string; name?: string; price?: number; color?: string; size?: string }, i: number) => (
                            <div key={i} className="flex items-center border-b border-[#E8ECEF] py-6">
                                <div className="w-20 aspect-[80/96] bg-[#F3F5F7] mr-4 flex-shrink-0">
                                    <Image
                                        src={item?.featureImage || ""}
                                        alt={item?.name || ""}
                                        className="w-full h-full object-contain"
                                        width={80}
                                        height={96}
                                    />
                                </div>

                                <div className="flex flex-col flex-1">
                                    <div className="flex justify-between mb-2">
                                        <h2 className="max-w-[180px] text-sm font-inter font-semibold text-[#141718] leading-6">
                                            {item?.title}
                                        </h2>
                                        <span className="text-sm font-semibold text-[#141718]">TK. {item?.variants?.[0]?.price}</span>
                                    </div>
                                    {
                                        item?.variants && item?.variants.map((v, i) => (
                                            <p key={i} className="text-xs text-[#6C7275] font-inter mb-2">
                                                Color: {v?.options?.color} | Size: {v?.options?.size}
                                            </p>

                                        ))
                                    }
                                    <div className="flex justify-between items-center mt-auto">
                                        {/* Quantity */}
                                        <div className="flex border border-[#6C7275] rounded w-[100px] items-center justify-between px-2 py-1">
                                            <button className="p-1 cursor-pointer" aria-label="Decrease quantity" onClick={() => handleQuantityChange(quantity - 1)}>
                                                <Minus width={16} height={16} />
                                            </button>
                                            <span className="text-xs font-inter font-semibold">{quantity}</span>
                                            <button className="p-1 cursor-pointer" aria-label="Increase quantity" onClick={() => handleQuantityChange(quantity + 1)}>
                                                <Plus width={16} height={16} />
                                            </button>
                                        </div>

                                        {/* Remove */}
                                        <button className="cursor-pointer" aria-label="Remove item">
                                            <X
                                                color="#6C7275"
                                                width={24}
                                                height={24}
                                                strokeWidth={2}
                                            />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>

                {/* Summary */}
                <div className="mt-6 border-t border-[#E8ECEF] pt-4">
                    <div className="flex justify-between py-3 border-b border-[#E8ECEF]">
                        <span className="text-base text-[#141718]">Subtotal</span>
                        <span className="text-base font-semibold text-[#141718]">TK. {subtotal}</span>
                    </div>
                    <div className="flex justify-between py-3 text-lg font-medium">
                        <span>Total</span>
                        <span>TK. {total}</span>
                    </div>
                </div>

                {/* Actions */}
                <div className="mt-4 flex flex-col items-center">
                    <div className="w-full py-3 mb-4 rounded-md bg-[#141718] text-white text-lg font-medium text-center">
                        Checkout
                    </div>
                    <div className="text-sm font-semibold text-[#121212] border-b border-[#121212]">
                        View Cart
                    </div>
                </div>
            </div>
        </>
    );
};



// "use client";
// import Image from "next/image";
// import { getProductsByIds } from "@/actions/product.action";
// import { useQuery } from "@tanstack/react-query";
// import { Minus, Plus, X } from "lucide-react";
// import { useEffect, useState } from "react";

// interface CartItem {
//   productId: string;
//   variantId: string;
//   quantity: number;
// }

// interface CartDrawerProps {
//   cartOpen: boolean;
//   onClose?: () => void;
// }

// export default function CartDrawer({ cartOpen, onClose }: CartDrawerProps) {
//   const [cartItems, setCartItems] = useState<CartItem[]>([]);

//   // 🛒 Load cart from localStorage
//   useEffect(() => {
//     const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");
//     setCartItems(storedCart);
//   }, []);

//   // 🧩 Collect all variant IDs
//   const variantIds = cartItems.map((item) => item.variantId);

//   // 🔄 Fetch product/variant data
//   const { data: cartData = [] } = useQuery({
//     queryKey: ["cartData", variantIds],
//     queryFn: () => getProductsByIds(variantIds),
//     enabled: variantIds.length > 0,
//   });

//   // 🔢 Update Quantity
//   const handleQuantityChange = (variantId: string, newQty: number) => {
//     if (newQty < 1) return;
//     const updated = cartItems.map((item) =>
//       item.variantId === variantId ? { ...item, quantity: newQty } : item
//     );
//     setCartItems(updated);
//     localStorage.setItem("cart", JSON.stringify(updated));
//   };

//   // ❌ Remove Item
//   const handleRemoveFromCart = (variantId: string) => {
//     const updated = cartItems.filter((item) => item.variantId !== variantId);
//     setCartItems(updated);
//     localStorage.setItem("cart", JSON.stringify(updated));
//   };

//   // 🧠 Combine all products' variants into a flat array
//   const allVariants = cartData.flatMap((product: any) =>
//     product.variants?.map((variant: any) => ({
//       ...variant,
//       parentTitle: product.title,
//       parentImage: product.featureImage,
//     })) || []
//   );

//   // 🎯 Filter only the variants that are in cart
//   const filteredVariants = allVariants.filter((variant) =>
//     variantIds.includes(variant._id)
//   );
//   console.log(allVariants)

//   // 💰 Calculate total
//   const subtotal = filteredVariants.reduce((acc, variant) => {
//     const cartItem = cartItems.find((c) => c.variantId === variant._id);
//     return acc + variant.price * (cartItem?.quantity || 1);
//   }, 0);

//   return (
//     <>
//       {/* Overlay */}
//       <div
//         className={`fixed inset-0 bg-black z-30 opacity-50 transition-opacity duration-300
//           ${cartOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}
//       />

//       {/* Drawer */}
//       <div
//         className={`fixed flex top-0 right-0 h-screen bg-white shadow-lg z-40 w-[30%]
//           max-[1200px]:w-[45%] max-[768px]:w-[70%] max-[575px]:w-[90%] flex-col transition-transform duration-300 p-6 ${
//             cartOpen ? "translate-x-0" : "translate-x-full"
//           }`}
//       >
//         {/* Header */}
//         <div className="flex justify-between items-center mb-4">
//           <h3 className="font-poppins text-[28px] font-medium text-[#121212]">Cart</h3>
//           <X onClick={onClose} className="cursor-pointer" color="#6C7275" />
//         </div>

//         {/* Items */}
//         <div className="flex flex-col gap-6 overflow-y-auto flex-1">
//           {filteredVariants.length === 0 && (
//             <p className="text-center text-gray-500 mt-10">Your cart is empty</p>
//           )}

//           {filteredVariants.map((variant, i) => {
//             const cartItem = cartItems.find((c) => c.variantId === variant._id);

//             return (
//               <div key={i} className="flex items-center border-b border-[#E8ECEF] py-6">
//                 <div className="w-20 aspect-[80/96] bg-[#F3F5F7] mr-4 flex-shrink-0">
//                   <Image
//                     src={variant.image || variant.parentImage}
//                     alt={variant.title}
//                     className="w-full h-full object-contain"
//                     width={80}
//                     height={96}
//                   />
//                 </div>

//                 <div className="flex flex-col flex-1">
//                   <div className="flex justify-between mb-2">
//                     <h2 className="max-w-[180px] text-sm font-semibold">
//                       {variant.parentTitle}
//                     </h2>
//                     <span className="text-sm font-semibold">৳{variant.price}</span>
//                   </div>
//                   <p className="text-xs text-[#6C7275] mb-2">
//                     Color: {variant.options?.color} | Size: {variant.options?.size}
//                   </p>

//                   {/* Quantity + Remove */}
//                   <div className="flex justify-between items-center mt-auto">
//                     <div className="flex border rounded w-[100px] items-center justify-between px-2 py-1">
//                       <button
//                         onClick={() =>
//                           handleQuantityChange(variant._id, (cartItem?.quantity || 1) - 1)
//                         }
//                       >
//                         <Minus width={16} height={16} />
//                       </button>
//                       <span className="text-xs font-semibold">
//                         {cartItem?.quantity || 1}
//                       </span>
//                       <button
//                         onClick={() =>
//                           handleQuantityChange(variant._id, (cartItem?.quantity || 1) + 1)
//                         }
//                       >
//                         <Plus width={16} height={16} />
//                       </button>
//                     </div>
//                     <button onClick={() => handleRemoveFromCart(variant._id)}>
//                       <X color="#6C7275" width={20} height={20} />
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             );
//           })}
//         </div>

//         {/* Summary */}
//         <div className="mt-6 border-t border-[#E8ECEF] pt-4">
//           <div className="flex justify-between py-3 border-b border-[#E8ECEF]">
//             <span>Subtotal</span>
//             <span className="font-semibold">৳{subtotal}</span>
//           </div>
//           <div className="flex justify-between py-3 text-lg font-medium">
//             <span>Total</span>
//             <span>৳{subtotal}</span>
//           </div>
//         </div>

//         {/* Actions */}
//         <div className="mt-4 flex flex-col items-center">
//           <div className="w-full py-3 mb-4 rounded-md bg-[#141718] text-white text-lg font-medium text-center">
//             Checkout
//           </div>
//           <div className="text-sm font-semibold text-[#121212] border-b border-[#121212] cursor-pointer">
//             View Cart
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }



