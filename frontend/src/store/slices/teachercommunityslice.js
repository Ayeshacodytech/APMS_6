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

const token = Cookies.get("token");
//Fetch my posts
export const fetchMyPosts = createAsyncThunk(
  "teachercommunity/fetchMyPosts",
  async (page = 1, { getState }) => {
    const state = getState();
    if (page === 1 || page <= state.teachercommunity.myPostsTotalPages) {
      const response = await axios.get(
        "https://futureforge-iota.vercel.app/api/v1/teacher/community/myposts",
        {
          params: { page, limit: state.teachercommunity.postsPerPage },
          headers: { Authorization: `Bearer ${Cookies.get("token")}` },
        }
      );
      return response.data;
    }

    return {
      currentPage: page,
      totalPages: state.teachercommunity.myPostsTotalPages,
      totalPosts: state.teachercommunity.myPostsTotalCount,
      posts: [],
    };
  }
);
// Fetch all posts
export const fetchPosts = createAsyncThunk(
  "teachercommunity/fetchPosts",
  async (page = 1, { getState }) => {
    const state = getState();
    // Only fetch if there are more pages or we're explicitly fetching page 1
    if (page === 1 || page <= state.teachercommunity.totalPages) {
      const response = await axios.get(
        `https://futureforge-iota.vercel.app/api/v1/teacher/community/posts`,
        {
          params: { page, limit: state.teachercommunity.postsPerPage },
          headers: { Authorization: `Bearer ${Cookies.get("token")}` },
        }
      );
      console.log(response.data);
      return response.data;
    }
    // Return empty result if no more pages
    return {
      currentPage: page,
      totalPages: state.teachercommunity.totalPages,
      totalPosts: state.teachercommunity.totalPosts,
      posts: [],
    };
  }
);

// Fetch a single post
export const fetchPostById = createAsyncThunk(
  "teachercommunity/fetchPostById",
  async (postId) => {
    const response = await axios.get(
      `https://futureforge-iota.vercel.app/api/v1/teacher/community/posts/${postId}`,
      {
        headers: { Authorization: `Bearer ${Cookies.get("token")}` },
      }
    );
    console.log("post deta:", response.data);
    return response.data;
  }
);

// Create a new post
export const createPost = createAsyncThunk(
  "teachercommunity/createPost",
  async (postData, { rejectWithValue }) => {
    const response = await axios.post(
      "https://futureforge-iota.vercel.app/api/v1/teacher/community/newpost",
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
  "teachercommunity/deletePost",
  async (postId) => {
    await axios.delete(
      `https://futureforge-iota.vercel.app/api/v1/teacher/community/post/${postId}`,
      {
        headers: { Authorization: `Bearer ${Cookies.get("token")}` },
      }
    );
    return postId;
  }
);

// Like a post (Fixed API endpoint)
export const likePost = createAsyncThunk(
  "teachercommunity/likePost",
  async (postId) => {
    const response = await axios.post(
      `https://futureforge-iota.vercel.app/api/v1/teacher/community/likes/post/${postId}`,
      {},
      { headers: { Authorization: `Bearer ${Cookies.get("token")}` } }
    );
    return { postId, userHasLiked: response.data.userHasLiked };
  }
);
export const fetchPostLikes = createAsyncThunk(
  "teachercommunity/fetchPostLikes",
  async (postId) => {
    const response = await axios.get(
      `https://futureforge-iota.vercel.app/api/v1/teacher/community/posts/${postId}/likes`,
      {
        headers: { Authorization: `Bearer ${Cookies.get("token")}` },
      }
    );
    return { postId, likesData: response.data };
  }
);

// Fetch comments
export const fetchComments = createAsyncThunk(
  "teachercommunity/fetchComments",
  async (postId) => {
    const response = await axios.get(
      `https://futureforge-iota.vercel.app/api/v1/teacher/community/posts/${postId}/comments`,
      {
        headers: { Authorization: `Bearer ${Cookies.get("token")}` },
      }
    );
    return { postId, comments: response.data };
  }
);

// Add a comment
export const addComment = createAsyncThunk(
  "teachercommunity/addComment",
  async ({ postId, message }) => {
    const response = await axios.post(
      `https://futureforge-iota.vercel.app/api/v1/teacher/community/${postId}/comments`,
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
  "teachercommunity/replyToComment",
  async ({ commentId, message }) => {
    const response = await axios.post(
      `https://futureforge-iota.vercel.app/api/v1/teacher/community/reply/${commentId}`,
      { message },
      {
        headers: { Authorization: `Bearer ${Cookies.get("token")}` },
      }
    );
    return response.data;
  }
);

const teachercommunitySlice = createSlice({
  name: "teachercommunity",
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
  teachercommunitySlice.actions;
export default teachercommunitySlice.reducer;

// Selectors
export const selectTeacherPosts = (state) => state.teachercommunity.posts || [];
export const selectTeacherCommunityStatus = (state) =>
  state.teachercommunity.status;
export const selectTeacherCommunityError = (state) =>
  state.teachercommunity.error;
export const selectTeacherHasMore = (state) => state.teachercommunity.hasMore;
export const selectTeacherCurrentPage = (state) =>
  state.teachercommunity.currentPage;
export const selectTeacherTotalPages = (state) =>
  state.teachercommunity.totalPages;
export const selectTeacherTotalPosts = (state) =>
  state.teachercommunity.totalPosts;
export const selectTeacherPostDetails = (state) =>
  state.teachercommunity.postDetails;
// My posts selectTeacherors
export const selectTeacherMyPosts = (state) =>
  state.teachercommunity.myPosts || [];
export const selectTeacherMyPostsStatus = (state) =>
  state.teachercommunity.myPostsStatus;
export const selectTeacherMyPostsError = (state) =>
  state.teachercommunity.myPostsError;
export const selectTeacherHasMoreMyPosts = (state) =>
  state.teachercommunity.hasMoreMyPosts;
