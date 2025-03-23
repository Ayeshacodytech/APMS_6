import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // Defaults to localStorage for web
import { combineReducers } from "redux"; // Required to combine reducers
import jobsReducer from "./slices/jobSlice";
import userReducer from "./slices/userSlice";
import communityReducer from "./slices/communitySlice";
import teachercommunityReducer from "./slices/teachercommunityslice";
import notificationReducer from "./slices/notificationSlice";
import teachernotificationReducer from "./slices/teachernotificationSlice";
import teacheraptitudeReducer from "./slices/teacherAptitudeslice";
import aptitudeReducer from "./slices/aptitudeSlice";
import socketReducer from "./slices/socketSlice";
import teachergateReducer from "./slices/teacherGateslice";
import gateReducer from "./slices/gateSlice";
// Redux persist configuration
const persistConfig = {
    key: "root",
    storage,
};

// Combine all slice reducers into a single root reducer function
const rootReducer = combineReducers({
    jobs: jobsReducer,
    user: userReducer,
    community: communityReducer,
    notifications: notificationReducer,
    teachercommunity: teachercommunityReducer,
    teachernotifications: teachernotificationReducer,
    teacheraptitude: teacheraptitudeReducer,
    aptitude: aptitudeReducer,
    socket: socketReducer,
    teachergate: teachergateReducer,
    gate: gateReducer,
});

// Wrap the rootReducer with persistReducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure and create the Redux store
const store = configureStore({
    reducer: persistedReducer,
});

// Create the persistor instance
export const persistor = persistStore(store);

export default store;
