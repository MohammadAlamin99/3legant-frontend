"use client";
import { CircleUser, Search, Menu, X } from "lucide-react";
import Logo from "../../public/images/Logo.png";
import Image from "next/image";
import Link from "next/link";
import MobileMenu from "./MobileMenu";
import { useEffect, useState } from "react";
import CartSvg from "./svg/CartSvg";
import { usePathname, useRouter } from "next/navigation";
import { useCart } from "./context/CartContext";
import { searchProductByKeyword } from "@/actions/product.action";
import { Product } from "@/types/product.type";
import { ICartItem } from "@/types/cartItem.type";
import CartDrawer from "./CartDrawer";
import SearchBar from "./SearchBar";
import SignInModal from "./authentication/SignIn";
import SignUpModal from "./authentication/SignUp";

export default function NavMenu() {
  const [mobileMenu, setMobileMenu] = useState(false);
  const [stickyMenu, setStickyMenu] = useState(false);
  const [cartItemsCount, setCartItemsCount] = useState(0);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [predictions, setPredictions] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showSignIn, setShowSignIn] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);

  const pathname = usePathname();
  const router = useRouter();
  const { cartOpen, setCartOpen } = useCart();

  // Debounced API Fetch
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (searchTerm.trim().length > 1) {
        fetchPredictions(searchTerm);
      } else {
        setPredictions([]);
      }
    }, 400);
    return () => clearTimeout(delayDebounce);
  }, [searchTerm]);

  const fetchPredictions = async (keyword: string) => {
    try {
      setIsLoading(true);
      const data = await searchProductByKeyword(keyword, 1, 5);
      setPredictions(data?.data || []);
    } catch (error) {
      console.error("Prediction fetch error:", error);
      setPredictions([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Sticky Navbar
  useEffect(() => {
    const handleScroll = () => {
      setStickyMenu(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Cart count
  useEffect(() => {
    const cartData = JSON.parse(localStorage.getItem("cart") || "[]");
    const count =
      cartData?.reduce(
        (acc: number, item: ICartItem) => acc + item.quantity,
        0
      ) || 0;
    setCartItemsCount(count);
  }, [cartOpen]);

  // Close search on Escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSearchOpen(false);
    };
    if (searchOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [searchOpen]);

  // authentication

  const handleSwitchToSignUp = () => {
    setShowSignIn(false);
    setShowSignUp(true);
  };

  const handleSwitchToSignIn = () => {
    setShowSignUp(false);
    setShowSignIn(true);
  };

  const getToken = () => {
    const match = document.cookie.match(new RegExp("(^| )token=([^;]+)"));
    return match ? match[2] : null;
  };
  const handleProfile = () => {
    const token = getToken();
    if (!token) {
      setShowSignIn(true);
      return;
    }
  };
  const handleLoginSuccess = () => {
    setShowSignIn(false);
    router.push("/profile");
  };
  return (
    <>
      {/* Mobile & Cart Drawer */}
      <MobileMenu
        mobileMenu={mobileMenu}
        onClose={() => setMobileMenu(false)}
      />
      <CartDrawer cartOpen={cartOpen} onClose={() => setCartOpen(false)} />

      {/* Search Popup Modal */}
      <div
        className={`fixed inset-0 z-50 transition-all duration-300 ${
          searchOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        {/* Backdrop */}
        <div
          onClick={() => setSearchOpen(false)}
          className={`absolute inset-0 bg-black transition-opacity duration-300 ${
            searchOpen ? "opacity-60" : "opacity-0"
          }`}
        />

        {/* Search Content */}
        <div
          className={`absolute top-0 left-0 right-0 bg-white shadow-2xl transition-all duration-500 ease-out ${
            searchOpen
              ? "translate-y-0 opacity-100"
              : "-translate-y-full opacity-0"
          }`}
        >
          <div className="container mx-auto px-8 py-12">
            <div className="max-w-3xl mx-auto relative">
              {/* Close Button */}
              <button
                onClick={() => setSearchOpen(false)}
                className="absolute top-[50%] translate-y-[-50%] right-12 p-2 z-10 rounded-full hover:bg-gray-100 transition-colors duration-200 cursor-pointer"
                aria-label="Close search"
              >
                <X size={24} color="#141718" strokeWidth={1.5} />
              </button>

              {/* Search Input */}
              <SearchBar
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                isLoading={isLoading}
                predictions={predictions}
                setSearchOpen={setSearchOpen}
                setPredictions={setPredictions}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Navbar */}
      <div
        className={`bg-white ${
          stickyMenu ? "fixed top-0 left-0 right-0 z-20 w-full" : "static"
        }`}
      >
        <div className="container bg-white mx-auto py-[18px] flex justify-between xl:px-3 lg:px-3 md:px-3 sm:px-3 px-8">
          <div className="flex items-center gap-1">
            <Menu
              onClick={() => setMobileMenu(true)}
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
          <ul className="group hidden items-center justify-center gap-10 font-space-grotesk text-[14px] font-medium md:flex">
            {[
              { label: "Home", href: "/" },
              { label: "Shop", href: "/shop" },
              { label: "Blog", href: "/blog" },
              { label: "Contact Us", href: "/contact" },
            ].map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`${
                    pathname === link.href ? "text-[#141718]" : "text-[#6C7275]"
                  } hover:text-[#141718] transition-all duration-300`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-4">
            <Search
              onClick={() => setSearchOpen(true)}
              className="hidden lg:block md:block cursor-pointer"
              size={26}
              color="#141718"
              strokeWidth={1.5}
            />
            <Link href="/profile" onClick={handleProfile}>
              <CircleUser
                className="hidden lg:block md:block cursor-pointer"
                size={24}
                color="#141718"
                strokeWidth={1.5}
              />
            </Link>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setCartOpen(true)}
                className="cursor-pointer"
                aria-label="cart"
              >
                <CartSvg />
              </button>
              <span className="font-inter text-[#fff] font-bold text-[12px] w-5 h-5 bg-[#141718] rounded-[50%] flex items-center justify-center">
                {cartItemsCount}
              </span>
            </div>
          </div>
        </div>
      </div>
      {/* Modals */}
      {showSignIn && (
        <SignInModal
          onClose={() => setShowSignIn(false)}
          onSwitchToSignUp={handleSwitchToSignUp}
          onLoginSuccess={handleLoginSuccess}
        />
      )}

      {showSignUp && (
        <SignUpModal
          onClose={() => setShowSignUp(false)}
          onSwitchToSignIn={handleSwitchToSignIn}
        />
      )}
    </>
  );
}
