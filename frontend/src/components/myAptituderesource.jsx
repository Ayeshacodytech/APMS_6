import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { deleteResource } from '../store/slices/aptitudeSlice'; // Adjust path if needed
import AptitudeConfirmationModal from './AptitudeconfirmationModel';
import DOMPurify from 'dompurify';
export function MyAptitudeResource({ resource }) {
    const dispatch = useDispatch();
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Open confirmation modal
    const handleDelete = () => {
        setIsModalOpen(true);
    };

    // Confirm deletion
    const handleConfirmDelete = () => {
        if (resource.id) {
            dispatch(deleteResource(resource.id));
        }
        setIsModalOpen(false);
    };

    // Close modal without deleting
    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-8">
            <div className="p-8">
                <div className="flex items-center justify-between gap-4 mb-6">
                    <div>
                        <h2 className="text-lg font-medium text-gray-900">Resource</h2>
                        <p className="text-sm text-gray-500">
                            Added {resource?.createdAt ? new Date(resource.createdAt).toLocaleString() : "Some time ago"}
                        </p>
                    </div>
                    <button onClick={handleDelete} className="px-4 py-2 hover rounded-lg">
                        <svg fill="#6a6868" width="28px" height="28px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" stroke="#6a6868">
                            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                            <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                            <g id="SVGRepo_iconCarrier">
                                <path d="M5.755,20.283,4,8H20L18.245,20.283A2,2,0,0,1,16.265,22H7.735A2,2,0,0,1,5.755,20.283ZM21,4H16V3a1,1,0,0,0-1-1H9A1,1,0,0,0,8,3V4H3A1,1,0,0,0,3,6H21a1,1,0,0,0,0-2Z" />
                            </g>
                        </svg>
                    </button>
                </div>

                <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4">
                    {resource.topic || "Untitled Resource"}
                </h1>

                {/* Tags */}
                <div className="flex gap-2 mb-6">
                    {resource.tags ? (
                        resource.tags.split(",").map((tag, index) => (
                            <span
                                key={index}
                                className="px-3 py-1 bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-700 rounded-full text-sm"
                            >
                                {tag.trim()}
                            </span>
                        ))
                    ) : (
                        <span className="px-3 py-1 bg-gray-200 text-gray-700 rounded-full text-sm">No Tags</span>
                    )}
                </div>

                {/* Optionally, show the resource URL, or a preview, etc */}
                <div className="text-sm text-gray-600">
                    <a
                        href={resource?.resource}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-indigo-600 underline"
                        dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(resource.resource) }}
                    />
                </div>
            </div>

            {/* Confirmation Modal */}
            <AptitudeConfirmationModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                onConfirm={handleConfirmDelete}
                topic={resource.topic}
            />
        </div>
    );
}

export default MyAptitudeResource;
