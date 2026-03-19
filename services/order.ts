import { apiFetch } from "../lib/api";
import { Order } from "../utils/orderTypes";

export const createOrder = (sellerId: string, quantity: number) =>
    apiFetch("/orders", { method: "POST", body: JSON.stringify({ sellerId, quantity }) });

export const getOrders = () => apiFetch("/orders");

export const getOrderById = (id: string) => apiFetch(`/orders/${id}`);

export const updateOrder = (id: string, order: Order) =>
    apiFetch(`/orders/${id}`, { method: "PUT", body: JSON.stringify(order) });

export const deleteOrder = (id: string) => apiFetch(`/orders/${id}`, { method: "DELETE" });