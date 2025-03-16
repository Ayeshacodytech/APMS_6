import React, { useCallback, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CommunityHeader from '../components/communityHeader';
import MyArticle from '../components/myArticle';
import { SideNavBar } from '../components/SideNavbar';
import { selectCurrentPage, fetchMyPosts, resetMyPostsPagination, selectHasMoreMyPosts, selectMyPostsError, selectMyPostsStatus } from '../store/slices/communitySlice'; // Import your action

function CommunityProfile() {
    const dispatch = useDispatch();
    const observer = useRef();
    // Fetch myPosts from Redux store
    const { myPosts, status, error } = useSelector((state) => state.community);
    console.log("My Posts:", myPosts);
    const hasMoreMyPosts = useSelector(selectHasMoreMyPosts);
    const myPostsError = useSelector(selectMyPostsError);
    const myPostsStatus = useSelector(selectMyPostsStatus);
    const currentPage = useSelector(selectCurrentPage);
    useEffect(() => {
        dispatch(resetMyPostsPagination());
        dispatch(fetchMyPosts(1));
    }, [dispatch]);
    const lastmyPostRef = useCallback(node => {
        if (status === "loading") return;
        if (observer.current) observer.current.disconnect();
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && hasMoreMyPosts) {
                const nextPage = currentPage + 1;
                dispatch(fetchMyPosts(nextPage));
            }
        }, { rootMargin: '100px' });

        // Observe the last post element
        if (node) observer.current.observe(node);
    }, [status, hasMoreMyPosts, currentPage, dispatch])
    // Display loading or error state

    return (
        <div className="bg-gradient-to-l object-fill min-h-screen">
            <SideNavBar />

            {/* Main Content */}
            <div className="ml-0 min-h-screen bg-gradient-to-b from-gray-50 to-white pb-16 md:pb-0">
                <CommunityHeader />

                {/* Main Content Area */}
                <div className="py-2 px-8 pb-12 max-w-5xl mx-auto">
                    {/* Title Card */}
                    {status === "failed" && <p className="text-red-500">{error}</p>}

                    {/* Posts */}
                    {Array.isArray(myPosts) && myPosts.length > 0 ? (
                        myPosts.map((post, index) => {
                            // If this is the last post, attach the ref for infinite scroll
                            if (index === myPosts.length - 1) {
                                return (
                                    <div ref={lastmyPostRef} key={post.id}>
                                        <MyArticle post={post} />
                                    </div>
                                );
                            } else {
                                return <MyArticle key={post.id} post={post} />;
                            }
                        })
                    ) : (
                        <p>No posts available</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default CommunityProfile;
