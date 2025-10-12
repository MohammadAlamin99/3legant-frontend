import Announcedbar from '@/components/Announcedbar';
import Footer from '@/components/Footer';
import NavMenu from '@/components/NavMenu';
import OrderComplete from '@/components/order-complete/OrderComplete';
import React from 'react';

export default function Page(){
    return (
        <>
         <Announcedbar/>
         <NavMenu/>
         <OrderComplete/>
         <Footer/>   
        </>
    );
}


