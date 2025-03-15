import React, { useEffect, useState } from 'react';
import { SideNavBar } from "./SideNavbar";
import { useDispatch, useSelector } from 'react-redux';
import TeacherCommunityHeader from './teachercommunityHeader';
import { Comment } from './comment';
import { useParams } from 'react-router-dom';
import { likePost, fetchPostLikes, addComment, fetchPostById, selectTeacherPostDetails, selectTeacherCommunityError, selectTeacherCommunityStatus } from '../store/slices/teachercommunityslice';
import { PaperAirplaneIcon } from '@heroicons/react/16/solid'
import PostInteractions from './postInteraction';
import DOMPurify from 'dompurify';

import TeacherPostInteractions from './teacherpostInteraction';
import { TeacherSideNavBar } from './teacherSideNavbar';

function TeacherArticle() {
    const { id } = useParams();
    const dispatch = useDispatch();
    //const postDetails = useSelector(selectPostDetails);
    const postStatus = useSelector(selectTeacherCommunityStatus);
    const error = useSelector(selectTeacherCommunityError);
    const fullState = useSelector(state => state);
    console.log('Full Redux State:', fullState);
    const [commentInput, setCommentInput] = useState("");

    const postDetails = useSelector(selectTeacherPostDetails);
    console.log('PostDetails from selector:', postDetails);
    const status = useSelector(selectTeacherCommunityStatus);

    const [isLiking, setIsLiking] = useState(false);

    const handleLikeToggle = async () => {
        if (isLiking) return; // Prevent multiple clicks while processing

        try {
            setIsLiking(true);
            // The likePost action will handle both like and unlike
            await dispatch(likePost(id)).unwrap();
            // Fetch the updated post details to get the new like status
            await dispatch(fetchPostById(id));
        } catch (error) {
            console.error('Failed to toggle like:', error);
        } finally {
            setIsLiking(false);
        }
    };

    const handleAddComment = async () => {
        if (commentInput.trim()) {
            try {
                await dispatch(addComment({ postId: id, comment: commentInput })).unwrap();
                setCommentInput("");
                // Fetch updated post details to show new comment
                await dispatch(fetchPostById(id));
            } catch (error) {
                console.error('Failed to add comment:', error);
            }
        }
    };

    useEffect(() => {
        if (id) {
            dispatch(fetchPostById(id));
        }
    }, [dispatch, id]);
    if (postStatus === 'loading') {
        return <div>Loading...</div>;
    }
    console.log("PostDetails:", postDetails)
    if (postStatus === 'failed') {
        return <div>Error: {error}</div>;
    }
    if (!postDetails) {
        return <div>Loading post details...</div>;
    }
    return (
        <div className="bg-gradient-to-l object-fill min-h-screen">

            <TeacherSideNavBar />

            {/* Main Content */}
            <div className="ml-0 min-h-screen bg-gradient-to-b from-gray-50 to-white pb-16 md:pb-0">
                <TeacherCommunityHeader></TeacherCommunityHeader>

                {/* Main Content Area */}
                <div className="py-2 px-8 pb-12 max-w-5xl mx-auto">
                    {/* Title Card */}
                    <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-8">
                        <div className="p-8">
                            <div className="flex items-center gap-4 mb-6">

                                <div>
                                    <h2 className="text-lg font-medium text-gray-900">Community Post</h2>
                                    <p className="text-sm text-gray-500">
                                        Posted {postDetails?.createdAt ? new Date(postDetails.createdAt).toLocaleString() : "Some time ago"}
                                    </p>

                                </div>
                            </div>

                            <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4">
                                {postDetails.title}
                            </h1>

                            <div className="flex gap-2 mb-6">
                                {/* Check if the topic exists */}
                                {postDetails.topic ? (
                                    // Split the topic string if multiple topics are present
                                    postDetails.topic.split(",").map((topic, index) => (
                                        <span
                                            key={index}
                                            className="px-3 py-1 bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-700 rounded-full text-sm"
                                        >
                                            {topic.trim()} {/* trim to remove any extra spaces */}
                                        </span>
                                    ))
                                ) : (
                                    <span className="px-3 py-1 bg-gray-200 text-gray-700 rounded-full text-sm">No Topic</span>
                                )}
                            </div>
                            <div className='prose prose-indigo max-w-none' dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(postDetails.content) }} />

                        </div>


                        <TeacherPostInteractions postDetails={postDetails} status={status} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TeacherArticle;