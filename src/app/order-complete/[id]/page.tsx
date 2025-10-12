import Announcedbar from '@/components/Announcedbar';
import Footer from '@/components/Footer';
import NavMenu from '@/components/NavMenu';
import OrderComplete from '@/components/order-complete/OrderComplete';
import React from 'react';

export default function Page({params}:{params:{id:string}}){
    const id = params.id;
    return (
        <>
         <Announcedbar/>
         <NavMenu/>
         <OrderComplete id={id}/>
         <Footer/>   
        </>
    );
}


