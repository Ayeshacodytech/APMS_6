import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ArticleOutline from "../components/articleCard";
import CommunityHeader from "../components/communityHeader";
import { SideNavBar } from "../components/SideNavbar";
import {
  fetchPosts,
  selectCommunityError,
  selectCommunityStatus,
  selectPosts,
} from "../store/slices/communitySlice";

function Communityhome() {
  const dispatch = useDispatch();
  const posts = useSelector(selectPosts);
  const status = useSelector(selectCommunityStatus);
  const error = useSelector(selectCommunityError);
  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchPosts());
    }
  }, [status, dispatch]);

  console.log("Posts data:", posts); // Debugging

  return (
    <div className="grid grid-cols-6 bg-gradient-to-l object-fill min-h-screen">
      <div className="col-span-1">
        <SideNavBar />
      </div>

      {/* Main Content */}
      <div className="col-span-5">
        <div className="pl-8 pr-1">
          <CommunityHeader />

          {/* Main Content Area */}
          <div className="py-2 px-8 pb-12 max-w-5xl mx-auto">
            {status === "loading" && <p>Loading posts...</p>}
            {status === "failed" && <p className="text-red-500">{error}</p>}

            {/* Debugging */}
            {console.log("Status:", status)}
            {console.log("Posts:", posts)}

            {/* Render Posts with Safe Check */}
            {status === "succeeded" && posts.posts?.length > 0
              ? posts.posts.map((post) => (
                  <ArticleOutline key={post.id} post={post} />
                ))
              : status === "succeeded" && <p>No posts available.</p>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Communityhome;
