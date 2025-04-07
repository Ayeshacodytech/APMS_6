import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";

const initialState = {
  profile: {
    id: "",
    name: "",
    email: "",
    registernumber: "",
    year: "",
    department: "",
    YearofGraduation: "",
    cgpa: "",
    batch: "",
    isPlaced: false,
    FieldofInterest: "",
  },
  status: "idle",
  error: null,
};

// Get token from cookies
const token = Cookies.get("token");

// Fetch user profile
export const fetchProfile = createAsyncThunk("user/fetchProfile", async () => {
  const response = await axios.get(
    "https://futureforge.onrender.com/api/v1/student/profile",
    {
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
    }
  );
  return response.data;
});

// Update user profile
export const updateProfile = createAsyncThunk(
  "user/updateProfile",
  async (updatedData) => {
    const response = await axios.put(
      "https://futureforge.onrender.com/api/v1/student/updateProfile",
      updatedData,
      {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      }
    );
    return response.data;
  }
);

// Update placement status
export const updatePlacementStatus = createAsyncThunk(
  "user/updatePlacementStatus",
  async (isPlaced) => {
    const response = await axios.put(
      "https://futureforge.onrender.com/api/v1/student/updatePlacement",
      { isPlaced },
      {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      }
    );
    return response.data;
  }
);

// Create a placed company
export const createPlacedCompany = createAsyncThunk(
  "user/createPlacedCompany",
  async (companyData) => {
    const response = await axios.post(
      "https://futureforge.onrender.com/api/v1/student/createPlacedCompany",
      companyData,
      {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      }
    );
    return response.data;
  }
);

// Update placed company details
export const updatePlacedCompany = createAsyncThunk(
  "user/updatePlacedCompany",
  async ({ id, companyData }) => {
    const response = await axios.put(
      `https://futureforge.onrender.com/api/v1/student/updatePlacedCompany/${id}`,
      companyData,
      {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      }
    );
    return response.data;
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch profile
      .addCase(fetchProfile.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.profile = action.payload;
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to fetch profile";
      })

      // Update profile
      .addCase(updateProfile.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.profile = action.payload;
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to update profile";
      })

      // Update placement status
      .addCase(updatePlacementStatus.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updatePlacementStatus.fulfilled, (state, action) => {
        state.status = "succeeded";
        if (state.profile) {
          state.profile.isPlaced = action.payload.isPlaced;
        }
      })
      .addCase(updatePlacementStatus.rejected, (state, action) => {
        state.status = "failed";
        state.error =
          action.error.message || "Failed to update placement status";
      })

      // Create placed company
      .addCase(createPlacedCompany.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createPlacedCompany.fulfilled, (state, action) => {
        state.status = "succeeded";
        if (state.profile && state.profile.placedCompanies) {
          state.profile.placedCompanies.push(action.payload);
        }
      })
      .addCase(createPlacedCompany.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to create placed company";
      })

      // Update placed company
      .addCase(updatePlacedCompany.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updatePlacedCompany.fulfilled, (state, action) => {
        state.status = "succeeded";
        if (state.profile && state.profile.placedCompanies) {
          const index = state.profile.placedCompanies.findIndex(
            (company) => company.id === action.payload.id
          );
          if (index !== -1) {
            state.profile.placedCompanies[index] = action.payload;
          }
        }
      })
      .addCase(updatePlacedCompany.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to update placed company";
      });
  },
});

export default userSlice.reducer;

export const selectUserProfile = (state) => state.user.profile;
export const selectUserStatus = (state) => state.user.status;
export const selectUserError = (state) => state.user.error;
