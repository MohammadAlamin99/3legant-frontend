"use client";
import { TicketPercent, X } from "lucide-react";
import { useEffect, useState } from "react";
import CommonButton from "./button/CommonButton";

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
        <CommonButton />
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
