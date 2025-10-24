
import { getOrder } from '@/actions/order.action';
import Announcedbar from '@/components/Announcedbar';
import Footer from '@/components/Footer';
import NavMenu from '@/components/NavMenu';
import PaymentForm from '@/components/payment/PaymentForm';
import { cookies } from 'next/headers';
import React from 'react'
interface PageProps {
    params: { id: string };
}
export default async function Page({ params }: PageProps) {
    const { id } = await params;
    const cookieStore = cookies();
    const tokenCookie = (await cookieStore).get("token")?.value || "";
    const order = await getOrder(id, tokenCookie);
    return (
        <>
            <Announcedbar />
            <NavMenu />
            <PaymentForm orderId={id as string} order={order} />
            <Footer />
        </>
    )
}
