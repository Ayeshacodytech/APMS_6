import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteMCQ } from '../store/slices/teacherGateslice'; // Adjust import if needed
import TeacherGateConfirmationModal from './TeacherGateconfirmationModel';

const TeacherMyGateMCQCard = ({ mcq }) => {
    const dispatch = useDispatch();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [showAnswer, setShowAnswer] = useState(false);

    // Remove card-level onClick toggling that referenced a non-existent state updater.
    // We'll let the answer toggle be triggered only by the dedicated button.

    // Open the confirmation modal for deletion
    const handleDelete = (e) => {
        e.stopPropagation(); // Prevent any parent click events
        setIsModalOpen(true);
    };

    // When confirmed, dispatch the delete action
    const handleConfirmDelete = () => {
        if (mcq.id) {
            dispatch(deleteMCQ(mcq.id));
        }
        setIsModalOpen(false);
    };

    // Close the modal without deleting
    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    return (

        <div
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer"
        >
            {/* Top section – header and question */}
            <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                    <span className="text-sm font-medium px-3 py-1 rounded-full bg-gray-100 text-gray-800">
                        {`Question ${mcq.serialNumber}`}
                    </span>
                    {/* Delete Button */}
                    <button onClick={handleDelete} className="p-2 hover:bg-gray-200 rounded">
                        <svg fill="#6a6868" width="20px" height="20px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path d="M3 6h18v2H3zm2 3h14l-1.5 12.5a2 2 0 0 1-2 2H8.5a2 2 0 0 1-2-2L4 9zm7 2v8h2v-8h-2z" />
                        </svg>
                    </button>
                </div>

                {/* Question text – "line-clamp-2" ensures even long text is truncated */}
                <h3 className="text-xl font-semibold text-gray-800 mb-2 line-clamp-2">
                    {mcq.question}
                </h3>
            </div>

            {/* Standalone Answer Toggle Section */}

            <div className='text-center'>
                <button
                    className="block w-full py-2 px-4 rounded-md font-medium bg-gray-100 text-gray-800 hover:bg-gray-200 transition-colors"
                    onClick={(e) => {
                        e.stopPropagation();
                        setShowAnswer(prev => !prev);
                    }}
                >
                    {showAnswer ? 'Hide Answer' : 'Show Answer'}
                </button>
                {showAnswer && (
                    <div className="mt-4 p-4 bg-green-50 border border-green-300 rounded">
                        <p className="text-green-800 font-medium">
                            Correct Answer: {mcq.answer}
                        </p>
                        {mcq.explanation && (
                            <p className="text-gray-700 mt-2">
                                Explanation: {mcq.explanation}
                            </p>
                        )}
                    </div>
                )}
            </div>

            {/* Confirmation Modal for deletion */}
            <TeacherGateConfirmationModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                onConfirm={handleConfirmDelete}
                title={mcq.question}
            />
        </div>
    );
};

export default TeacherMyGateMCQCard;