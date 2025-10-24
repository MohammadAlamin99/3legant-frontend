
import PaymentForm from '@/components/payment/PaymentForm';
import React from 'react'
interface PageProps {
  params: { id: string };
}
export default async function Page({params}:PageProps) {
   const { id } = await params;
    return (
        <>
            <PaymentForm orderId={id as string} />
        </>
    )
}
