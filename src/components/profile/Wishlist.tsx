"use client";
import { getCookie } from "@/helper/Token";
import { useQuery } from "@tanstack/react-query";
import { getProfile } from "@/actions/user.action";
import Image from "next/image";
import AccountMenu from "./AccountMenu";
import { Heart, LogOut, User } from "lucide-react";
import { useState } from "react";
import MyProfileSkeleton from "../Loading/MyProfileSkeleton";
import WishlistMainContent from "./WishlistMainContent";

export default function Wishlist() {
  const [activeTab, setActiveTab] = useState("Wishlist");
  // get user profile
  const token: string | undefined = getCookie("token");
  const {
    data: userProfile,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["userProfile"],
    queryFn: () => getProfile(token || ""),
  });

  const menuItems = [
    { name: "Account", icon: User, link: "/profile" },
    { name: "Wishlist", icon: Heart, link: "/wishlist" },
    { name: "Log Out", icon: LogOut },
  ];

  if (isLoading) return <MyProfileSkeleton />;
  if (error) return <p className="text-center mt-20">Error loading profile</p>;

  return (
    <>
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-medium font-poppins text-center mb-20">
            My Wishlist
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-[#f3f5f7] rounded-lg py-5">
                <div className="flex flex-col items-center mb-6 pb-6 relative">
                  <div className="relative mb-4 group">
                    <Image
                      src={userProfile?.data.photo || "/images/userProfile.jpg"}
                      width={96}
                      height={96}
                      alt="User"
                      className="w-24 h-24 rounded-full object-cover bg-blue-100"
                    />
                  </div>

                  <h2 className="text-lg font-semibold text-gray-900 font-poppins">
                    {userProfile?.data.name || "User Name"}
                  </h2>
                </div>
                {/* left menu */}
                <AccountMenu
                  menuItems={menuItems}
                  setActiveTab={setActiveTab}
                  activeTab={activeTab}
                />
              </div>
            </div>
            {/* Main content */}
            <WishlistMainContent />
          </div>
        </div>
      </div>
    </>
  );
}
