import React, { useCallback, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CommunityHeader from '../components/communityHeader';
import MyArticle from '../components/myArticle';
import { SideNavBar } from '../components/SideNavbar';
import { fetchMyPosts, selectTeacherCommunityError, selectTeacherCurrentPage, resetMyPostsPagination, selectTeacherHasMoreMyPosts, selectTeacherMyPostsError, selectTeacherMyPostsStatus } from '../store/slices/teachercommunityslice'; // Import your action
import { TeacherSideNavBar } from '../components/teacherSideNavbar';
import { TeacherCommunityHeader } from '../components/teachercommunityHeader';
import { TeacherMyArticle } from '../components/teachermyArticle';

function TeacherCommunityProfile() {
    const dispatch = useDispatch();
    const observer = useRef();
    // Fetch myPosts from Redux store
    const { myPosts, status, error } = useSelector((state) => state.teachercommunity);
    console.log("My Posts:", myPosts);
    const hasMoreMyPosts = useSelector(selectTeacherHasMoreMyPosts);
    const myPostsError = useSelector(selectTeacherMyPostsError);
    const myPostsStatus = useSelector(selectTeacherMyPostsError);
    const currentPage = useSelector(selectTeacherCurrentPage);
    useEffect(() => {
        dispatch(resetMyPostsPagination());
        dispatch(fetchMyPosts(1));
    }, [dispatch]);
    console.log("My Posts:", myPosts);
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
            <TeacherSideNavBar />

            {/* Main Content */}
            <div className="ml-0 min-h-screen bg-gradient-to-b from-gray-50 to-white pb-16 md:pb-0">
                <TeacherCommunityHeader />

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
                                        <TeacherMyArticle post={post} />
                                    </div>
                                );
                            } else {
                                return <TeacherMyArticle key={post.id} post={post} />;
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

export default TeacherCommunityProfile;
