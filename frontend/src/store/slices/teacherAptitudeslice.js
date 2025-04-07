import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";

const token = Cookies.get("token");

export const initialState = {
  // For MCQs
  mcqs: [],
  myMCQ: [],
  mcqDetails: null,
  // For Resources
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

// Fetch all MCQs
export const fetchMCQs = createAsyncThunk("aptitude/fetchMCQs", async () => {
  const response = await axios.get(
    "https://futureforge.onrender.com/api/v1/teacher/aptitude/mcqs",
    {
      headers: { Authorization: `Bearer ${Cookies.get("token")}` },
    }
  );
  return response.data; // Assumes the API returns an array
});

// Fetch my MCQs
export const fetchMyMCQs = createAsyncThunk(
  "aptitude/fetchMyMCQs",
  async () => {
    const response = await axios.get(
      "https://futureforge.onrender.com/api/v1/teacher/aptitude/mymcq",
      {
        headers: { Authorization: `Bearer ${Cookies.get("token")}` },
      }
    );
    console.log("my mcqs redux", response.data);
    return response.data; // Assumes the API returns an array
  }
);

// Create a new MCQ
export const createMCQ = createAsyncThunk(
  "aptitude/createMCQ",
  async (mcqData) => {
    const response = await axios.post(
      "https://futureforge.onrender.com/api/v1/teacher/aptitude/mcqs",
      mcqData,
      {
        headers: { Authorization: `Bearer ${Cookies.get("token")}` },
      }
    );
    return response.data;
  }
);

// Delete an MCQ
export const deleteMCQ = createAsyncThunk(
  "aptitude/deleteMCQ",
  async (mcqId) => {
    await axios.delete(
      `https://futureforge.onrender.com/api/v1/teacher/aptitude/mcqs/${mcqId}`,
      {
        headers: { Authorization: `Bearer ${Cookies.get("token")}` },
      }
    );
    return mcqId;
  }
);

// Optionally, fetch a single MCQ by ID if needed
export const fetchMCQById = createAsyncThunk(
  "aptitude/fetchMCQById",
  async (mcqId) => {
    const response = await axios.get(
      `https://futureforge.onrender.com/api/v1/teacher/aptitude/mcqs/${mcqId}`,
      {
        headers: { Authorization: `Bearer ${Cookies.get("token")}` },
      }
    );
    return response.data;
  }
);

//-------------------------------
// Resources Thunks
//-------------------------------

// Fetch all Resources
export const fetchResources = createAsyncThunk(
  "aptitude/fetchResources",
  async () => {
    const response = await axios.get(
      "https://futureforge.onrender.com/api/v1/teacher/aptitude/resources",
      {
        headers: { Authorization: `Bearer ${Cookies.get("token")}` },
      }
    );
    return response.data;
  }
);

// Fetch my Resources
export const fetchMyResources = createAsyncThunk(
  "aptitude/fetchMyResources",
  async () => {
    const response = await axios.get(
      "https://futureforge.onrender.com/api/v1/teacher/aptitude/myresources",
      {
        headers: { Authorization: `Bearer ${Cookies.get("token")}` },
      }
    );
    return response.data;
  }
);

// Fetch a single Resource by ID
export const fetchResourceById = createAsyncThunk(
  "aptitude/fetchResourceById",
  async (resourceId) => {
    const response = await axios.get(
      `https://futureforge.onrender.com/api/v1/teacher/aptitude/resources/${resourceId}`,
      {
        headers: { Authorization: `Bearer ${Cookies.get("token")}` },
      }
    );
    return response.data;
  }
);

// Create a new Resource
export const createResource = createAsyncThunk(
  "aptitude/createResource",
  async (resourceData) => {
    const response = await axios.post(
      "https://futureforge.onrender.com/api/v1/teacher/aptitude/resources",
      resourceData,
      {
        headers: { Authorization: `Bearer ${Cookies.get("token")}` },
      }
    );
    return response.data;
  }
);

// Delete a Resource
export const deleteResource = createAsyncThunk(
  "aptitude/deleteResource",
  async (resourceId) => {
    await axios.delete(
      `https://futureforge.onrender.com/api/v1/teacher/aptitude/resources/${resourceId}`,
      {
        headers: { Authorization: `Bearer ${Cookies.get("token")}` },
      }
    );
    return resourceId;
  }
);

//-------------------------------
// Teacher Aptitude Slice
//-------------------------------
const teacherAptitudeSlice = createSlice({
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
        state.mcqs = action.payload; // Replace with action.payload.mcqs if needed
      })
      .addCase(fetchMCQs.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchMyMCQs.pending, (state) => {
        console.log("fetchMyMCQs Pending");
        state.status = "loading";
      })
      .addCase(fetchMyMCQs.fulfilled, (state, action) => {
        console.log("Action Payload for My MCQs:", action.payload);
        state.status = "succeeded";
        state.myMCQ = [...action.payload]; // Ensure immutability
        console.log("Updated State:", state.myMCQ);
      })

      .addCase(fetchMyMCQs.rejected, (state, action) => {
        console.log("fetchMyMCQs Rejected", action.error.message);
        state.status = "failed";
        state.error = action.error.message;
      })

      .addCase(createMCQ.fulfilled, (state, action) => {
        if (!Array.isArray(state.mcqs)) {
          state.mcqs = [];
        }
        state.mcqs.push(action.payload);
      })
      .addCase(deleteMCQ.fulfilled, (state, action) => {
        state.mcqs = state.mcqs.filter((mcq) => mcq.id !== action.payload);
        state.myMCQ = state.myMCQ.filter((mcq) => mcq.id !== action.payload);
        console.log("Updated State after Deletion:", state);
      })
      // Optionally, add fetchMCQById cases if used
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

export default teacherAptitudeSlice.reducer;

// Selectors
export const selectMCQs = (state) => state.aptitude.mcqs || [];
export const selectMyMCQs = (state) => {
  console.log("Full State in Selector:", state);
  console.log("Selector Output (myMCQ):", state.aptitude.myMCQ);
  return state.aptitude.myMCQ || [];
};

export const selectMCQDetails = (state) => state.aptitude.mcqDetails;
export const selectResources = (state) => state.aptitude.resources || [];
export const selectMyResources = (state) => state.aptitude.myResources || [];
export const selectResourceDetails = (state) => state.aptitude.resourceDetails;
export const selectAptitudeStatus = (state) => state.aptitude.status;
export const selectAptitudeError = (state) => state.aptitude.error;
