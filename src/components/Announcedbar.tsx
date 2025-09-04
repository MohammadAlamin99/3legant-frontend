'use client';
import { ArrowRight, TicketPercent, X } from "lucide-react";
import { useEffect, useState } from "react";
export default function Announcedbar() {
    const [isOpen, setIsOpen] = useState<boolean | null>(null);
    useEffect(() => {
        const storedValue = localStorage.getItem('announcedbar');
        setIsOpen(storedValue !== 'closed')
    }, [])

    const handleClose = () => {
        setIsOpen(false);
        localStorage.setItem('announcedbar', 'closed')
    }

    if (isOpen === null) return null;
    if (!isOpen) return null;

    return (
        <div className="flex items-center bg-[#377DFF]">
            <div className="w-full flex items-center justify-center gap-3 py-2.5">
                <TicketPercent color="#ffffff" strokeWidth={2} />
                <h4 className="text-[#FEFEFE] text-[12px] lg:text-[14px] font-semibold font-inter">30% off storewide — Limited time! </h4>
                <div className="relative overflow-hidden">
                    <button className="group items-center justify-center hidden lg:flex 
                    cursor-pointer gap-1 text-[#FEFEFE] text-[14px] font-semibold before:content-[''] 
                    before:absolute before:left-0 before:bottom-0 before:h-[1px] before:w-0
                  before:bg-[#FEFEFE] before:transition-all before:duration-300 hover:before:w-full">Shop Now
                        <ArrowRight  className="transition-transform duration-300 group-hover:-rotate-45" color="#FEFEFE" width={18} height={18} strokeWidth={2} />
                    </button>
                </div>
            </div>
            <button className="cursor-pointer mr-4" onClick={handleClose}>
                <X color="#FEFEFE" width={20} height={20} strokeWidth={1} />
            </button>
        </div>
    );
}
