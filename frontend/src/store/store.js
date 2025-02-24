import { configureStore } from "@reduxjs/toolkit";
import jobsReducer from "./slices/jobSlice";
import userReducer from "./slices/userSlice";
import communityReducer from "./slices/communitySlice";
import notificationReducer from "./slices/notificationSlice"
const store = configureStore({
    reducer: {
        jobs: jobsReducer,
        user:userReducer,
        community:communityReducer,
        notifications:notificationReducer
    },
});

export default store;