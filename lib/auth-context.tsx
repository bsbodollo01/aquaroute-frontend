"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
  useMemo,
} from "react";
import { useRouter } from "next/navigation";
import { apiFetch } from "@/lib/api";
import { STORAGE_USER_KEY, STORAGE_TOKEN_KEY } from "@/constants/constants";

export type UserRole = "BUYER" | "SELLER";

export interface AuthUser {
  id: string;
  email: string;
  role: UserRole;
}

interface AuthContextType {
  user: AuthUser | null;
  loading: boolean;
  isAuthenticated: boolean;
  signUp: (email: string, password: string, role: UserRole) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const router = useRouter();

  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  // Restore session on first load
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem(STORAGE_USER_KEY);
      const token = localStorage.getItem(STORAGE_TOKEN_KEY);

      if (storedUser && token) {
        setUser(JSON.parse(storedUser));
      }
    } catch {
      localStorage.removeItem(STORAGE_USER_KEY);
      localStorage.removeItem(STORAGE_TOKEN_KEY);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleAuthSuccess = (data: any) => {
    const authUser: AuthUser = {
      id: data.user.id,
      email: data.user.email,
      role: data.user.role,
    };

    localStorage.setItem(STORAGE_USER_KEY, JSON.stringify(authUser));
    if (data.token) localStorage.setItem(STORAGE_TOKEN_KEY, data.token);

    setUser(authUser);
  };

  const signIn = async (email: string, password: string) => {
    const data = await apiFetch("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });

    if (!data.success) throw new Error(data.message || "Login failed");

    handleAuthSuccess(data);
    router.push("/");
  };

  const signUp = async (email: string, password: string, role: UserRole) => {
    const data = await apiFetch("/auth/register", {
      method: "POST",
      body: JSON.stringify({ email, password, role }),
    });

    if (!data.success) throw new Error(data.message || "Registration failed");

    handleAuthSuccess(data);
    router.push("/");
  };

  const signOut = () => {
    localStorage.removeItem(STORAGE_USER_KEY);
    localStorage.removeItem(STORAGE_TOKEN_KEY);
    setUser(null);
    router.push("/auth");
  };

  const value = useMemo(
    () => ({
      user,
      loading,
      isAuthenticated: !!user,
      signIn,
      signUp,
      signOut,
    }),
    [user, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
}