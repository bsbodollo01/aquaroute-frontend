"use client";

import ProtectedRoute from "@/components/ProtectedRoute";
import Dashboard from "@/components/SellerDashboard/Dashboard"

export default function SellerDashboard() {
  return (
    <ProtectedRoute allowedRole="SELLER">
      <div>
        <Dashboard/>
      </div>
    </ProtectedRoute>
  );
}

