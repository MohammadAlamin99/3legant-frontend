import Link from "next/link";
import Image from "next/image"
import logo from "../../public/images/phone-logo.png"
import { Search, X } from "lucide-react";

export default function MobileMenu() {
    return (
        <div>
            <section className="bg-white p-6">
                <div className="flex justify-between items-center">
                    <Link href="/">
                        <Image
                            src={logo}
                            alt="logo"
                            className="w-[105px] h-[24px] object-contain" />
                    </Link>
                    <button className="cursor-pointer mr-4">
                        <X color="#6C7275" width={24} height={24} strokeWidth={2} />
                    </button>
                </div>
                <div className="flex items-center gap-2 py-3 px-4 border-[#6C7275] border rounded-[6px] mt-4 mb-4">
                    <Search />
                    <input className="w-full text-[#6C7275] placeholder:text-[#6C7275]  outline-0 font-inter text-[14px] font-normal" type="text" placeholder="Search" />
                </div>
                <ul className="font-inter text-[14px] font-medium">
                    <li className="mb-4 border-b-[1px] border-[#E8ECEF] pb-4"><Link href="#">Home</Link></li>
                    <li className="mb-4 border-b-[1px] border-[#E8ECEF] pb-4"><Link href="#">Home</Link></li>
                    <li className="mb-4 border-b-[1px] border-[#E8ECEF] pb-4"><Link href="#">Home</Link></li>
                    <li className="mb-4 border-b-[1px] border-[#E8ECEF] pb-4"><Link href="#">Home</Link></li>
                    <li className="mb-4 border-b-[1px] border-[#E8ECEF] pb-4"><Link href="#">Home</Link></li>
                </ul>
            </section>
        </div>
    );
}

