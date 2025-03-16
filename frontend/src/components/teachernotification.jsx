import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchNotifications,
  markNotificationRead,
  selectNotifications,
  selectUnreadCount,
} from "../store/slices/teachernotificationSlice";
import NotificationCard from "./notificationCard";
import { io } from "socket.io-client";
import { useNavigate } from "react-router-dom";
import TeacherNotificationCard from "./teachernotificationCard";

const socket = io("https://apms-6.onrender.com", {
  auth: { token: document.cookie.split("token=")[1] }, // Extract token from cookies
});

const TeacherNotifications = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const notifications = useSelector(selectNotifications);
  const unreadCount = useSelector(selectUnreadCount);

  useEffect(() => {
    // Fetch notifications on mount
    dispatch(fetchNotifications());

    // Listen for new notifications via Socket.IO
    socket.on("notification", (notification) => {
      dispatch({
        type: "notifications/addNewNotification",
        payload: notification,
      });
    });

    return () => {
      socket.off("notification");
    };
  }, [dispatch]);

  const handleNotificationClick = async (postId, notifId) => {
    if (!postId || !notifId) return;

    try {
      const resultAction = await dispatch(markNotificationRead(notifId));
      if (markNotificationRead.fulfilled.match(resultAction)) {
        navigate(`/teacher/community/${postId}`);
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
            <TeacherNotificationCard
              key={notif.id}
              notif={notif}
              onClick={() => handleNotificationClick(notif.postId, notif.id)}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default TeacherNotifications;
