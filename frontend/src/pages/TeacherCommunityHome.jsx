import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ArticleOutline from '../components/articleCard';
import CommunityHeader from '../components/communityHeader';
import { SideNavBar } from '../components/SideNavbar';
import { fetchPosts, selectTeacherCommunityError, selectTeacherCommunityStatus, selectTeacherPosts } from '../store/slices/teachercommunityslice';
import { TeacherSideNavBar } from '../components/teacherSideNavbar';
import { TeacherCommunityHeader } from '../components/teachercommunityHeader';
import TeacherArticleCard from '../components/teacherarticleCard';

function TeacherCommunityhome() {
    const dispatch = useDispatch();
    const posts = useSelector(selectTeacherPosts);
    const status = useSelector(selectTeacherCommunityStatus);
    const error = useSelector(selectTeacherCommunityError);
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

            <TeacherSideNavBar />

            <div className="ml-0 min-h-screen bg-gradient-to-b from-gray-50 to-white pb-16 md:pb-0">
                <TeacherCommunityHeader />

                {/* Main Content Area */}
                <div className="py-2 px-4 sm:px-6 lg:px-8 pb-12 max-w-screen-lg mx-auto">
                    {status === "loading" && <p>Loading posts...</p>}
                    {status === "failed" && <p className="text-red-500">{error}</p>}

                    {/* Debugging */}
                    {console.log("Status:", status)}
                    {console.log("Posts:", posts)}

                    {/* Render Posts with Safe Check */}
                    {status === "succeeded" && posts.posts?.length > 0 ? (
                        posts.posts.map((post) => <TeacherArticleCard key={post.id} post={post} />)
                    ) : (
                        status === "succeeded" && <p>No posts available.</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default TeacherCommunityhome;
