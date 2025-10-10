// import React from "react";
// import { Variant } from "../CartDrawer";

// export default function ContactInfo({
//   handleCheckout,
//   allVariants,
//   handleOrder,
// }: {
//   handleCheckout: (showLogin?: boolean) => void;
//   allVariants: Variant[];
//   handleOrder: () => void;
// }) {
//   const handlePlaceOrderClick = () => {
//     const token = localStorage.getItem("token");
//     if (!token) {
//       handleCheckout(true);
//     } else {
//       handleOrder();
//     }
//   };
//   return (
//     <>
//       <div className="md:w-7/12 space-y-6">
//         {/* Contact Info */}
//         <div className="bg-white border border-[#6C7275] rounded-lg p-6">
//           <h3 className="text-[16px] md:text-[14px] font-medium mb-4 font-poppins">
//             Contact Information
//           </h3>
//           <div className="space-y-4">
//             <span className="font-bold text-sm text-[#6C7275] mb-3 block font-inter uppercase">
//               Name *
//             </span>
//             <input
//               type="text"
//               placeholder="Full Name"
//               className="w-full border border-[#6C7275] rounded-md p-2 text-[#6C7275]"
//             />
//             <span className="font-bold text-sm text-[#6C7275] mb-3 block font-inter uppercase">
//               Phone number *
//             </span>
//             <input
//               type="tel"
//               placeholder="Phone Number"
//               className="w-full border border-[#6C7275] rounded-md p-2 text-[#6C7275]"
//             />
//             <span className="font-bold text-sm text-[#6C7275] mb-3 block font-inter uppercase">
//               email address *
//             </span>
//             <input
//               type="email"
//               placeholder="Email Address"
//               className="w-full border border-[#6C7275] rounded-md p-2 text-[#6C7275]"
//             />
//           </div>
//         </div>

//         {/* Shipping Address */}
//         <div className="bg-white border border-[#6C7275] rounded-lg p-6">
//           <h3 className="text-[16px] md:text-[14px] font-medium mb-4 font-poppins text-[#141718]">
//             Shipping Address
//           </h3>
//           <span className="font-bold text-sm text-[#6C7275] mb-3 block font-inter uppercase">
//             Full Address *
//           </span>
//           <input
//             type="text"
//             placeholder="Full Address"
//             className="w-full border border-[#6C7275] rounded-md p-2 text-[#6C7275]"
//           />
//         </div>

//         {/* Place Order (Desktop) */}
//         {allVariants.length > 0 && (
//           <div className="hidden md:block">
//             <button
//               onClick={handlePlaceOrderClick}
//               className="w-full bg-[#141718] text-white rounded-lg py-3 font-medium font-inter cursor-pointer"
//             >
//               Place Order
//             </button>
//           </div>
//         )}
//       </div>
//     </>
//   );
// }


"use client";
import React, { useRef } from "react";
import { Variant } from "../CartDrawer";

export default function ContactInfo({
  handleCheckout,
  allVariants,
  handleOrder,
}: {
  handleCheckout: (showLogin?: boolean) => void;
  allVariants: Variant[];
  handleOrder: (formData: {
    name: string;
    phone: string;
    email: string;
    address: string;
  }) => void;
}) {
  // Refs for each input field
  const nameRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const addressRef = useRef<HTMLInputElement>(null);

  // Validation helper
  const validate = () => {
    const name = nameRef.current?.value.trim() || "";
    const phone = phoneRef.current?.value.trim() || "";
    const email = emailRef.current?.value.trim() || "";
    const address = addressRef.current?.value.trim() || "";

    if (!name || !phone || !email || !address) {
      alert("Please fill in all required fields!");
      return false;
    }
    return { name, phone, email, address };
  };

  // Place Order
  const handlePlaceOrderClick = () => {
    const token = localStorage.getItem("token");

    if (!token) {
      handleCheckout(true); // show signup modal
    } else {
      const form = validate();
      if (!form) return; // stop if invalid
      handleOrder(form);
    }
  };

  return (
    <div className="md:w-7/12 space-y-6">
      {/* Contact Info */}
      <div className="bg-white border border-[#6C7275] rounded-lg p-6">
        <h3 className="text-[16px] md:text-[14px] font-medium mb-4 font-poppins">
          Contact Information
        </h3>

        <div className="space-y-4">
          {/* Name */}
          <div>
            <label className="font-bold text-sm text-[#6C7275] mb-2 block font-inter uppercase">
              Name *
            </label>
            <input
              type="text"
              ref={nameRef}
              placeholder="Full Name"
              className="w-full border border-[#6C7275] rounded-md p-2 text-[#6C7275]"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="font-bold text-sm text-[#6C7275] mb-2 block font-inter uppercase">
              Phone Number *
            </label>
            <input
              type="tel"
              ref={phoneRef}
              placeholder="Phone Number"
              className="w-full border border-[#6C7275] rounded-md p-2 text-[#6C7275]"
            />
          </div>

          {/* Email */}
          <div>
            <label className="font-bold text-sm text-[#6C7275] mb-2 block font-inter uppercase">
              Email Address *
            </label>
            <input
              type="email"
              ref={emailRef}
              placeholder="Email Address"
              className="w-full border border-[#6C7275] rounded-md p-2 text-[#6C7275]"
            />
          </div>
        </div>
      </div>

      {/* Shipping Address */}
      <div className="bg-white border border-[#6C7275] rounded-lg p-6">
        <h3 className="text-[16px] md:text-[14px] font-medium mb-4 font-poppins text-[#141718]">
          Shipping Address
        </h3>

        <div>
          <label className="font-bold text-sm text-[#6C7275] mb-2 block font-inter uppercase">
            Full Address *
          </label>
          <input
            type="text"
            ref={addressRef}
            placeholder="Full Address"
            className="w-full border border-[#6C7275] rounded-md p-2 text-[#6C7275]"
          />
        </div>
      </div>

      {/* Place Order Button (Desktop) */}
      {allVariants.length > 0 && (
        <div className="hidden md:block">
          <button
            onClick={handlePlaceOrderClick}
            className="w-full bg-[#141718] text-white rounded-lg py-3 font-medium font-inter cursor-pointer"
          >
            Place Order
          </button>
        </div>
      )}
    </div>
  );
}
