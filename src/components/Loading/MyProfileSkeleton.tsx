import React from "react";

export default function MyProfileSkeleton() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 animate-pulse">
      <div className="max-w-6xl mx-auto">
        <h1 className="h-10 w-64 bg-gray-300 rounded mx-auto mb-20"></h1>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Skeleton */}
          <div className="lg:col-span-1 bg-[#f3f5f7] rounded-lg py-5 px-4 space-y-6">
            <div className="flex flex-col items-center mb-6 pb-6">
              <div className="w-24 h-24 rounded-full bg-gray-300 mb-4"></div>
              <div className="h-5 w-32 bg-gray-300 rounded"></div>
            </div>
            <div className="space-y-3">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="h-6 w-full bg-gray-300 rounded"></div>
              ))}
            </div>
          </div>

          {/* Main Content Skeleton */}
          <div className="lg:col-span-3 bg-white rounded-lg p-6 space-y-6">
            {/* Account Details */}
            <div className="space-y-4">
              <div className="h-6 w-48 bg-gray-300 rounded"></div>
              {Array.from({ length: 2 }).map((_, i) => (
                <div key={i} className="h-10 w-full bg-gray-300 rounded"></div>
              ))}
            </div>

            {/* Password Section */}
            <div className="space-y-4">
              <div className="h-6 w-48 bg-gray-300 rounded"></div>
              {Array.from({ length: 2 }).map((_, i) => (
                <div key={i} className="h-10 w-full bg-gray-300 rounded"></div>
              ))}
            </div>

            {/* Save Button */}
            <div className="h-12 w-40 bg-gray-300 rounded mt-4"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
