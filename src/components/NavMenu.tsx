"use client";
import { CircleUser, Search, Menu, X } from "lucide-react";
import Logo from "../../public/images/Logo.png";
import Image from "next/image";
import Link from "next/link";
import MobileMenu from "./MobileMenu";
import { useEffect, useState } from "react";
import CartSvg from "./svg/CartSvg";
import CartDrawer, { CartItem } from "./CartDrawer";
import { usePathname, useRouter } from "next/navigation";
import { useCart } from "./context/CartContext";
import { searchProductByKeyword } from "@/actions/product.action";
import { Product } from "@/types/product.type";

export default function NavMenu() {
  const [mobileMenu, setMobileMenu] = useState(false);
  const [stickyMenu, setStickyMenu] = useState(false);
  const [cartItemsCount, setCartItemsCount] = useState(0);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [predictions, setPredictions] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);

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
      cartData?.reduce((acc: number, item: CartItem) => acc + item.quantity, 0) || 0;
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
  return (
    <>
      {/* Mobile & Cart Drawer */}
      <MobileMenu mobileMenu={mobileMenu} onClose={() => setMobileMenu(false)} />
      <CartDrawer cartOpen={cartOpen} onClose={() => setCartOpen(false)} />

      {/* Search Popup Modal */}
      <div
        className={`fixed inset-0 z-50 transition-all duration-300 ${searchOpen ? "opacity-100 visible" : "opacity-0 invisible"
          }`}
      >
        {/* Backdrop */}
        <div
          onClick={() => setSearchOpen(false)}
          className={`absolute inset-0 bg-black transition-opacity duration-300 ${searchOpen ? "opacity-60" : "opacity-0"
            }`}
        />

        {/* Search Content */}
        <div
          className={`absolute top-0 left-0 right-0 bg-white shadow-2xl transition-all duration-500 ease-out ${searchOpen ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
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
              <div className="relative">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search products..."
                  autoFocus
                  className="w-full px-6 py-5 text-md font-inter 
                  border-b-2 border-gray-300 focus:border-[#141718] 
                  outline-none transition-colors duration-200 placeholder:text-[#121212]"
                />
                <Search
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
                  size={28}
                  strokeWidth={1.5}
                />

                {/* 🔍 Prediction Dropdown */}
                {searchTerm && (
                  <div className="absolute left-0 right-0 mt-2 bg-white border border-gray-200 shadow-lg rounded-lg z-20 max-h-72 overflow-y-auto">
                    {isLoading && (
                      <div className="px-6 py-3 text-gray-500 text-sm">Searching...</div>
                    )}

                    {!isLoading && predictions.length === 0 && (
                      <div className="px-6 py-3 text-gray-400 text-sm">
                        No results found
                      </div>
                    )}

                    {!isLoading &&
                      predictions.map((item) => (
                        <div key={item?._id}>
                          <button
                            key={item._id}
                            onClick={() => {
                              router.push(`/product/${item._id}`);
                              setSearchOpen(false);
                              setSearchTerm("");
                              setPredictions([]);
                            }}
                            className="w-full text-left px-6 py-3 hover:bg-gray-100 transition-colors duration-150 flex items-center gap-3 cursor-pointer"
                          >
                            {item?.featureImage && (
                              <Image
                                src={item.featureImage}
                                alt={item.title}
                                width={40}
                                height={40}
                                className="w-10 h-10 object-cover border"
                              />
                            )}
                            <div>
                              <span className="text-gray-800 font-medium">{item.title}</span>
                            </div>
                          </button>
                        </div>
                      ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navbar */}
      <div
        className={`bg-white ${stickyMenu ? "fixed top-0 left-0 right-0 z-20 w-full" : "static"
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
          <ul className="hidden items-center justify-center gap-10 font-space-grotesk text-[14px] font-medium md:flex">
            {[
              { label: "Home", href: "/" },
              { label: "Shop", href: "/shop" },
              { label: "Product", href: "/product" },
              { label: "Contact Us", href: "/contact-us" },
            ].map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={pathname === link.href ? "text-[#141718]" : "text-[#6C7275]"}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-4">
            <Search
              onClick={() => setSearchOpen(true)}
              className="hidden lg:block md:block cursor-pointer hover:opacity-70 transition-opacity"
              size={26}
              color="#141718"
              strokeWidth={1.5}
            />
            <Link href="/profile">
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
    </>
  );
}
