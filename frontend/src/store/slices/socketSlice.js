import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import { io } from "socket.io-client";
import { addNewNotification } from "./notificationSlice";

let socket = null;

const initialState = {
  isConnected: false,
  error: null,
};

const socketSlice = createSlice({
  name: "socket",
  initialState,
  reducers: {
    connectStart: (state) => {
      state.isConnected = false;
      state.error = null;
    },
    connectSuccess: (state) => {
      state.isConnected = true;
      state.error = null;
    },
    connectError: (state, action) => {
      state.isConnected = false;
      state.error = action.payload;
    },
    disconnect: (state) => {
      state.isConnected = false;
      state.error = null;
    },
  },
});

export const { connectStart, connectSuccess, connectError, disconnect } =
  socketSlice.actions;
export default socketSlice.reducer;

// Singleton WebSocket Initialization
export const initializeSocket = () => async (dispatch) => {
  if (socket && socket.connected) {
    return socket; // Prevent duplicate connections
  }

  const token = Cookies.get("token");
  if (!token) {
    console.error("Cannot connect to WebSocket: Token not found");
    return;
  }

  dispatch(connectStart());

  socket = io("https://apms-6.onrender.com", {
    auth: { token },
    reconnection: true, // Auto-reconnect
    reconnectionAttempts: 5,
    reconnectionDelay: 2000,
  });

  socket.on("connect", () => {
    console.log("WebSocket connected");
    dispatch(connectSuccess());
  });

  socket.on("connect_error", (err) => {
    console.error("WebSocket error:", err.message);
    dispatch(connectError(err.message));
  });

  socket.on("disconnect", () => {
    console.warn("WebSocket disconnected. Reconnecting...");
    dispatch(disconnect());
  });

  socket.on("notification", (notification) => {
    dispatch(addNewNotification(notification));
  });

  return socket;
};

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    console.log("Socket disconnected manually");
  }
};
