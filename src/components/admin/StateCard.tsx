import { TrendingDown, TrendingUp } from 'lucide-react';
import React from 'react'
interface StatCardProps {
    title: string;
    value: string;
    change: string;
    isPositive: boolean;
}
export default function StateCard({ title, value, change, isPositive, }: StatCardProps) {
    return (
        <>
            <div className="bg-white rounded-lg p-6 shadow-sm">
                <div className="flex justify-between items-start">
                    <div>
                        <p className="text-gray-500 text-sm mb-2">{title}</p>
                        <h3 className="text-2xl font-bold mb-2">{value}</h3>
                        <div className="flex items-center gap-1">
                            {isPositive ? (
                                <TrendingUp className="w-4 h-4 text-green-500" />
                            ) : (
                                <TrendingDown className="w-4 h-4 text-red-500" />
                            )}
                            <span className={`text-sm ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
                                {change}
                            </span>
                        </div>
                    </div>
                    <div className="w-20 h-16">
                        <svg xmlns="http://www.w3.org/2000/svg" width="70" height="57" viewBox="0 0 70 57" fill="none">
                            <path d="M9.0391 30.5561L0.311829 16.0106V56.7379H69.0391V18.5561L60.6755 24.3743L52.3118 41.1015L43.9482 12.0106L34.8573 0.7379L26.4936 24.7379L18.13 14.5561L9.0391 30.5561Z" fill="url(#paint0_linear_4001_593)" />
                            <path d="M0.311829 16.0106L9.0391 30.5561L18.13 14.5561L26.4936 24.7379L34.8573 0.7379L43.9482 12.0106L52.3118 41.1015L60.6755 24.3743L69.0391 18.5561" stroke="#10B981" stroke-width="0.727273" />
                            <defs>
                                <linearGradient id="paint0_linear_4001_593" x1="34.6755" y1="0.7379" x2="34.6755" y2="56.7379" gradientUnits="userSpaceOnUse">
                                    <stop stop-color="#E7F8F2" />
                                    <stop offset="0.664607" stop-color="#E7F8F2" stop-opacity="0" />
                                </linearGradient>
                            </defs>
                        </svg>
                    </div>
                </div>
            </div>
        </>
    )
}
