import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from 'js-cookie';
const initialState = {
    currentJobs: [],
    previousJobs: [],
    status: "idle",
    error: null,
};
const token = Cookies.get("token");
export const fetchJobs = createAsyncThunk("jobs/fetchJobs", async () => {
    const response = await axios.get("http://localhost:3000/api/v1/student/jobs",
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        },
    );
    return response.data;
});

const jobsSlice = createSlice({
    name: "jobs",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchJobs.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchJobs.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.currentJobs = action.payload.currentJobs;
                state.previousJobs = action.payload.previousJobs;
            })
            .addCase(fetchJobs.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message || "Something went wrong";
            });
    },
});

export default jobsSlice.reducer;

export const selectCurrentJobs = (state) => state.jobs.currentJobs;
export const selectPreviousJobs = (state) => state.jobs.previousJobs;
export const selectJobsStatus = (state) => state.jobs.status;
export const selectJobsError = (state) => state.jobs.error;