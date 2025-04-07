import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchNotifications,
  markNotificationRead,
  selectNotifications,
  selectUnreadCount,
  addNewNotification,
} from "../store/slices/notificationSlice";
import NotificationCard from "./notificationCard";
import { io } from "socket.io-client";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const Notifications = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const notifications = useSelector(selectNotifications);
  const unreadCount = useSelector(selectUnreadCount);

  useEffect(() => {
    // Fetch notifications on mount
    dispatch(fetchNotifications());

    // Initialize Socket.IO connection
    const token = Cookies.get("token");
    if (!token) {
      console.error("Token not found. Unable to connect to socket.");
      return;
    }

    const socket = io("https://futureforge-iota.vercel.app", {
      auth: { token },
    });

    // Listen for new notifications
    socket.on("notification", (notification) => {
      dispatch(addNewNotification(notification));
    });

    // Handle connection errors
    socket.on("connect_error", (err) => {
      console.error("Socket connection error:", err.message);
    });

    // Cleanup on component unmount
    return () => {
      socket.off("notification");
      socket.disconnect();
    };
  }, [dispatch]);

  const handleNotificationClick = async (postId, notifId) => {
    if (!postId || !notifId) return;

    try {
      const resultAction = await dispatch(markNotificationRead(notifId));
      if (markNotificationRead.fulfilled.match(resultAction)) {
        navigate(`/community/${postId}`);
      } else {
        console.error("Failed to mark notification as read");
      }
    } catch (error) {
      console.error("Error marking notification as read:", error);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-4 bg-white shadow-lg rounded-lg w-[400px] h-[400px] overflow-y-auto">
      <h2 className="text-lg font-semibold mb-3">
        Notifications{" "}
        {unreadCount > 0 && (
          <span className="text-red-500">({unreadCount} new)</span>
        )}
      </h2>
      <div className="space-y-4">
        {notifications.length === 0 ? (
          <p className="text-gray-500 text-center">No new notifications</p>
        ) : (
          notifications.map((notif) => (
            <NotificationCard
              key={notif.id}
              notif={notif}
              className={`p-3 rounded-md cursor-pointer ${
                notif.read ? "bg-gray-100" : "bg-blue-100 font-semibold"
              }`}
              onClick={() => handleNotificationClick(notif.postId, notif.id)}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Notifications;
