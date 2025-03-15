import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { PaperAirplaneIcon } from '@heroicons/react/16/solid';
import { likePost, addComment, fetchPostById } from '../store/slices/teachercommunityslice';
import { Comment } from './comment'; // Added import for Comment component
import { replyToComment } from '../store/slices/communitySlice';
import { TeacherComment } from './teachercomment';
const TeacherPostInteractions = ({ postDetails, status }) => {
    const dispatch = useDispatch();
    const [isLiking, setIsLiking] = useState(false);
    const [commentInput, setCommentInput] = useState("");
    console.log("Post Details:", postDetails);
    const handleLikeToggle = async () => {
        if (isLiking) return;

        try {
            setIsLiking(true);
            await dispatch(likePost(postDetails.id)).unwrap();
            await dispatch(fetchPostById(postDetails.id));
        } catch (error) {
            console.error('Failed to toggle like:', error);
        } finally {
            setIsLiking(false);
        }
    };

    const handleAddComment = async () => {
        if (commentInput.trim()) {
            try {
                await dispatch(addComment({ postId: postDetails.id, message: commentInput })).unwrap();
                setCommentInput("");
                await dispatch(fetchPostById(postDetails.id));
            } catch (error) {
                console.error('Failed to add comment:', error);
            }
        }
    };

    return (
        <>
            <div className="border-t bg-gray-50">
                <div className="px-8 py-4 flex items-center gap-6">
                    <button
                        onClick={handleLikeToggle}
                        disabled={isLiking}
                        className={`flex items-center gap-2 transition-all ${postDetails?.hasLiked ? 'text-pink-500' : 'text-gray-600 hover:text-pink-500'}`}
                    >
                        {postDetails?.hasLiked ? (
                            <svg width="28px" height="28px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#000000">
                                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                                <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                                <g id="SVGRepo_iconCarrier">
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M15.9 4.5C15.9 3 14.418 2 13.26 2c-.806 0-.869.612-.993 1.82-.055.53-.121 1.174-.267 1.93-.386 2.002-1.72 4.56-2.996 5.325V17C9 19.25 9.75 20 13 20h3.773c2.176 0 2.703-1.433 2.899-1.964l.013-.036c.114-.306.358-.547.638-.82.31-.306.664-.653.927-1.18.311-.623.27-1.177.233-1.67-.023-.299-.044-.575.017-.83.064-.27.146-.475.225-.671.143-.356.275-.686.275-1.329 0-1.5-.748-2.498-2.315-2.498H15.5S15.9 6 15.9 4.5zM5.5 10A1.5 1.5 0 0 0 4 11.5v7a1.5 1.5 0 0 0 3 0v-7A1.5 1.5 0 0 0 5.5 10z" fill="#000000"></path>
                                </g>
                            </svg>
                        ) : (
                            <svg width="28px" height="28px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#000000">
                                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                                <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                                <g id="SVGRepo_iconCarrier">
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M15.9 4.5C15.9 3 14.418 2 13.26 2c-.806 0-.869.612-.993 1.82-.055.53-.121 1.174-.267 1.93-.386 2.002-1.72 4.56-2.996 5.325V17C9 19.25 9.75 20 13 20h3.773c2.176 0 2.703-1.433 2.899-1.964l.013-.036c.114-.306.358-.547.638-.82.31-.306.664-.653.927-1.18.311-.623.27-1.177.233-1.67-.023-.299-.044-.575.017-.83.064-.27.146-.475.225-.671.143-.356.275-.686.275-1.329 0-1.5-.748-2.498-2.315-2.498H15.5S15.9 6 15.9 4.5zM5.5 10A1.5 1.5 0 0 0 4 11.5v7a1.5 1.5 0 0 0 3 0v-7A1.5 1.5 0 0 0 5.5 10z" fill="#ffffff"></path>
                                </g>
                            </svg>
                        )}
                        <span className="font-medium">{postDetails.PostLike?.length || 0}</span>
                    </button>

                    <button className="flex items-center gap-2 text-gray-600 hover:text-indigo-500 transition-all">
                        <svg width="28px" height="28px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                            <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                            <g id="SVGRepo_iconCarrier">
                                <path d="M10.968 18.769C15.495 18.107 19 14.434 19 9.938a8.49 8.49 0 0 0-.216-1.912C20.718 9.178 22 11.188 22 13.475a6.1 6.1 0 0 1-1.113 3.506c.06.949.396 1.781 1.01 2.497a.43.43 0 0 1-.36.71c-1.367-.111-2.485-.426-3.354-.945A7.434 7.434 0 0 1 15 19.95a7.36 7.36 0 0 1-4.032-1.181z" fill="#000000"></path>
                                <path d="M7.625 16.657c.6.142 1.228.218 1.875.218 4.142 0 7.5-3.106 7.5-6.938C17 6.107 13.642 3 9.5 3 5.358 3 2 6.106 2 9.938c0 1.946.866 3.705 2.262 4.965a4.406 4.406 0 0 1-1.045 2.29.46.46 0 0 0 .386.76c1.7-.138 3.041-.57 4.022-1.296z" fill="#000000"></path>
                            </g>
                        </svg>
                        <span className="font-medium">{postDetails.comments?.length || 0}</span>
                    </button>
                </div>
            </div>

            <div className="px-4">
                <label htmlFor="comment" className="block text-sm/6 font-medium text-gray-900">
                    Add a Comment
                </label>
                <div className="mt-2">
                    <div className="flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 has-[input:focus-within]:outline-2 has-[input:focus-within]:-outline-offset-2 has-[input:focus-within]:outline-indigo-600">
                        <input
                            id="comment"
                            name="comment"
                            type="text"
                            value={commentInput}
                            onChange={(e) => setCommentInput(e.target.value)}
                            placeholder="Write a comment..."
                            className="block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
                        />
                        <button
                            onClick={handleAddComment}
                            disabled={status === "loading"}
                            type="submit"
                            className="ml-2 shrink-0 rounded-md bg-gradient-to-r from-indigo-600 to-purple-600 p-2 text-white hover:bg-indigo-700 focus:outline-none"
                        >
                            <PaperAirplaneIcon className="size-5 sm:size-4" aria-hidden="true" />
                        </button>
                    </div>
                </div>
            </div>

            <div className="px-4 py-4">
                {postDetails.comments && postDetails.comments.map((comment) => (
                    console.log("c:",comment),
                    <TeacherComment key={comment.id} comment={comment} postDetails={postDetails} />
                ))}
            </div>
        </>
    );
};

export default TeacherPostInteractions;