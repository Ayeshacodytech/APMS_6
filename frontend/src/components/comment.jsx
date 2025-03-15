import { useState } from "react";
import { useDispatch } from "react-redux";
import Reply from "./reply";
import { PaperAirplaneIcon } from '@heroicons/react/16/solid';
import { replyToComment, fetchPostById } from "../store/slices/communitySlice";

export const Comment = ({ comment, postDetails }) => {
    const dispatch = useDispatch();
    const [showReplies, setShowReplies] = useState(false);
    const [showReplyInput, setShowReplyInput] = useState(false);
    const [replyInput, setReplyInput] = useState("");
    console.log(comment)
    const handleReplyClick = () => {
        setShowReplyInput((prev) => !prev);
        if (!showReplyInput) {
            setReplyInput(`@${comment.author?.name||comment.teacher?.name} `);
        } else {
            setReplyInput("");
        }
    };

    const handleAddReply = async () => {
        if (!comment?.id) {
            console.error("Comment ID is missing.");
            return;
        }
    
        if (replyInput.trim()) {
            try {
                await dispatch(replyToComment({ commentId: comment.id, message: replyInput })).unwrap();
                setReplyInput("");
                setShowReplyInput(false);
                console.log(postDetails)
                await dispatch(fetchPostById(postDetails?.id)); // Ensure postDetails exists
            } catch (error) {
                console.error("Failed to add reply:", error);
            }
        }
    };
    

    return (
        <div className="px-3 py-3 border-b">
            <div className="flex justify-between items-start mb-2">
                <div className="font-bold text-lg text-gray-900 dark:text-gray-800">
                    {comment.author?.name||comment.teacher?.name}
                </div>
            </div>
            <p className="text-gray-700 dark:text-gray-700 mb-3">
                {comment.message}
            </p>
            <div className="flex justify-start items-center">
                <button
                    className="text-blue-600 text-sm font-medium hover:underline"
                    onClick={handleReplyClick}
                >
                    {showReplyInput ? "Cancel" : "Reply"}
                </button>
            </div>
            {showReplyInput && (
                <div className='px-4'>
                    <div className="mt-2">
                        <div className="flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 has-[input:focus-within]:outline-2 has-[input:focus-within]:-outline-offset-2 has-[input:focus-within]:outline-indigo-600">
                            <input
                                id="reply"
                                name="reply"
                                type="text"
                                value={replyInput}
                                onChange={(e) => setReplyInput(e.target.value)}
                                placeholder="Write a reply..."
                                className="block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
                            />
                            <button
                                type="submit"
                                onClick={handleAddReply}
                                className="ml-2 shrink-0 rounded-md bg-gradient-to-r from-indigo-600 to-purple-600 p-2 text-white hover:bg-indigo-700 focus:outline-none"
                            >
                                <PaperAirplaneIcon className="size-5 sm:size-4" aria-hidden="true" />
                            </button>
                        </div>
                    </div>
                </div>
            )}
            {comment.replies.length > 0 && (
                <div className="mt-3">
                    <div className="flex justify-end items-center">
                        <button
                            className="text-sm text-gray-500 hover:underline"
                            onClick={() => setShowReplies(!showReplies)}
                        >
                            {showReplies ? "Hide Replies" : `View Replies (${comment.replies.length})`}
                        </button>
                    </div>
                    {showReplies &&
                        comment.replies.map((reply, index) => (
                            <Reply key={index} reply={reply} />
                        ))}
                </div>
            )}
        </div>
    );
};
