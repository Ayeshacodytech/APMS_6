import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";

const token = Cookies.get("token");

const initialState = {
    // MCQs
    mcqs: [],
    mcqDetails: null, // New property for a single MCQ's details
    // For storing the result of an attempt (if needed)
    attemptResult: null,
    // Resources
    resources: [],
    myResources: [],
    resourceDetails: null,
    //
    status: "idle",
    error: null,
};

//-------------------------------
// MCQs Thunks
//-------------------------------

// GET all MCQs
export const fetchMCQs = createAsyncThunk("aptitude/fetchMCQs", async () => {
    const response = await axios.get("http://localhost:3000/api/v1/aptitude/mcqs", {
        headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
});

// GET specific MCQ by ID
export const fetchMCQById = createAsyncThunk("aptitude/fetchMCQById", async (mcqId) => {
    const response = await axios.get(`http://localhost:3000/api/v1/aptitude/mcqs/${mcqId}`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
});

// POST attempt for an MCQ
export const attemptMCQ = createAsyncThunk(
    "aptitude/attemptMCQ",
    async ({ mcqId, attemptData }, { rejectWithValue }) => {
        try {
            const response = await axios.post(
                `http://localhost:3000/api/v1/aptitude/mcqs/${mcqId}/attempt`,
                attemptData,
                { headers: { Authorization: `Bearer ${token}` } }
            );
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);



//-------------------------------
// Resources Thunks
//-------------------------------

// GET all resources
export const fetchResources = createAsyncThunk("aptitude/fetchResources", async () => {
    const response = await axios.get("http://localhost:3000/api/v1/aptitude/resources", {
        headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
});

// GET single resource by ID
export const fetchResourceById = createAsyncThunk("aptitude/fetchResourceById", async (resourceId) => {
    const response = await axios.get(
        `http://localhost:3000/api/v1/aptitude/resources/${resourceId}`,
        { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data;
});

// GET my resources
export const fetchMyResources = createAsyncThunk("aptitude/fetchMyResources", async () => {
    const response = await axios.get("http://localhost:3000/api/v1/aptitude/myresources", {
        headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
});

// POST create a new resource
export const createResource = createAsyncThunk("aptitude/createResource", async (resourceData,{rejectWithValue}) => {
    console.log("resourceData:", resourceData);
    const response = await axios.post("http://localhost:3000/api/v1/aptitude/resources", resourceData, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
});

// DELETE a resource
export const deleteResource = createAsyncThunk("aptitude/deleteResource", async (resourceId) => {
    await axios.delete(`http://localhost:3000/api/v1/aptitude/resources/${resourceId}`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return resourceId;
});

//-------------------------------
// Aptitude Slice
//-------------------------------
const aptitudeSlice = createSlice({
    name: "aptitude",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // MCQs Cases
            .addCase(fetchMCQs.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchMCQs.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.mcqs = action.payload; // Assumes API returns an array
            })
            .addCase(fetchMCQs.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            })
            .addCase(fetchMCQById.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchMCQById.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.mcqDetails = action.payload;
            })
            .addCase(fetchMCQById.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            })
            .addCase(attemptMCQ.pending, (state) => {
                state.status = "loading";
            })
            .addCase(attemptMCQ.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.attemptResult = action.payload;
            })
            .addCase(attemptMCQ.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload || action.error.message;
            })

            // Resources Cases
            .addCase(fetchResources.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchResources.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.resources = action.payload;
            })
            .addCase(fetchResources.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            })
            .addCase(fetchResourceById.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchResourceById.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.resourceDetails = action.payload;
            })
            .addCase(fetchResourceById.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            })
            .addCase(fetchMyResources.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchMyResources.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.myResources = action.payload;
            })
            .addCase(fetchMyResources.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            })
            .addCase(createResource.fulfilled, (state, action) => {
                if (!Array.isArray(state.resources)) {
                    state.resources = [];
                }
                state.resources.push(action.payload);
            })
            .addCase(deleteResource.fulfilled, (state, action) => {
                state.resources = state.resources.filter((resource) => resource.id !== action.payload);
                state.myResources = state.myResources.filter((resource) => resource.id !== action.payload);
            });
    },
});

export default aptitudeSlice.reducer;

//-------------------------------
// Selectors
//-------------------------------
export const selectMCQs = (state) => state.aptitude.mcqs || [];
export const selectMCQDetails = (state) => state.aptitude.mcqDetails;
export const selectAttemptResult = (state) => state.aptitude.attemptResult;
export const selectResources = (state) => state.aptitude.resources || [];
export const selectMyResources = (state) => state.aptitude.myResources || [];
export const selectResourceDetails = (state) => state.aptitude.resourceDetails;
export const selectAptitudeStatus = (state) => state.aptitude.status;
export const selectAptitudeError = (state) => state.aptitude.error;
