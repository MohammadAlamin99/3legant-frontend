import React from "react";
import logo from "../../public/images/Logo.png";
import Image from "next/image";
import Link from "next/link";
import { MoveRight } from "lucide-react";
import InstaSvg from "./svg/InstaSvg";
import FBSvg from "./svg/FBSvg";
import YTSvg from "./svg/YTSvg";

export default function Footer() {
  return (
    <footer className="bg-[#E8ECEF] lg:pt-20 pt-10 pb-8">
      <div className="container mx-auto xl:px-3 lg:px-3 md:px-3 sm:px-3 px-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 md:grid-cols-2 gap-10 mb-14">
          <div className="brand">
            <Link href="#">
              <Image src={logo} alt="3legant Logo" className="mb-10" />
            </Link>
            <p className="text-[#141718] max-w-[161px] text-start mb-8 text-base md:text-[16px]">
              43111 Hai Trieu street, District 1, HCMC Vietnam
            </p>
            <div className="flex gap-6">
              <Link href="#" aria-label="Instagram">
                <InstaSvg />
              </Link>
              <Link href="#" aria-label="Facebook">
                <FBSvg />
              </Link>
              <Link href="#" aria-label="YouTube">
                <YTSvg />
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-[#141718] font-medium text-lg">Page</h3>
            <ul className="mt-10 md:mt-10 space-y-6">
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
            <ul className="mt-10 md:mt-10 space-y-6">
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
            <h3 className="text-[#141718] font-medium text-lg">Join Newsletter</h3>
            <p className="text-[#141718] text-[14px] font-normal mb-6 mt-10 font-inter">Subscribe our newsletter to get more deals, new products and promotions</p>
            <div className="relative">
              <input type="email" placeholder="Enter your email" className=":placeholder:text-[#6C7275] text-[14px] font-poppins font-normal border-2 border-[#6C7275] rounded-[90px] px-6 py-4 w-full" />
              <button  aria-label="subscribe" className="cursor-pointer bg-[#377DFF] p-2 rounded-full absolute right-[8px] top-2/4 transform -translate-y-2/4"><MoveRight color="#fff" strokeWidth={2} /></button>
            </div>
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-between items-center border-t border-[#6C7275] pt-8 gap-6">
          <div className="flex flex-col md:flex-row gap-4 md:gap-6 text-center md:text-left">
            <span className="text-[#141718] font-poppins text-xs leading-5 md:border-r md:border-[#6C7275] md:pr-4">
              Copyright © 2023 3legant. All rights reserved
            </span>
            <Link href="#" className="text-[#141718] font-inter text-xs leading-5">
              Privacy Policy
            </Link>
            <Link href="#" className="text-[#141718] font-inter text-xs leading-5">
              Terms & Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
