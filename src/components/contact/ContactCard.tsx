"use client";
import { Mail, Phone, Store } from "lucide-react";
import React from "react";

export default function ContactCard() {
  const contactInfo = [
    {
      id: 1,
      icon: <Store className="mx-auto w-8 h-8 text-gray-800" />,
      title: "Address",
      detail: "234 Hai Trieu, Ho Chi Minh City, Viet Nam",
    },
    {
      id: 2,
      icon: <Phone className="mx-auto w-8 h-8 text-gray-800" />,
      title: "Contact Us",
      detail: "+84 234 567 890",
    },
    {
      id: 3,
      icon: <Mail className="mx-auto w-8 h-8 text-gray-800" />,
      title: "Email",
      detail: "hello@3legant.com",
    },
  ];

  return (
    <div className="flex flex-col md:flex-row gap-6 mb-10">
      {contactInfo.map((item) => (
        <div
          key={item.id}
          className="flex-1 bg-gray-100 text-center p-6 rounded-md"
        >
          {item.icon}
          <h3 className="text-[#6C7275] uppercase text-sm font-bold mt-4 mb-2 font-inter">
            {item.title}
          </h3>
          <p className="text-[#141718] font-semibold font-inter max-w-[293px] mx-auto">
            {item.detail}
          </p>
        </div>
      ))}
    </div>
  );
}
