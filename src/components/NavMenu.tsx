import { CircleUser, Search, Menu } from "lucide-react";
import Logo from "../../public/images/Logo.png"
import Image from "next/image"
import Link from "next/link";
export default function NavMenu() {
    return (
        <div>
            <div className="container bg-white mx-auto py-[18px] flex justify-between px-8 lg:px-0 ">
                <div className="flex items-center gap-1">
                    <Menu className="block lg:hidden md:hidden cursor-pointer" size={18} color="#141718" strokeWidth={2} />
                    <Image
                        src={Logo}
                        alt="logo"
                        className="w-[105px] h-[24px] object-contain"
                    />
                </div>
                <ul className="hidden items-center justify-center gap-10 font-space-grotesk text-[14px] font-medium md:flex">
                    <Link href="#"><li>Home</li></Link>
                    <Link href="#"><li>Shop</li></Link>
                    <Link href="#"><li>Product</li></Link>
                    <Link href="#"><li>Contact Us</li></Link>
                </ul>

                <div className="flex items-center gap-4">
                    <Search className="hidden lg:block md:block cursor-pointer" size={26} color="#141718" strokeWidth={1.5} />
                    <CircleUser className="hidden lg:block md:block cursor-pointer" size={24} color="#141718" strokeWidth={1.5} />
                   <div className="flex items-center gap-1">
                     <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M9 6L9 7C9 8.65685 10.3431 10 12 10C13.6569 10 15 8.65685 15 7V6" stroke="#141718" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M15.6113 3H8.38836C6.433 3 4.76424 4.41365 4.44278 6.3424L2.77612 16.3424C2.36976 18.7805 4.24994 21 6.72169 21H17.278C19.7498 21 21.6299 18.7805 21.2236 16.3424L19.5569 6.3424C19.2355 4.41365 17.5667 3 15.6113 3Z" stroke="#141718" strokeWidth="1.5" strokeLinejoin="round" />
                    </svg>
                    <span className="font-inter text-[#fff] font-bold text-[12px] w-5 h-5 bg-[#141718] rounded-[50%] flex items-center justify-center">3</span>
                   </div>
                </div>
            </div>
        </div>
    );
}

