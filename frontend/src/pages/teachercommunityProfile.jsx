import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CommunityHeader from '../components/communityHeader';
import MyArticle from '../components/myArticle';
import { SideNavBar } from '../components/SideNavbar';
import { fetchMyPosts } from '../store/slices/teachercommunityslice'; // Import your action
import { TeacherSideNavBar } from '../components/teacherSideNavbar';
import { TeacherCommunityHeader } from '../components/teachercommunityHeader';
import { TeacherMyArticle } from '../components/teachermyArticle';

function TeacherCommunityProfile() {
    const dispatch = useDispatch();

    // Fetch myPosts from Redux store
    const { myPosts, status, error } = useSelector((state) => state.teachercommunity);
    console.log("My Posts:", myPosts);
    useEffect(() => {
        // Dispatch the action to fetch my posts when the component mounts
        dispatch(fetchMyPosts());
    }, [dispatch]);
    console.log("My Posts:", myPosts);
    // Display loading or error state
    if (status === 'loading') {
        return <div>Loading...</div>;
    }

    if (status === 'failed') {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="bg-gradient-to-l object-fill min-h-screen">
            <TeacherSideNavBar />

            {/* Main Content */}
            <div className="ml-0 min-h-screen bg-gradient-to-b from-gray-50 to-white pb-16 md:pb-0">
                <TeacherCommunityHeader />

                {/* Main Content Area */}
                <div className="py-2 px-8 pb-12 max-w-5xl mx-auto">
                    {/* Title Card */}
                    {myPosts && myPosts.length > 0 ? (
                        myPosts.map((post) => (
                            <TeacherMyArticle key={post.id} post={post} />
                        ))
                    ) : (
                        <p>No posts available</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default TeacherCommunityProfile;
