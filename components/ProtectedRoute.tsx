"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth, UserRole } from "@/lib/auth-context";

export default function ProtectedRoute({
  children,
  allowedRole,
}: {
  children: React.ReactNode;
  allowedRole?: UserRole;
}) {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/auth");
      return;
    }
    
    if (!isLoading && user && allowedRole && user.role !== allowedRole) {
      router.push("/auth");
    }
  }, [user, isLoading, allowedRole, router]);

  if (isLoading) return <div>Loading...</div>;
  if (!user) return null;

  return <>{children}</>;
}