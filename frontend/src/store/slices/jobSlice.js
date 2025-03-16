import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";

const API_URL = "https://apms-6.onrender.com/api/v1/admin"; // Update as per your backend routes

const getToken = () => Cookies.get("token");

const initialState = {
  currentJobs: [],
  previousJobs: [],
  status: "idle",
  error: null,
};

export const fetchJobs = createAsyncThunk(
  "jobs/fetchJobs",
  async (_, { rejectWithValue }) => {
    try {
      const token = getToken();
      const response = await axios.get(
        "https://apms-6.onrender.com/api/v1/student/jobs",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message || "Failed to fetch jobs"
      );
    }
  }
);

export const fetchAdminJobs = createAsyncThunk(
  "jobs/fetchAdminJobs",
  async (_, { rejectWithValue }) => {
    try {
      const token = getToken();
      const response = await axios.get(`${API_URL}/jobs`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Failed to fetch admin jobs"
      );
    }
  }
);

export const addJob = createAsyncThunk(
  "jobs/addJob",
  async (jobData, { rejectWithValue }) => {
    try {
      const token = getToken();
      const response = await axios.post(`${API_URL}/addJob`, jobData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message || "Failed to add job"
      );
    }
  }
);

export const updateJob = createAsyncThunk(
  "jobs/updateJob",
  async ({ id, updatedJob }, { rejectWithValue }) => {
    try {
      const token = getToken();
      const response = await axios.put(
        `${API_URL}/updateJob/${id}`,
        updatedJob,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message || "Failed to update job"
      );
    }
  }
);

export const deleteJob = createAsyncThunk(
  "jobs/deleteJob",
  async (id, { rejectWithValue }) => {
    try {
      const token = getToken();
      await axios.delete(`${API_URL}/deleteJob/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return id;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message || "Failed to delete job"
      );
    }
  }
);

const jobsSlice = createSlice({
  name: "jobs",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchJobs.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchJobs.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.currentJobs = action.payload.currentJobs || [];
        state.previousJobs = action.payload.previousJobs || [];
      })
      .addCase(fetchJobs.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(fetchAdminJobs.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchAdminJobs.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.currentJobs = action.payload.currentJobs || [];
        state.previousJobs = action.payload.previousJobs || [];
      })
      .addCase(fetchAdminJobs.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(addJob.fulfilled, (state, action) => {
        if (action.payload.currentJob) {
          state.currentJobs.push(action.payload.currentJob);
        }
      })
      .addCase(addJob.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(updateJob.fulfilled, (state, action) => {
        const index = state.currentJobs.findIndex(
          (job) => job.id === action.payload.id
        );
        if (index !== -1) {
          state.currentJobs[index] = action.payload;
        }
      })
      .addCase(updateJob.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(deleteJob.fulfilled, (state, action) => {
        state.currentJobs = state.currentJobs.filter(
          (job) => job.id !== action.payload
        );
      })
      .addCase(deleteJob.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export default jobsSlice.reducer;

export const selectCurrentJobs = (state) => state.jobs.currentJobs;
export const selectPreviousJobs = (state) => state.jobs.previousJobs;
export const selectJobsStatus = (state) => state.jobs.status;
export const selectJobsError = (state) => state.jobs.error;
