import { configureStore } from "@reduxjs/toolkit";
import jobsReducer from "./slices/jobSlice";
import userReducer from "./slices/userSlice";
import communityReducer from "./slices/communitySlice";
import teachercommunityReducer from "./slices/teachercommunityslice";
import notificationReducer from "./slices/notificationSlice"
import teachernotificationReducer from "./slices/teachernotificationSlice"
import teacheraptitudeReducer from "./slices/teacherAptitudeslice"
import aptitudeReducer from "./slices/aptitudeSlice";
const store = configureStore({
    reducer: {
        jobs: jobsReducer,
        user:userReducer,
        community:communityReducer,
        notifications:notificationReducer,
        teachercommunity:teachercommunityReducer,
        teachernotifications:teachernotificationReducer,
        teacheraptitude:teacheraptitudeReducer,
        aptitude:aptitudeReducer
    },
});

export default store;
