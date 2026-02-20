import { apiFetch } from "../lib/api";

export const getOrderSummary = () => apiFetch("/seller/orders/summary");

export const updateOrderStatus = (orderId: string, status: string) =>
  apiFetch(`/orders/${orderId}/status`, {
    method: "PATCH",
    body: JSON.stringify({ status })
  });
