import React from "react";
import Image from "next/image";
import CommonButton2 from "../button/CommonButton2";

export default function ContactAbout() {
  return (
    <>
      <section className="container mx-auto flex flex-col md:flex-row">
        <div className="flex-1">
          <Image
            src="/images/contact-image.webp"
            alt="Cozy living room"
            className="w-full h-full object-cover"
            width={500}
            height={500}
          />
        </div>
        <div className="flex-1 bg-gray-100 p-6 md:py-24 md:px-12 flex flex-col justify-center">
          <h2 className="text-2xl md:text-4xl font-medium text-[#121212] mb-4 font-poppins">
            About Us
          </h2>
          <p className="text-[#141718] font-normal text-base md:text-lg mb-6 max-w-md font-inter">
            3legant is a gift & decorations store based in HCMC, Vietnam. Est
            since 2019. Our customer service is always prepared to support you
            24/7.
          </p>
          <CommonButton2
            buttonText="Shop Now"
            url="/shop"
            color="#141718"
            bgColor="#141718"
          />
        </div>
      </section>
    </>
  );
}
