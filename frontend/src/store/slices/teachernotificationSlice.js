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

    const response = await axios.get("https://futureforge-iota.vercel.app/api/v1/notification/teacher", {
        headers: { Authorization: `Bearer ${Cookies.get("token")}` },
    });
    return response.data;
});

// Mark notification as read
export const markNotificationRead = createAsyncThunk("notifications/markNotificationRead", async (notificationId) => {
    if (!token) throw new Error("Token not found");

    await axios.patch(
        `https://futureforge-iota.vercel.app/api/v1/notification/${notificationId}/read`,
        {}, // Empty body (if needed)
        { headers: { Authorization: `Bearer ${Cookies.get("token")}` } } // Headers should be the 3rd argument
    );
    return notificationId;
});

// Notifications slice
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
            .addCase(markNotificationRead.fulfilled, (state, action) => {
                const notifIndex = state.notifications.findIndex(n => n.id === action.payload);
                if (notifIndex !== -1) {
                    state.notifications[notifIndex].read = true;
                    state.unreadCount = state.notifications.filter((n) => !n.read).length;
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
