import { IOrderData } from '@/types/order.type';
import React from 'react'

export default function PaymentOrderSummary({ order }: { order: IOrderData }) {
    const items = order?.order[0]?.items || [];
    const totals = order?.order[0]?.totals;
    return (
        <>
            <div className="p-6 bg-white">
                <h3 className="text-lg font-medium mb-4 font-poppins">Order Summary</h3>
                <ul>
                    {items.map((item) => (
                        <li key={item.variantId} className="flex justify-between mb-2 font-inter">
                            <span>{item.title} x {item.quantity}</span>
                            <span>{item.price * item.quantity} BDT</span>
                        </li>
                    ))}
                </ul>
                <div className="flex justify-between mb-1 font-inter">
                    <span>Subtotal:</span>
                    <span>{totals?.subtotal} BDT</span>
                </div>
                <div className="flex justify-between mb-1 font-inter">
                    <span>Shipping:</span>
                    <span>{totals?.shipping} BDT</span>
                </div>
                  <hr className="my-4" />
                <div className="flex justify-between font-medium text-lg font-inter">
                    <span>Total:</span>
                    <span>{totals?.grandTotal} BDT</span>
                </div>
            </div>
        </>
    )
}
