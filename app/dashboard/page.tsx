"use client";

import ProtectedRoute from "@/components/ProtectedRoute";
import BuyerDashboard from "@/components/BuyerDashboard/Dashboard"
import SellerDashboard from "@/components/SellerDashboard/Dashboard"
import { useAuth } from "@/lib/auth-context";

export default function DashboardPage() {
  const { user } = useAuth()
  return (
    <ProtectedRoute allowedRole={user?.role}>
      <div>
        {user?.role === "BUYER" ? <BuyerDashboard/> : <SellerDashboard/>}
      </div>
    </ProtectedRoute>
  );
}

