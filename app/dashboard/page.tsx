"use client";

import ProtectedRoute from "@/components/ProtectedRoute";
import Dashboard from "@/components/BuyerDashboard/Dashboard"

export default function SellerDashboard() {
  return (
    <ProtectedRoute allowedRole="BUYER">
      <div>
        <Dashboard/>
      </div>
    </ProtectedRoute>
  );
}

