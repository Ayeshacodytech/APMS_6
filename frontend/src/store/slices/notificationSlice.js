// notificationSlice.js - No changes needed
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

const getAuthToken = () => Cookies.get("token") || "";

// Fetch notifications from the API
export const fetchNotifications = createAsyncThunk("notifications/fetchNotifications", async () => {
    const token = getAuthToken();
    if (!token) throw new Error("Token not found");

    const response = await axios.get("https://futureforge-iota.vercel.app/api/v1/notification/student", {
        headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
});

// Mark a notification as read
export const markNotificationRead = createAsyncThunk("notifications/markNotificationRead", async (notificationId) => {
    const token = getAuthToken();
    if (!token) throw new Error("Token not found");

    await axios.patch(
        `https://futureforge-iota.vercel.app/api/v1/notification/${notificationId}/read`,
        {}, // Empty body
        { headers: { Authorization: `Bearer ${token}` } }
    );
    return notificationId;
});

// Notifications Slice
const notificationsSlice = createSlice({
    name: "notifications",
    initialState,
    reducers: {
        addNewNotification: (state, action) => {
            const exists = state.notifications.some((n) => n.id === action.payload.id);
            if (!exists) {
                state.notifications.unshift(action.payload);
                state.unreadCount += 1;
            }
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchNotifications.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchNotifications.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.notifications = action.payload;
                state.unreadCount = action.payload.filter((n) => !n.read).length;
            })
            .addCase(fetchNotifications.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            })
            .addCase(markNotificationRead.fulfilled, (state, action) => {
                const notifIndex = state.notifications.findIndex((n) => n.id === action.payload);
                if (notifIndex !== -1) {
                    state.notifications[notifIndex].read = true;
                    state.unreadCount = state.notifications.filter((n) => !n.read).length;
                }
            });
    },
});

export const { addNewNotification } = notificationsSlice.actions;
export default notificationsSlice.reducer;

// Selectors
export const selectNotifications = (state) => state.notifications.notifications;
export const selectUnreadCount = (state) => state.notifications.unreadCount;
export const selectNotificationsStatus = (state) => state.notifications.status;
export const selectNotificationsError = (state) => state.notifications.error;

// Setup WebSocket Listeners - original implementation, can be removed if using WebSocketListener component
export const setupSocketListeners = (dispatch) => {
    const token = getAuthToken();
    if (!token) {
        console.error("Cannot connect to WebSocket: Token not found");
        return null;
    }

    const socket = io("https://futureforge-iota.vercel.app", { auth: { token } });

    socket.on("connect_error", (err) => {
        console.error("WebSocket connection error:", err.message);
    });

    socket.on("notification", (notification) => {
        console.log("New notification received:", notification);
        dispatch(addNewNotification(notification));
    });

    socket.on("disconnect", () => {
        console.warn("Disconnected from WebSocket");
    });

    return socket;
};
