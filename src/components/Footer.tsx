import React from "react";
import logo from "../../public/images/Logo.png";
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#E8ECEF] pt-20 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-14">
          <div className="brand">
            <a href="#">
              <Image src={logo} alt="3legant Logo" className="mb-8" />
            </a>
            <p className="text-[#141718] max-w-xs text-start mb-8 text-base md:text-[16px]">
              More than just a game, It's a lifestyle.
            </p>
            <div className="flex gap-6">
              <a href="#" aria-label="Instagram">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <rect
                    x="2"
                    y="2"
                    width="20"
                    height="20"
                    rx="4"
                    stroke="#141718"
                    strokeWidth="1.5"
                  />
                  <circle cx="18" cy="6" r="1" fill="#141718" />
                  <circle
                    cx="12"
                    cy="12"
                    r="5"
                    stroke="#141718"
                    strokeWidth="1.5"
                  />
                </svg>
              </a>
              <a href="#" aria-label="Facebook">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M18 3H15C12.2386 3 10 5.23858 10 8V10H6V14H10V21H14V14H18V10H14V8C14 7.44772 14.4477 7 15 7H18V3Z"
                    stroke="#141718"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>
              <a href="#" aria-label="YouTube">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <rect
                    x="2"
                    y="3"
                    width="20"
                    height="18"
                    rx="4"
                    stroke="#141718"
                    strokeWidth="1.5"
                  />
                  <path
                    d="M10.4472 8.72361L15.2111 11.1056C15.9482 11.4741 15.9482 12.5259 15.2111 12.8944L10.4472 15.2764C9.78231 15.6088 9 15.1253 9 14.382V9.61803C9 8.87465 9.78231 8.39116 10.4472 8.72361Z"
                    stroke="#141718"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-[#141718] font-medium text-lg">Page</h3>
            <ul className="mt-10 md:mt-6 space-y-6">
              <li>
                <Link href="#">Home</Link>
              </li>
              <li>
                <Link href="#">Shop</Link>
              </li>
              <li>
                <Link href="#">Product</Link>
              </li>
              <li>
                <Link href="#">Articles</Link>
              </li>
              <li>
                <Link href="#">Contact Us</Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-[#141718] font-medium text-lg">Info</h3>
            <ul className="mt-10 md:mt-6 space-y-6">
              <li>
                <Link href="#">Shipping Policy</Link>
              </li>
              <li>
                <Link href="#">Return & Refund</Link>
              </li>
              <li>
                <Link href="#">Return & Refund</Link>
              </li>
              <li>
                <Link href="#">Support</Link>
              </li>
              <li>
                <Link href="#">FAQs</Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-[#141718] font-medium text-lg">Office</h3>
            <ul className="mt-10 md:mt-6 space-y-2 text-[#141718] text-sm">
              <li>43111 Hai Trieu street,</li>
              <li>District 1, HCMC</li>
              <li>Vietnam</li>
              <li>
                <Link
                  href="tel:84-756-3237"
                  className="text-[#141718] hover:text-gray-400"
                >
                  84-756-3237
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-between items-center border-t border-[#6C7275] pt-8 gap-6">
          <div className="flex flex-col md:flex-row gap-4 md:gap-6 text-center md:text-left">
            <span className="text-[#141718] text-xs leading-5 md:border-r md:border-[#6C7275] md:pr-4">
              Copyright © 2023 3legant. All rights reserved
            </span>
            <Link href="#" className="text-[#6C7275] text-xs leading-5">
              Privacy Policy
            </Link>
            <Link href="#" className="text-[#6C7275] text-xs leading-5">
              Terms & Conditions
            </Link>
          </div>

          <div className="flex gap-2 flex-wrap justify-center md:justify-start">
            <img
              src="https://cdn.shopify.com/s/files/1/0639/7352/3521/files/payment-02.png?v=1746113973"
              alt="Visa"
              className="h-6 md:h-8"
            />
            <img
              src="https://cdn.shopify.com/s/files/1/0639/7352/3521/files/payment-03.png?v=1746113972"
              alt="Mastercard"
              className="h-6 md:h-8"
            />
            <img
              src="https://cdn.shopify.com/s/files/1/0639/7352/3521/files/payment-05.png?v=1746113973"
              alt="PayPal"
              className="h-6 md:h-8"
            />
            <img
              src="https://cdn.shopify.com/s/files/1/0639/7352/3521/files/pyment-01.png?v=1746113973"
              alt="Amex"
              className="h-6 md:h-8"
            />
          </div>
        </div>
      </div>
    </footer>
  );
}
