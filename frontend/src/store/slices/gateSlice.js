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
export const fetchMCQs = createAsyncThunk("gate/fetchMCQs", async () => {
  const response = await axios.get(
    "https://apms-6.onrender.com/api/v1/gate/mcqs",
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return response.data;
});

// GET specific MCQ by ID
export const fetchMCQById = createAsyncThunk(
  "gate/fetchMCQById",
  async (mcqId) => {
    const response = await axios.get(
      `https://apms-6.onrender.com/api/v1/gate/mcqs/${mcqId}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data;
  }
);

// POST attempt for an MCQ
export const attemptMCQ = createAsyncThunk(
  "gate/attemptMCQ",
  async ({ mcqId, attemptData }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `https://apms-6.onrender.com/api/v1/gate/mcqs/${mcqId}/attempt`,
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
export const fetchResources = createAsyncThunk(
  "gate/fetchResources",
  async () => {
    const response = await axios.get(
      "https://apms-6.onrender.com/api/v1/gate/resources",
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data;
  }
);

// GET single resource by ID
export const fetchResourceById = createAsyncThunk(
  "gate/fetchResourceById",
  async (resourceId) => {
    const response = await axios.get(
      `https://apms-6.onrender.com/api/v1/gate/resources/${resourceId}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data;
  }
);

// GET my resources
export const fetchMyResources = createAsyncThunk(
  "gate/fetchMyResources",
  async () => {
    const response = await axios.get(
      "https://apms-6.onrender.com/api/v1/gate/myresources",
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data;
  }
);

// POST create a new resource
export const createResource = createAsyncThunk(
  "gate/createResource",
  async (resourceData, { rejectWithValue }) => {
    console.log("resourceData:", resourceData);
    const response = await axios.post(
      "https://apms-6.onrender.com/api/v1/gate/resources",
      resourceData,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data;
  }
);

// DELETE a resource
export const deleteResource = createAsyncThunk(
  "gate/deleteResource",
  async (resourceId) => {
    await axios.delete(
      `https://apms-6.onrender.com/api/v1/gate/resources/${resourceId}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return resourceId;
  }
);

//-------------------------------
// gate Slice
//-------------------------------
const gateSlice = createSlice({
  name: "gate",
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
        state.resources = state.resources.filter(
          (resource) => resource.id !== action.payload
        );
        state.myResources = state.myResources.filter(
          (resource) => resource.id !== action.payload
        );
      });
  },
});

export default gateSlice.reducer;

//-------------------------------
// Selectors
//-------------------------------
export const selectMCQs = (state) => state.gate.mcqs || [];
export const selectMCQDetails = (state) => state.gate.mcqDetails;
export const selectAttemptResult = (state) => state.gate.attemptResult;
export const selectResources = (state) => state.gate.resources || [];
export const selectMyResources = (state) => state.gate.myResources || [];
export const selectResourceDetails = (state) => state.gate.resourceDetails;
export const selectGateStatus = (state) => state.gate.status;
export const selectGateError = (state) => state.gate.error;
