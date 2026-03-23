import { io } from "socket.io-client";

// Use the environment variable, fallback to localhost for dev
const SOCKET_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

export const socket = io(SOCKET_URL, {
  withCredentials: true, // Required because your backend uses CORS with credentials
  transports: ["websocket", "polling"], // Ensures compatibility with Render's setup
});