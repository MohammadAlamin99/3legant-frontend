import Link from "next/link";
import React from "react";

export default function AccountMenu({
  menuItems,
  setActiveTab,
  activeTab,
}: {
  menuItems: {
    name: string;
    icon: React.ComponentType<{ className?: string }>;
    link?: string;
  }[];
  setActiveTab: (tab: string) => void;
  activeTab: string;
}) {
  return (
    <> 
      <nav className="space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const baseClasses = `w-full flex items-center font-inter cursor-pointer gap-3 px-4 py-3 text-left transition-colors ${
            activeTab === item.name
              ? "border-b text-[#141718] border-[#141718]"
              : "text-[#6c7275]"
          }`;

          // If a link is provided, render a Next.js Link. Otherwise, render a button.
          return item.link ? (
            <Link href={item.link} key={item.name} className={baseClasses}>
              <Icon className="w-5 h-5" />
              {item.name}
            </Link>
          ) : (
            <button
              type="button"
              key={item.name}
              onClick={() => setActiveTab(item.name)}
              className={baseClasses}
            >
              <Icon className="w-5 h-5" />
              {item.name}
            </button>
          );
        })}
      </nav>
    </>
  );
}
