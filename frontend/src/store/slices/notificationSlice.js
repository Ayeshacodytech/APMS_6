import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";
import { io } from "socket.io-client";

const initialState = {
    notifications: [],
    unreadCount: 0,
    status: "idle",
    error: null,
};

const token = Cookies.get("token") || "";

// Fetch notifications
export const fetchNotifications = createAsyncThunk("notifications/fetchNotifications", async () => {
    if (!token) throw new Error("Token not found");

    const response = await axios.get("https://futureforge-iota.vercel.app/api/v1/notification/student", {
        headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
});

// Mark notification as read
export const markNotificationRead = createAsyncThunk("notifications/markNotificationRead", async (notificationId) => {
    if (!token) throw new Error("Token not found");

    await axios.patch(
        `https://futureforge-iota.vercel.app/api/v1/notification/${notificationId}/read`,
        {}, // Empty body (if needed)
        { headers: { Authorization: `Bearer ${token}` } } // Headers should be the 3rd argument
    );
    return notificationId;
});

// Notifications slice
const notificationsSlice = createSlice({
    name: "notifications",
    initialState,
    reducers: {
        addNewNotification: (state, action) => {
            state.notifications.unshift(action.payload);
            state.unreadCount += 1;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(markNotificationRead.fulfilled, (state, action) => {
                const notifIndex = state.notifications.findIndex(n => n.id === action.payload);
                if (notifIndex !== -1) {
                    state.notifications[notifIndex] = {
                        ...state.notifications[notifIndex],
                        read: true, // Ensure reactivity by creating a new object
                    };
                    state.unreadCount = state.notifications.filter(n => !n.read).length;
                }
            })

            .addCase(fetchNotifications.pending, (state) => { state.status = "loading"; })
            .addCase(fetchNotifications.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.notifications = action.payload;
                state.unreadCount = action.payload.filter(n => !n.read).length;
            })
            .addCase(fetchNotifications.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            });
    },
});

export default notificationsSlice.reducer;
export const { addNewNotification } = notificationsSlice.actions;

export const selectNotifications = (state) => state.notifications.notifications;
export const selectUnreadCount = (state) => state.notifications.unreadCount;
export const selectNotificationsStatus = (state) => state.notifications.status;
export const selectNotificationsError = (state) => state.notifications.error;

// WebSocket connection moved inside a function
export const setupSocketListeners = (dispatch) => {
    const socket = io("http://localhost:3000", { auth: { token } });

    socket.on("newNotification", (notification) => {
        dispatch(addNewNotification(notification));
    });

    return socket;
};
