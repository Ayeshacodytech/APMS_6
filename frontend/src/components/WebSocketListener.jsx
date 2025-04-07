import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addNewNotification } from "../store/slices/notificationSlice";
import { io } from "socket.io-client";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// 🔔 Reusable Toast Notification Component
const NotificationToast = ({ notif }) => {
  const message =
    notif?.notificationData?.message || "New notification received";
  const timestamp = notif?.date ? new Date(notif.date) : new Date();

  return (
    <div
      className={`flex items-start space-x-3 p-3 rounded-lg transition cursor-pointer ${
        notif?.read
          ? "bg-gray-100"
          : "bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-700 font-semibold"
      }`}
    >
      <div className="flex-1">
        <p className="text-sm">{message}</p>
      </div>

      <span className="text-gray-400 text-xs">
        {timestamp.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
        })}
      </span>
    </div>
  );
};

const WebSocketListener = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = Cookies.get("token");
    if (!token) {
      console.error("❌ Token not found. Unable to connect to WebSocket.");
      return;
    }

    console.log("📡 Connecting to WebSocket...");

    // Create a new socket instance or use the existing one
    if (!window._socketInstance) {
      window._socketInstance = io("https://futureforge.onrender.com", {
        auth: { token },
        reconnection: true,
        reconnectionAttempts: 5,
        reconnectionDelay: 3000,
        transports: ["websocket", "polling"], // Try both transports
      });

      console.log("🔌 New socket instance created");
    }

    const socket = window._socketInstance;

    // Listen for ALL events (debug)
    socket.onAny((eventName, ...args) => {
      console.log(`🎯 Event received: ${eventName}`, args);
    });

    // Remove any existing listeners to prevent duplicates
    socket.off("notification");

    // Add notification listener with error handling
    socket.on("notification", (notification) => {
      console.log("📢 Received Notification:", notification);

      // Dispatch to Redux store
      try {
        dispatch(addNewNotification(notification));
        console.log("✅ Notification dispatched to Redux store");
      } catch (error) {
        console.error("❌ Redux dispatch error:", error);
      }

      // Display toast notification
      try {
        toast(<NotificationToast notif={notification} />, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        console.log("✅ Toast notification displayed");
      } catch (error) {
        console.error("❌ Toast error:", error);
      }
    });

    // Debug connection status
    socket.on("connect", () => {
      console.log("✅ Socket connected with ID:", socket.id);

      // TEST: Emit a ping to see if server responds
      setTimeout(() => {
        console.log("🏓 Sending ping to server...");
        socket.emit("ping", { message: "Testing connection" });
      }, 2000);
    });

    socket.on("disconnect", (reason) => {
      console.log("⚠️ Socket disconnected. Reason:", reason);
    });

    socket.on("connect_error", (err) => {
      console.error("❌ Socket connection error:", err.message);
    });

    // Add a listener for pong (test response)
    socket.on("pong", (data) => {
      console.log("🏓 Received pong from server:", data);
    });

    // Add a namespace listener for notification
    socket.on("/notification", (notification) => {
      console.log(
        "📡 Received notification from namespaced event:",
        notification
      );
    });

    return () => {
      // Clean up listeners when component unmounts
      socket.off("notification");
      socket.off("/notification");
      socket.off("connect");
      socket.off("disconnect");
      socket.off("connect_error");
      socket.off("pong");
      socket.offAny();
    };
  }, [dispatch]);

  return null; // No UI rendered
};

export default WebSocketListener;
