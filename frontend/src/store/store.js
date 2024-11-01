import { configureStore } from "@reduxjs/toolkit";
import jobsReducer from "./slices/jobSlice"; // import the jobs slice

// Create and configure the Redux store
const store = configureStore({
    reducer: {
        jobs: jobsReducer,
    },
});

export default store;