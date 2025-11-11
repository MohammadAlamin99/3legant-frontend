import { ChevronRight } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function ContactHeader() {
  return (
    <>
      {/* Header */}
      <header className="pt-4">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-4 text-sm font-medium">
            <Link href="/" className="text-[#605F5F] flex items-center gap-1">
              Home <ChevronRight color="#605F5F" width={16} height={16}/>
            </Link>
            <span className="text-[#121212] font-semibold font-inter">
              Contact Us
            </span>
          </div>
        </div>
      </header>
    </>
  );
}
