"use client"
import React, { useState } from 'react';
import { User, MapPin, ShoppingBag, Heart, LogOut } from 'lucide-react';
import Image from 'next/image';
import profileImage from '../../../public/images/Logo.png';
export default function MyAccountPage() {
    const [activeTab, setActiveTab] = useState('Account');
    const [formData, setFormData] = useState({
        name: 'Mohammad Al Amin',
        email: 'dev@gmail.com',
        username: '123Dev',
        oldPassword: '',
        newPassword: ''
    });

    const menuItems = [
        { name: 'Account', icon: User },
        { name: 'Address', icon: MapPin },
        { name: 'Orders', icon: ShoppingBag },
        { name: 'Wishlist', icon: Heart },
        { name: 'Log Out', icon: LogOut }
    ];

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-4xl font-medium font-poppins text-center mb-20">My Account</h1>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    <div className="lg:col-span-1">
                        <div className="bg-[#f3f5f7] rounded-lg py-5">
                            <div className="flex flex-col items-center mb-6 pb-6">
                                <div className="relative mb-4">
                                    <Image
                                        src={profileImage}
                                        width={24}
                                        height={24}
                                        alt="Mohammad Al Amin"
                                        className="w-24 h-24 rounded-full object-cover bg-blue-100"
                                    />
                                    <div className="absolute bottom-0 right-0 bg-gray-800 rounded-full p-1">
                                        <User className="w-4 h-4 text-white" />
                                    </div>
                                </div>
                                <h2 className="text-lg font-semibold text-gray-900 font-poppins">Mohammad Al Amin</h2>
                            </div>
                            <nav className="space-y-1">
                                {menuItems.map((item) => {
                                    const Icon = item.icon;
                                    return (
                                        <button
                                            key={item.name}
                                            onClick={() => setActiveTab(item.name)}
                                            className={`w-full flex items-center font-inter cursor-pointer gap-3 px-4 py-3 text-left transition-colors ${activeTab === item.name
                                                ? 'border-b text-[#141718] border-[#141718]'
                                                : 'text-[#6c7275]'
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
                    <div className="lg:col-span-3">
                        <div>
                            <form onSubmit={handleSubmit}>
                                <div className="mb-8">
                                    <h2 className="text-xl font-semibold mb-6 font-inter text-black">Account Details</h2>

                                    <div className="space-y-5">
                                        <div>
                                            <label htmlFor="name" className="block text-sm text-[#6c7275] font-inter font-bold mb-2">
                                                NAME
                                            </label>
                                            <input
                                                type="text"
                                                id="name"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleInputChange}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none transition"
                                            />
                                        </div>

                                        <div>
                                            <label htmlFor="email" className="block text-sm text-[#6c7275] font-inter font-bold mb-2">
                                                EMAIL
                                            </label>
                                            <input
                                                type="email"
                                                id="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleInputChange}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none transition"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Password Section */}
                                <div className="mb-8">
                                    <h2 className="text-xl font-semibold mb-6 font-inter text-black">Password</h2>

                                    <div className="space-y-5">
                                        <div>
                                            <label htmlFor="oldPassword" className="block text-sm text-[#6c7275] font-inter font-bold mb-2">
                                                OLD PASSWORD
                                            </label>
                                            <input
                                                type="password"
                                                id="oldPassword"
                                                name="oldPassword"
                                                placeholder="Old Password"
                                                value={formData.oldPassword}
                                                onChange={handleInputChange}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none transition placeholder-gray-400"
                                            />
                                        </div>

                                        <div>
                                            <label htmlFor="newPassword" className="block text-sm text-[#6c7275] font-inter font-bold mb-2">
                                                NEW PASSWORD
                                            </label>
                                            <input
                                                type="password"
                                                id="newPassword"
                                                name="newPassword"
                                                placeholder="New Password"
                                                value={formData.newPassword}
                                                onChange={handleInputChange}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none transition placeholder-gray-400"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <button
                                    type="submit"
                                    className="bg-gray-900 font-inter text-white px-8 py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors cursor-pointer"
                                >
                                    Save changes
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
