"use client";
import React, { useState, useEffect } from "react";
import { User, MapPin, ShoppingBag, Heart, LogOut, Camera } from "lucide-react";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { getProfile, updateProfile } from "@/actions/user.action";
import { getCookie } from "@/helper/Token";
import MyProfileSkeleton from "../Loading/MyProfileSkeleton";
import AccountDetails from "./AccountDetails";
import { ToastContainer, toast } from "react-toastify";

export default function MyAccountPage() {
  const [activeTab, setActiveTab] = useState("Account");
  const [isUpdating, setIsUpdating] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    oldPassword: "",
    newPassword: "",
  });
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const menuItems = [
    { name: "Account", icon: User },
    { name: "Address", icon: MapPin },
    { name: "Orders", icon: ShoppingBag },
    { name: "Wishlist", icon: Heart },
    { name: "Log Out", icon: LogOut },
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // image change handler
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

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

  useEffect(() => {
    if (userProfile?.data) {
      setFormData((prev) => ({
        ...prev,
        name: userProfile.data.name,
        email: userProfile.data.email,
      }));
      setPreviewUrl(userProfile.data.photo || null);
    }
  }, [userProfile]);

  // update profile
  const updateUserProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUpdating(true);
    try {
      const form = new FormData();
      if (formData.name) form.append("name", formData.name);
      if (formData.oldPassword)
        form.append("oldPassword", formData.oldPassword);
      if (formData.newPassword) form.append("password", formData.newPassword);
      if (selectedImage) form.append("photo", selectedImage);

      const res = await updateProfile(
        token || "",
        formData.name,
        formData.oldPassword,
        formData.newPassword,
        selectedImage || undefined
      );

      if (res.status === "success") {
        toast.success("Profile updated successfully!");
      } else {
        toast.error(res.message || "Failed to update profile");
      }
    } catch (err: unknown) {
      toast.error(
        (err as Error).message || "An error occurred while updating profile"
      );
    } finally {
      setIsUpdating(false);
    }
  };

  if (isLoading) return <MyProfileSkeleton />;
  if (error) return <p className="text-center mt-20">Error loading profile</p>;

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-medium font-poppins text-center mb-20">
          My Account
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-[#f3f5f7] rounded-lg py-5">
              <div className="flex flex-col items-center mb-6 pb-6 relative">
                <div className="relative mb-4 group">
                  <Image
                    src={previewUrl || "/images/Logo.png"}
                    width={96}
                    height={96}
                    alt="User"
                    className="w-24 h-24 rounded-full object-cover bg-blue-100"
                  />

                  {/* Camera icon for image upload */}
                  <label
                    htmlFor="profileImage"
                    className="absolute bottom-0 right-0 bg-gray-800 p-2 rounded-full cursor-pointer hover:bg-gray-700 transition"
                  >
                    <Camera className="w-4 h-4 text-white" />
                  </label>
                  <input
                    id="profileImage"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageChange}
                  />
                </div>

                <h2 className="text-lg font-semibold text-gray-900 font-poppins">
                  {userProfile?.data.name || "User Name"}
                </h2>
              </div>

              <nav className="space-y-1">
                {menuItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.name}
                      onClick={() => setActiveTab(item.name)}
                      className={`w-full flex items-center font-inter cursor-pointer gap-3 px-4 py-3 text-left transition-colors ${
                        activeTab === item.name
                          ? "border-b text-[#141718] border-[#141718]"
                          : "text-[#6c7275]"
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      {item.name}
                    </button>
                  );
                })}
              </nav>
            </div>
          </div>

          {/* Main content */}
          <AccountDetails
            isUpdating={isUpdating}
            updateUserProfile={updateUserProfile}
            formData={formData}
            handleInputChange={handleInputChange}
          />
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
