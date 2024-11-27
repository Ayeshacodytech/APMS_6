import { configureStore } from "@reduxjs/toolkit";
import jobsReducer from "./slices/jobSlice"; // import the jobs slice
import userReducer from "./slices/userSlice";

// Create and configure the Redux store
const store = configureStore({
    reducer: {
        jobs: jobsReducer,
        user:userReducer
    },
});

export default store;