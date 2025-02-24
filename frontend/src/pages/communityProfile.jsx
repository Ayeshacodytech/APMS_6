import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CommunityHeader from "../components/communityHeader";
import MyArticle from "../components/myArticle";
import { SideNavBar } from "../components/SideNavbar";
import { fetchMyPosts } from "../store/slices/communitySlice"; // Import your action

function CommunityProfile() {
  const dispatch = useDispatch();

  // Fetch myPosts from Redux store
  const { myPosts, status, error } = useSelector((state) => state.community);

  useEffect(() => {
    // Dispatch the action to fetch my posts when the component mounts
    dispatch(fetchMyPosts());
  }, [dispatch]);

  // Display loading or error state
  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "failed") {
    return <div>Error: {error}</div>;
  }

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
            {/* Title Card */}
            {myPosts && myPosts.length > 0 ? (
              myPosts.map((post) => <MyArticle key={post.id} post={post} />)
            ) : (
              <p>No posts available</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CommunityProfile;
