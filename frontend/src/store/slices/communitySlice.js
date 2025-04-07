import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";

const initialState = {
  posts: [],
  myPosts: [],
  postDetails: null,
  status: "idle",
  myPostsStatus: "idle",
  error: null,
  myPostsError: null,
  currentPage: 1,
  myPostsCurrentPage: 1,
  totalPages: 1,
  myPostsTotalPages: 1,
  totalPosts: 0,
  myPostsTotalCount: 0,
  hasMore: true,
  hasMoreMyPosts: true,
  postsPerPage: 10,
};

// Fetch my posts with pagination
export const fetchMyPosts = createAsyncThunk(
  "community/fetchMyPosts",
  async (page = 1, { getState }) => {
    const state = getState();
    // Only fetch if there are more pages or we're explicitly fetching page 1
    if (page === 1 || page <= state.community.myPostsTotalPages) {
      const response = await axios.get(
        "https://futureforge-iota.vercel.app/api/v1/community/myposts",
        {
          params: { page, limit: state.community.postsPerPage },
          headers: { Authorization: `Bearer ${Cookies.get("token")}` },
        }
      );
      return response.data;
    }
    // Return empty result if no more pages
    return {
      currentPage: page,
      totalPages: state.community.myPostsTotalPages,
      totalPosts: state.community.myPostsTotalCount,
      posts: [],
    };
  }
);

// Fetch all posts with pagination
export const fetchPosts = createAsyncThunk(
  "community/fetchPosts",
  async (page = 1, { getState }) => {
    const state = getState();
    // Only fetch if there are more pages or we're explicitly fetching page 1
    if (page === 1 || page <= state.community.totalPages) {
      const response = await axios.get(
        `https://futureforge-iota.vercel.app/api/v1/community/posts`,
        {
          params: { page, limit: state.community.postsPerPage },
          headers: { Authorization: `Bearer ${Cookies.get("token")}` },
        }
      );
      return response.data;
    }
    // Return empty result if no more pages
    return {
      currentPage: page,
      totalPages: state.community.totalPages,
      totalPosts: state.community.totalPosts,
      posts: [],
    };
  }
);

// Fetch a single post
export const fetchPostById = createAsyncThunk(
  "community/fetchPostById",
  async (postId) => {
    const response = await axios.get(
      `https://futureforge-iota.vercel.app/api/v1/community/posts/${postId}`,
      {
        headers: { Authorization: `Bearer ${Cookies.get("token")}` },
      }
    );
    return response.data;
  }
);

// Create a new post
export const createPost = createAsyncThunk(
  "community/createPost",
  async (postData, { rejectWithValue }) => {
    const response = await axios.post(
      "https://futureforge-iota.vercel.app/api/v1/community/newpost",
      postData,
      {
        headers: { Authorization: `Bearer ${Cookies.get("token")}` },
      }
    );
    return response.data;
  }
);

// Delete a post
export const deletePost = createAsyncThunk(
  "community/deletePost",
  async (postId) => {
    await axios.delete(
      `https://futureforge-iota.vercel.app/api/v1/community/post/${postId}`,
      {
        headers: { Authorization: `Bearer ${Cookies.get("token")}` },
      }
    );
    return postId;
  }
);

// Like a post
export const likePost = createAsyncThunk(
  "community/likePost",
  async (postId) => {
    const response = await axios.post(
      `https://futureforge-iota.vercel.app/api/v1/community/likes/post/${postId}`,
      {},
      { headers: { Authorization: `Bearer ${Cookies.get("token")}` } }
    );
    return { postId, userHasLiked: response.data.userHasLiked };
  }
);

export const fetchPostLikes = createAsyncThunk(
  "community/fetchPostLikes",
  async (postId) => {
    const response = await axios.get(
      `https://futureforge-iota.vercel.app/api/v1/community/posts/${postId}/likes`,
      {
        headers: { Authorization: `Bearer ${Cookies.get("token")}` },
      }
    );
    return { postId, likesData: response.data };
  }
);

// Fetch comments
export const fetchComments = createAsyncThunk(
  "community/fetchComments",
  async (postId) => {
    const response = await axios.get(
      `https://futureforge-iota.vercel.app/api/v1/community/posts/${postId}/comments`,
      {
        headers: { Authorization: `Bearer ${Cookies.get("token")}` },
      }
    );
    return { postId, comments: response.data };
  }
);

