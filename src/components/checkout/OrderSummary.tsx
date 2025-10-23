import React from "react";
import Image from "next/image";

import { Minus, Plus, ShoppingCart } from "lucide-react";
import { Variant } from "../CartDrawer";

export default function OrderSummary({
  allVariants,
  cartMap,
  subtotal,
  shippingCost,
  total,
  handleQuantityChange,
  handleOrder,
  handleCheckout,
}: {
  allVariants: Variant[];
  cartMap: Map<string, number>;
  subtotal: number;
  shippingCost: number;
  total: number;
  handleQuantityChange: (variantId: string, quantity: number) => void;
  // handlePlaceOrder: () => void;
  handleOrder: () => void;
  handleCheckout: (showLogin?: boolean) => void;
}) {
    const getToken = () => {
    const match = document.cookie.match(new RegExp('(^| )token=([^;]+)'));
    return match ? match[2] : null;
  };
  const handlePlaceOrderClick = () => {
    const token = getToken();
    if (!token) {
      handleCheckout(true);
    } else {
      handleOrder();
    }
  };
  return (
    <>
      <div className="md:w-5/12 space-y-6">
        <div className="bg-white border border-[#6C7275] rounded-lg p-6">
          <h3 className="md:text-[28px] text-[20px] font-medium md:mb-6 mb-4 font-poppins">
            Order summary
          </h3>

          {allVariants.length > 0 ? (
            <div className="space-y-6">
              {allVariants.map((item, i) => {
                const qty = cartMap.get(item._id) || 1;
                return (
                  <div
                    key={i}
                    className="grid md:grid-cols-[80px_1fr_auto] grid-cols-[80px_2fr_1fr] gap-4 border-b border-gray-200 pb-6 pt-6"
                  >
                    <div className="w-20 h-24 bg-gray-100 flex items-center justify-center">
                      <Image
                        src={item?.image || "/images/sample-product.jpg"}
                        alt={item?.parentTitle || "Product"}
                        width={80}
                        height={96}
                        className="object-contain"
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <h4 className="text-sm font-semibold text-[#141718] font-inter">
                        {item.parentTitle}
                      </h4>
                      <p className="text-xs text-[#6C7275] font-inter">
                        Color: {item.options?.color || "-"}
                      </p>
                      <p className="text-xs text-[#6C7275] font-inter">
                        Size: {item.options?.size || "-"}
                      </p>
                      <div className="flex items-center border border-gray-300 rounded-md p-2 w-fit gap-2">
                        <button
                          className="p-1 cursor-pointer"
                          onClick={() =>
                            handleQuantityChange(item._id, qty - 1)
                          }
                        >
                          <Minus size={16} />
                        </button>
                        <span className="text-[12px] font-inter font-semibold">
                          {qty}
                        </span>
                        <button
                          className="p-1 cursor-pointer"
                          onClick={() =>
                            handleQuantityChange(item._id, qty + 1)
                          }
                        >
                          <Plus size={16} />
                        </button>
                      </div>
                    </div>
                    <div className="text-[#121212] font-semibold font-inter text-[14px] md:text-[16px]">
                      TK. {(item.price * qty).toFixed(2)}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="flex flex-col items-center gap-1 justify-center text-center text-[#6C7275] my-auto py-10 md:py-20">
              <ShoppingCart width={40} height={40} />
              <p className="font-inter text-lg font-medium">
                Your cart is empty
              </p>
              <p className="font-inter text-sm text-[#9CA3AF]">
                Add some items to get started!
              </p>
            </div>
          )}

          {/* Summary Totals */}
          {allVariants.length > 0 && (
            <div className="mt-6 space-y-2">
              <div className="flex justify-between text-[#141718] font-inter text-sm">
                <span>Subtotal</span>
                <span>TK. {subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-[#141718] font-inter text-sm">
                <span>Delivary Charge</span>
                <span>TK. {shippingCost.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-semibold text-[#141718] font-inter text-base pt-2">
                <span>Total</span>
                <span>TK. {total.toFixed(2)}</span>
              </div>
            </div>
          )}
        </div>

        {/* Place Order (Mobile) */}
        {allVariants.length > 0 && (
          <div className="block md:hidden">
            <button
              onClick={handlePlaceOrderClick}
              className="w-full bg-[#141718] text-white rounded-lg py-3 font-medium"
            >
              Place Order
            </button>
          </div>
        )}
      </div>
    </>
  );
}
