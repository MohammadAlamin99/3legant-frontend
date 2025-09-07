"use client";
import Link from "next/link";
import Image from "next/image";
import logo from "../../public/images/phone-logo.png";
import { Heart, Search, X } from "lucide-react";

interface MobileMenuProps {
  mobileMenu: boolean;
  onClose?: () => void;
}

export default function MobileMenu({ mobileMenu, onClose }: MobileMenuProps) {
  return (
    <>
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden md:hidden transition-opacity duration-300 ${
          mobileMenu ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={onClose}
      ></div>
      <div
        className={`bg-white w-[80%] p-6 h-[100vh] flex-col justify-between lg:hidden md:hidden flex fixed top-0 z-50  transition-transform duration-300 ease-in-out transform
            ${mobileMenu ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div>
          <div className="flex justify-between items-center">
            <Link href="/">
              <Image
                src={logo}
                alt="logo"
                className="w-[105px] h-[24px] object-contain"
              />
            </Link>
            <button className="cursor-pointer">
              <X
                onClick={onClose}
                color="#6C7275"
                width={24}
                height={24}
                strokeWidth={2}
              />
            </button>
          </div>
          <div className="flex items-center gap-2 py-3 px-4 border-[#6C7275] border rounded-[6px] mt-4 mb-4">
            <Search />
            <input
              className="w-full text-[#6C7275] placeholder:text-[#6C7275]  outline-0 font-inter text-[14px] font-normal"
              type="text"
              placeholder="Search"
            />
          </div>
          <ul className="font-inter text-[14px] font-medium">
            <li className="mb-4 border-b-[1px] border-[#E8ECEF] pb-4">
              <Link href="#">Home</Link>
            </li>
            <li className="mb-4 border-b-[1px] border-[#E8ECEF] pb-4">
              <Link href="#">Home</Link>
            </li>
            <li className="mb-4 border-b-[1px] border-[#E8ECEF] pb-4">
              <Link href="#">Home</Link>
            </li>
            <li className="mb-4 border-b-[1px] border-[#E8ECEF] pb-4">
              <Link href="#">Home</Link>
            </li>
            <li className="mb-4 border-b-[1px] border-[#E8ECEF] pb-4">
              <Link href="#">Home</Link>
            </li>
          </ul>
        </div>
        <div>
          <div className="flex justify-between items-center text-[#6C7275] font-inter text-[14px] font-medium mb-4 pb-4 border-b-[1px] border-[#E8ECEF]">
            <Link href="#">Cart</Link>
            <div className="flex items-center gap-1.5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M9 6L9 7C9 8.65685 10.3431 10 12 10C13.6569 10 15 8.65685 15 7V6"
                  stroke="#141718"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M15.6113 3H8.38836C6.433 3 4.76424 4.41365 4.44278 6.3424L2.77612 16.3424C2.36976 18.7805 4.24994 21 6.72169 21H17.278C19.7498 21 21.6299 18.7805 21.2236 16.3424L19.5569 6.3424C19.2355 4.41365 17.5667 3 15.6113 3Z"
                  stroke="#141718"
                  strokeWidth="1.5"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="font-inter text-[#fff] font-bold text-[12px] w-5 h-5 bg-[#141718] rounded-[50%] flex items-center justify-center">
                3
              </span>
            </div>
          </div>
          <div className="flex justify-between items-center text-[#6C7275] font-inter text-[14px] font-medium border-b-[1px] border-[#E8ECEF] pb-4">
            <Link href="#">Wishlist</Link>
            <div className="flex items-center gap-1.5">
              <Heart strokeWidth={1.5} color="#141718" width={24} height={24} />
              <span className="font-inter text-[#fff] font-bold text-[12px] w-5 h-5 bg-[#141718] rounded-[50%] flex items-center justify-center">
                3
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
