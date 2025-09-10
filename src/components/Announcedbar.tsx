'use client';
import { ArrowRight, TicketPercent, X } from "lucide-react";
import { useEffect, useState } from "react";

export default function Announcedbar() {
    const [isOpen, setIsOpen] = useState<boolean | null>(null);

    useEffect(() => {
        const storedValue = localStorage.getItem("announcedbar");
        setIsOpen(storedValue !== "closed");
    }, []);

    const handleClose = () => {
        setIsOpen(false);
        localStorage.setItem("announcedbar", "closed");
    };

    if (isOpen === null) return null;
    if (!isOpen) return null;

    return (
        <div className="flex items-center bg-[#2F6CDB]">
            <div className="w-full flex items-center justify-center gap-3 py-2.5">
                <TicketPercent color="#FFFFFF" strokeWidth={2} />
                <h4 className="text-white text-[14px] lg:text-[16px] font-semibold font-inter tex-center">
                    30% off storewide — Limited time!
                </h4>
                <div className="relative overflow-hidden">
                    <button
                        className="group items-center justify-center hidden lg:flex cursor-pointer gap-1 
                        text-white text-[14px] font-semibold 
                        before:content-[''] before:absolute before:left-0 before:bottom-0 before:h-[1px] 
                        before:w-0 before:bg-white before:transition-all before:duration-300 
                        hover:before:w-full"
                        aria-label="Shop Now"
                    >
                        Shop Now
                        <ArrowRight
                            className="transition-transform duration-300 group-hover:-rotate-45"
                            color="#FFFFFF"
                            width={18}
                            height={18}
                            strokeWidth={2}
                        />
                    </button>
                </div>
            </div>
            <button
                className="cursor-pointer mr-4"
                onClick={handleClose}
                aria-label="Close announcement bar"
            >
                <X color="#FFFFFF" width={20} height={20} strokeWidth={1} />
            </button>
        </div>
    );
}
