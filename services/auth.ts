import { apiFetch } from "../lib/api";

export const registerUser = (data: {
  email: string;
  password: string;
  role: "BUYER" | "SELLER";
}) => apiFetch("/auth/register", { method: "POST", body: JSON.stringify(data) });