// Add a comment
export const addComment = createAsyncThunk(
  "community/addComment",
  async ({ postId, message }) => {
    const response = await axios.post(
      `https://futureforge-iota.vercel.app/api/v1/community/${postId}/comments`,
      { message },
      {
        headers: { Authorization: `Bearer ${Cookies.get("token")}` },
      }
    );
    return { postId, comment: response.data };
  }
);

// Reply to a comment
export const replyToComment = createAsyncThunk(
  "community/replyToComment",
  async ({ commentId, message }) => {
    const response = await axios.post(
      `https://futureforge-iota.vercel.app/api/v1/community/reply/${commentId}`,
      { message },
      {
        headers: { Authorization: `Bearer ${Cookies.get("token")}` },
      }
    );
    return response.data;
  }
);

const communitySlice = createSlice({
  name: "community",
  initialState,
  reducers: {
    resetPagination: (state) => {
      state.currentPage = 1;
      state.hasMore = true;
      state.posts = [];
    },
    resetMyPostsPagination: (state) => {
      state.myPostsCurrentPage = 1;
      state.hasMoreMyPosts = true;
      state.myPosts = [];
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle fetchMyPosts
      .addCase(fetchMyPosts.pending, (state) => {
        state.myPostsStatus = "loading";
      })
      .addCase(fetchMyPosts.fulfilled, (state, action) => {
        state.myPostsStatus = "succeeded";

        // Extract data from the response
        const { currentPage, totalPages, totalPosts, posts } = action.payload;

        // If page is 1, replace posts, otherwise append
        if (currentPage === 1) {
          state.myPosts = posts;
        } else {
          // Ensure state.myPosts is an array before concatenating
          if (!Array.isArray(state.myPosts)) {
            state.myPosts = [];
          }

          // Append new posts and filter out duplicates by id
          const existingIds = new Set(state.myPosts.map((post) => post.id));
          const uniqueNewPosts = posts.filter(
            (post) => !existingIds.has(post.id)
          );
          state.myPosts = [...state.myPosts, ...uniqueNewPosts];
        }

        // Update pagination info
        state.myPostsCurrentPage = currentPage;
        state.myPostsTotalPages = totalPages;
        state.myPostsTotalCount = totalPosts;
        state.hasMoreMyPosts = currentPage < totalPages;
      })
      .addCase(fetchMyPosts.rejected, (state, action) => {
        state.myPostsStatus = "failed";
        state.myPostsError = action.error.message;
      })

      // Handle fetchPosts
      .addCase(fetchPosts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = "succeeded";

        // Extract data from the response
        const { currentPage, totalPages, totalPosts, posts } = action.payload;

        // If page is 1, replace posts, otherwise append
        if (currentPage === 1) {
          state.posts = posts;
        } else {
          // Ensure state.posts is an array before concatenating
          if (!Array.isArray(state.posts)) {
            state.posts = [];
          }

          // Append new posts and filter out duplicates by id
          const existingIds = new Set(state.posts.map((post) => post.id));
          const uniqueNewPosts = posts.filter(
            (post) => !existingIds.has(post.id)
          );
          state.posts = [...state.posts, ...uniqueNewPosts];
        }

        // Update pagination info
        state.currentPage = currentPage;
        state.totalPages = totalPages;
        state.totalPosts = totalPosts;
        state.hasMore = currentPage < totalPages;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      // Handle fetchPostById
      .addCase(fetchPostById.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPostById.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.postDetails = action.payload;
      })
      .addCase(fetchPostById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      // Handle createPost
      .addCase(createPost.fulfilled, (state, action) => {
        // Add to both global posts and my posts
        if (!Array.isArray(state.posts)) {
          state.posts = [];
        }
        state.posts.unshift(action.payload); // Add new post to the beginning

        if (!Array.isArray(state.myPosts)) {
          state.myPosts = [];
        }
        state.myPosts.unshift(action.payload);

        // Update counts
        state.totalPosts += 1;
        state.myPostsTotalCount += 1;
      })

      // Handle deletePost
      .addCase(deletePost.fulfilled, (state, action) => {
        if (Array.isArray(state.myPosts)) {
          state.myPosts = state.myPosts.filter(
            (post) => post.id !== action.payload
          );
          state.myPostsTotalCount = Math.max(0, state.myPostsTotalCount - 1);
        }
        if (Array.isArray(state.posts)) {
          state.posts = state.posts.filter(
            (post) => post.id !== action.payload
          );
          state.totalPosts = Math.max(0, state.totalPosts - 1);
        }
      })

      // Handle likePost
      .addCase(likePost.fulfilled, (state, action) => {
        // Update in main posts list
        if (Array.isArray(state.posts)) {
          const post = state.posts.find((p) => p.id === action.payload.postId);
          if (post) {
            post.userHasLiked = action.payload.userHasLiked;
          }
        }

        // Update in my posts list
        if (Array.isArray(state.myPosts)) {
          const myPost = state.myPosts.find(
            (p) => p.id === action.payload.postId
          );
          if (myPost) {
            myPost.userHasLiked = action.payload.userHasLiked;
          }
        }

        // Update in post details if viewing that post
        if (
          state.postDetails &&
          state.postDetails.id === action.payload.postId
        ) {
          state.postDetails.userHasLiked = action.payload.userHasLiked;
        }
      })

      // Handle fetchPostLikes
      .addCase(fetchPostLikes.fulfilled, (state, action) => {
        if (
          state.postDetails &&
          state.postDetails.id === action.payload.postId
        ) {
          state.postDetails.likedUsers = action.payload.likesData.likedUsers;
          state.postDetails.userHasLiked =
            action.payload.likesData.userHasLiked;
        }
      })

      // Handle fetchComments
      .addCase(fetchComments.fulfilled, (state, action) => {
        // Update comments in main posts list
        if (Array.isArray(state.posts)) {
          const post = state.posts.find((p) => p.id === action.payload.postId);
          if (post) post.comments = action.payload.comments;
        }

        // Update comments in my posts list
        if (Array.isArray(state.myPosts)) {
          const myPost = state.myPosts.find(
            (p) => p.id === action.payload.postId
          );
          if (myPost) myPost.comments = action.payload.comments;
        }

        // Update in post details if viewing that post
        if (
          state.postDetails &&
          state.postDetails.id === action.payload.postId
        ) {
          state.postDetails.comments = action.payload.comments;
        }
      })

      // Handle addComment
      .addCase(addComment.fulfilled, (state, action) => {
        // Update in main posts list
        if (Array.isArray(state.posts)) {
          const post = state.posts.find((p) => p.id === action.payload.postId);
          if (post) {
            post.comments = post.comments || [];
            post.comments.push(action.payload.comment);
          }
        }

        // Update in my posts list
        if (Array.isArray(state.myPosts)) {
          const myPost = state.myPosts.find(
            (p) => p.id === action.payload.postId
          );
          if (myPost) {
            myPost.comments = myPost.comments || [];
            myPost.comments.push(action.payload.comment);
          }
        }

        // Update in post details if viewing that post
        if (
          state.postDetails &&
          state.postDetails.id === action.payload.postId
        ) {
          state.postDetails.comments = state.postDetails.comments || [];
          state.postDetails.comments.push(action.payload.comment);
        }
      });
  },
});

export const { resetPagination, resetMyPostsPagination } =
  communitySlice.actions;

export default communitySlice.reducer;

// General post selectors
export const selectPosts = (state) => state.community.posts || [];
export const selectCommunityStatus = (state) => state.community.status;
export const selectCommunityError = (state) => state.community.error;
export const selectHasMore = (state) => state.community.hasMore;
export const selectCurrentPage = (state) => state.community.currentPage;
export const selectTotalPages = (state) => state.community.totalPages;
export const selectTotalPosts = (state) => state.community.totalPosts;
export const selectPostDetails = (state) => state.community.postDetails;
// My posts selectors
export const selectMyPosts = (state) => state.community.myPosts || [];
export const selectMyPostsStatus = (state) => state.community.myPostsStatus;
export const selectMyPostsError = (state) => state.community.myPostsError;
export const selectHasMoreMyPosts = (state) => state.community.hasMoreMyPosts;
