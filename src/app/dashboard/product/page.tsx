"use client";
import DashboardHeader from "@/components/admin/DashboardHeader";
import ProductForm from "@/components/admin/Inventory/ProductForm";
import Sidebar from "@/components/admin/Sidebar";
import React, { useState } from "react";

export default function Page() {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <DashboardHeader />

        <div className="flex-1 p-8 overflow-auto">
          {/* Add Product Button */}
          <button
            onClick={() => setShowForm(!showForm)}
            className="mb-6 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Add Product
          </button>

          {/* Add Product Form */}
          {showForm && <ProductForm />}
        </div>
      </div>
    </div>
  );
}
