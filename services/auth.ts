import { apiFetch } from "../lib/api";

export const registerUser = (data: {
  email: string;
  password: string;
  role: "BUYER" | "SELLER";
}) => apiFetch("/auth/register", { method: "POST", body: JSON.stringify(data) });

export const loginUser = (email: string, password: string) =>
  apiFetch("/login", { method: "POST", body: JSON.stringify({ email, password }) });
