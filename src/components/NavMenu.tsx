"use client";
import { CircleUser, Search, Menu } from "lucide-react";
import Logo from "../../public/images/Logo.png";
import Image from "next/image";
import Link from "next/link";
import MobileMenu from "./MobileMenu";
import { useEffect, useState } from "react";
import CartSvg from "./svg/CartSvg";
import CartDrawer from "./CartDrawer";
export default function NavMenu() {
  const [mobileMenu, setMobileMenu] = useState<boolean>(false);
  const [cartOpen, setCartOpen] = useState<boolean>(false);
  const [stickyMenu, setStickyMenu] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setStickyMenu(true)
      }
      else {
        setStickyMenu(false);
      }
    }
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    }
  }, [])

  // cart drawer
  const onCartOpenHandler = () => {
    setCartOpen(true);
  }
  const onCartCloseHandler = () => {
    setCartOpen(false);
  }

  const onClickHandler = () => {
    setMobileMenu(true);
  };
  const onCloseHandler = () => {
    setMobileMenu(false);
  };
  return (
    <>
      <MobileMenu mobileMenu={mobileMenu} onClose={onCloseHandler} />
      <CartDrawer cartOpen={cartOpen} onClose={onCartCloseHandler} />
      <div className={`bg-white ${stickyMenu ? "fixed top-0 left-0 right-0 z-20 w-full" : "static"}`}>
        <div className="container bg-white mx-auto py-[18px] flex justify-between xl:px-3 lg:px-3 md:px-3 sm:px-3 px-8">
          <div className="flex items-center gap-1">
            <Menu
              onClick={onClickHandler}
              className="block lg:hidden md:hidden cursor-pointer"
              size={18}
              color="#141718"
              strokeWidth={2}
            />
            <Link href="/">
              <Image
                src={Logo}
                width={105}
                height={24}
                alt="logo"
                className="w-[105px] h-[24px] object-contain"
              />
            </Link>
          </div>
          <ul className="hidden items-center justify-center gap-10 font-space-grotesk text-[14px] font-medium md:flex">
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
              <Link href="#">Contact Us</Link>
            </li>
          </ul>

          <div className="flex items-center gap-4">
            <Search
              className="hidden lg:block md:block cursor-pointer"
              size={26}
              color="#141718"
              strokeWidth={1.5}
            />
            <CircleUser
              className="hidden lg:block md:block cursor-pointer"
              size={24}
              color="#141718"
              strokeWidth={1.5}
            />
            <div className="flex items-center gap-1">
              <button onClick={onCartOpenHandler} className="cursor-pointer" aria-label="cart">
                <CartSvg />
              </button>
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
