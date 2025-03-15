import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { deletePost } from '../store/slices/teachercommunityslice'; // Adjust the import path accordingly
import ConfirmationModal from './confirmationModel'; // Adjust the import path accordingly

export function TeacherMyArticle({ post }) {
    const dispatch = useDispatch();
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Handle opening and closing of confirmation modal
    const handleDelete = () => {
        setIsModalOpen(true);
    };

    const handleConfirmDelete = () => {
        if (post.id) {
            dispatch(deletePost(post.id)); // Dispatch the delete action
        }
        setIsModalOpen(false); // Close the modal after confirming
    };

    const handleCloseModal = () => {
        setIsModalOpen(false); // Close the modal without deleting
    };

    return (
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-8">
            <div className="p-8">
                <div className="flex items-center justify-between gap-4 mb-6">
                    <div>
                        <h2 className="text-lg font-medium text-gray-900">Community Post</h2>
                        <p className="text-sm text-gray-500">
                            Posted {post?.createdAt ? new Date(post.createdAt).toLocaleString() : "Some time ago"}
                        </p>
                    </div>
                    <button onClick={handleDelete} className="px-4 py-2 hover rounded-lg">
                        <svg fill="#6a6868" width="28px" height="28px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" stroke="#6a6868">
                            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                            <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                            <g id="SVGRepo_iconCarrier">
                                <path d="M5.755,20.283,4,8H20L18.245,20.283A2,2,0,0,1,16.265,22H7.735A2,2,0,0,1,5.755,20.283ZM21,4H16V3a1,1,0,0,0-1-1H9A1,1,0,0,0,8,3V4H3A1,1,0,0,0,3,6H21a1,1,0,0,0,0-2Z"></path>
                            </g>
                        </svg>
                    </button>
                </div>

                <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4">
                    {post.title || "Untitled Post"}
                </h1>

                {/* Tags */}
                <div className="flex gap-2 mb-6">
                    {/* Check if the topic exists */}
                    {post.topic ? (
                        // Split the topic string if multiple topics are present
                        post.topic.split(",").map((topic, index) => (
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
            </div>

            {/* Confirmation Modal */}
            <ConfirmationModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                onConfirm={handleConfirmDelete}
                postTitle={post.title}
            />
        </div>
    );
}

export default TeacherMyArticle;
