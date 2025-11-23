import React from "react";

export default function PageLoading() {
  return (
    <div>
      <div className="fixed inset-0 bg-transparent flex items-center justify-center">
        <div className="relative">
          {/* Outer rotating ring */}
          <div className="w-32 h-32 rounded-full border-4 border-[#2f6cdb]/20 border-t-[#2f6cdb] animate-spin"></div>

          {/* Inner pulsing circle */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-20 h-20 rounded-full bg-[#2f6cdb]/30 animate-pulse"></div>
          </div>

          {/* Center dot */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-8 h-8 rounded-full bg-[#2f6cdb] animate-bounce"></div>
          </div>

          {/* Orbiting dots */}
          <div
            className="absolute inset-0 animate-spin"
            style={{ animationDuration: "3s" }}
          >
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-3 bg-[#2f6cdb] rounded-full shadow-lg"></div>
          </div>
          <div
            className="absolute inset-0 animate-spin"
            style={{ animationDuration: "3s", animationDelay: "1s" }}
          >
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-3 bg-[#2f6cdb] rounded-full shadow-lg"></div>
          </div>
          <div
            className="absolute inset-0 animate-spin"
            style={{ animationDuration: "3s", animationDelay: "2s" }}
          >
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-3 bg-[#2f6cdb] rounded-full shadow-lg"></div>
          </div>
        </div>

        {/* Loading text */}
        <div className="absolute bottom-1/3 text-[#2f6cdb] text-2xl font-bold tracking-wider">
          <span className="inline-block animate-pulse font-inter">Loading</span>
          <span
            className="inline-block animate-bounce"
            style={{ animationDelay: "0.1s" }}
          >
            .
          </span>
          <span
            className="inline-block animate-bounce"
            style={{ animationDelay: "0.2s" }}
          >
            .
          </span>
          <span
            className="inline-block animate-bounce"
            style={{ animationDelay: "0.3s" }}
          >
            .
          </span>
        </div>
      </div>
    </div>
  );
}
