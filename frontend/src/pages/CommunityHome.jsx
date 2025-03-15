import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CommunityHeader from '../components/communityHeader';
import { SideNavBar } from '../components/SideNavbar';
import { fetchPosts, selectCommunityError, selectCommunityStatus, selectPosts } from '../store/slices/communitySlice';
import ArticleCard from '../components/articleCard';

function Communityhome() {
    const dispatch = useDispatch();
    const posts = useSelector(selectPosts);
    const status = useSelector(selectCommunityStatus);
    const error = useSelector(selectCommunityError);
    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchPosts());
        }
    }, [status, dispatch]);
    useEffect(() => {
        dispatch(fetchPosts());
    }, [dispatch]);
    console.log("Posts data:", posts);  // Debugging

    return (
        <div className="bg-gradient-to-l object-fill min-h-screen">

            <SideNavBar />

            <div className="ml-0 min-h-screen bg-gradient-to-b from-gray-50 to-white pb-16 md:pb-0">
                <CommunityHeader />

                {/* Main Content Area */}
                <div className="py-2 px-4 sm:px-6 lg:px-8 pb-12 max-w-screen-lg mx-auto">
                    {status === "loading" && <p>Loading posts...</p>}
                    {status === "failed" && <p className="text-red-500">{error}</p>}

                    {/* Debugging */}
                    {console.log("Status:", status)}
                    {console.log("Posts:", posts)}

                    {/* Render Posts with Safe Check */}
                    {status === "succeeded" && posts.posts?.length > 0 ? (
                        posts.posts.map((post) => <ArticleCard key={post.id} post={post} />)
                    ) : (
                        status === "succeeded" && <p>No posts available.</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Communityhome;
