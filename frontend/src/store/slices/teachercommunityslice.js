import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";

const initialState = {
    posts: [],
    myPosts: [],
    postDetails: null,
    status: "idle",
    error: null,
};

const token = Cookies.get("token");
//Fetch my posts
export const fetchMyPosts = createAsyncThunk("teachercommunity/fetchMyPosts", async () => {
    const response = await axios.get("http://localhost:3000/api/v1/teacher/community/myposts", {
        headers: { Authorization: `Bearer ${token}` },
    });
    console.log("myposts:",response.data)
    return response.data;
});
// Fetch all posts
export const fetchPosts = createAsyncThunk("teachercommunity/fetchPosts", async () => {
    const response = await axios.get("http://localhost:3000/api/v1/teacher/community/posts", {
        headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
});

// Fetch a single post
export const fetchPostById = createAsyncThunk("teachercommunity/fetchPostById", async (postId) => {
    const response = await axios.get(`http://localhost:3000/api/v1/teacher/community/posts/${postId}`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    console.log("post deta:",response.data)
    return response.data;
    
});

// Create a new post
export const createPost = createAsyncThunk("teachercommunity/createPost", async (postData, { rejectWithValue }) => {
    const response = await axios.post("http://localhost:3000/api/v1/teacher/community/newpost", postData, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
});

// Delete a post
export const deletePost = createAsyncThunk("teachercommunity/deletePost", async (postId) => {
    await axios.delete(`http://localhost:3000/api/v1/teacher/community/post/${postId}`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return postId;
});

// Like a post (Fixed API endpoint)
export const likePost = createAsyncThunk("teachercommunity/likePost", async (postId) => {
    const response = await axios.post(
        `http://localhost:3000/api/v1/teacher/community/likes/post/${postId}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
    );
    return { postId, userHasLiked: response.data.userHasLiked };
});
export const fetchPostLikes = createAsyncThunk("teachercommunity/fetchPostLikes", async (postId) => {
    const response = await axios.get(`http://localhost:3000/api/v1/teacher/community/posts/${postId}/likes`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return { postId, likesData: response.data };
});

// Fetch comments
export const fetchComments = createAsyncThunk("teachercommunity/fetchComments", async (postId) => {
    const response = await axios.get(`http://localhost:3000/api/v1/teacher/community/posts/${postId}/comments`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return { postId, comments: response.data };
});

// Add a comment
export const addComment = createAsyncThunk("teachercommunity/addComment", async ({ postId, message }) => {
    const response = await axios.post(`http://localhost:3000/api/v1/teacher/community/${postId}/comments`, { message }, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return { postId, comment: response.data };
});

// Reply to a comment
export const replyToComment = createAsyncThunk("teachercommunity/replyToComment", async ({ commentId, message }) => {
    const response = await axios.post(`http://localhost:3000/api/v1/teacher/community/reply/${commentId}`, { message }, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
});

const teachercommunitySlice = createSlice({
    name: "teachercommunity",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchMyPosts.pending, (state) => { state.status = "loading"; })
            .addCase(fetchMyPosts.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.myPosts = action.payload.posts; // Update posts state with the fetched posts
            })
            .addCase(fetchMyPosts.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            })
            .addCase(fetchPosts.pending, (state) => { state.status = "loading"; })
            .addCase(fetchPosts.fulfilled, (state, action) => {
                state.status = "succeeded";
                // Ensure state.posts is always an array
                state.posts = action.payload ;
            })
            .addCase(fetchPosts.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            })
            .addCase(fetchPostById.pending, (state) => { state.status = "loading"; })
            .addCase(fetchPostById.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.postDetails = action.payload;
            })
            .addCase(fetchPostById.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            })
            .addCase(createPost.fulfilled, (state, action) => {
                // Ensure state.posts is an array before pushing
                if (!Array.isArray(state.posts)) {
                    state.posts = [];
                }
                state.posts.push(action.payload);
            })
            .addCase(deletePost.fulfilled, (state, action) => {
                if (Array.isArray(state.myPosts)) {
                    state.myPosts = state.myPosts.filter(post => post.id !== action.payload);
                }
                if (Array.isArray(state.posts)) {
                    state.posts = state.posts.filter(post => post.id !== action.payload);
                }
            })
            .addCase(likePost.fulfilled, (state, action) => {
                if (!Array.isArray(state.posts)) {
                    console.error("state.posts is not an array!", state.posts);
                    state.posts = []; // Reset to an array to prevent further errors
                    return;
                }
            
                const post = state.posts.find(p => p.id === action.payload.postId);
                if (post) {
                    post.userHasLiked = action.payload.userHasLiked;
                } else {
                    console.warn("Post not found:", action.payload.postId);
                }
            })
            
            .addCase(fetchPostLikes.fulfilled, (state, action) => {
                if (state.postDetails && state.postDetails.id === action.payload.postId) {
                    state.postDetails.likedUsers = action.payload.likesData.likedUsers;
                    state.postDetails.userHasLiked = action.payload.likesData.userHasLiked;
                }
            })
            .addCase(fetchComments.fulfilled, (state, action) => {
                if (!Array.isArray(state.posts)) {
                    state.posts = [];
                    return;
                }
                
                const post = state.posts.find(p => p.id === action.payload.postId);
                if (post) post.comments = action.payload.comments;
            })
            .addCase(addComment.fulfilled, (state, action) => {
                if (!Array.isArray(state.posts)) {
                    console.error("posts is not an array!", state.posts);
                    state.posts = []; // Ensure it's an array to avoid errors
                    return;
                }

                const post = state.posts.find(p => p.id === action.payload.postId);
                if (post) {
                    post.comments = post.comments || []; // Ensure comments array exists
                    post.comments.push(action.payload.comment);
                } else {
                    console.warn("Post not found for comment:", action.payload.postId);
                }
            })
    },
});

export default teachercommunitySlice.reducer;

export const selectTeacherPosts = (state) => state.teachercommunity.posts || [];
export const selectTeacherPostDetails = (state) => state.teachercommunity.postDetails;
export const selectTeacherCommunityStatus = (state) => state.teachercommunity.status;
export const selectTeacherCommunityError = (state) => state.teachercommunity.error;