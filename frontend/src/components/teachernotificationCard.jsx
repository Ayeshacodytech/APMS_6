import React from "react";

const TeacherNotificationCard = ({ notif, onClick, onUserClick }) => {
    console.log("Notification Data:", notif);
    return (
        <div
            className={`flex items-start space-x-3 p-3 rounded-lg transition cursor-pointer ${
                notif.read ? "bg-gray-100" : "bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-700 font-semibold"
            } hover:bg-gray-200`}
            onClick={() => onClick(notif.postId,notif.id)}
        >
            {/* Profile Image Placeholder - Clicking shows user details */}
            <div
                className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center text-white font-bold cursor-pointer"
                onClick={(e) => {
                    e.stopPropagation(); // Prevent triggering post click
                    onUserClick(notif.sender);
                }}
            >
                {notif.sender?.name.charAt(0).toUpperCase()||notif.teachersender?.name.charAt(0).toUpperCase()}
            </div>

            {/* Notification Text */}
            <div className="flex-1">
                <p className="text-sm">{notif.notificationData.message}</p>
            </div>

            {/* Timestamp */}
            <span className="text-gray-400 text-xs">
                {new Date(notif.date).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit"
                })}
            </span>
        </div>
    );
};

export default TeacherNotificationCard;
