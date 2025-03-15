import React, { useState } from 'react';

const TeacherMCQCard = ({ mcq }) => {
    const [showPopup, setShowPopup] = useState(false);

    const handleCardClick = () => {
        // Always show the popup (no condition for 'attempted')
        setShowPopup(true);
    };

    const closePopup = () => {
        setShowPopup(false);
    };

    return (
        <div>
            {/* Main Card */}
            <div
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer"
                onClick={handleCardClick}
            >
                <div className="p-6">
                    <div className="flex justify-between items-center mb-4">
                        <span className="text-sm font-medium px-3 py-1 rounded-full bg-gray-100 text-gray-800">
                            {`Question ${mcq.serialNumber}`}
                        </span>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2 line-clamp-2">
                        {mcq.question}
                    </h3>
                    <div className="mb-4 text-gray-600">
                        {mcq.difficulty && (
                            <span className="text-sm mr-4">
                                Difficulty: <span className={`font-medium ${mcq.difficulty === 'Easy' ? 'text-green-600' : mcq.difficulty === 'Medium' ? 'text-yellow-600' : 'text-red-600'}`}>{mcq.difficulty}</span>
                            </span>
                        )}
                        {mcq.year && (
                            <span className="text-sm">
                                Year: <span className="font-medium">{mcq.year}</span>
                            </span>
                        )}
                    </div>
                </div>
            </div>

            {/* Popup Modal */}
            {showPopup && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white rounded-lg shadow-lg p-6 max-w-lg w-full relative">
                        <button
                            onClick={closePopup}
                            className="absolute top-2 right-2 bg-red-500 text-white font-bold rounded-full w-8 h-8 flex justify-center items-center hover:bg-red-600 transition"
                        >
                            ×
                        </button>
                        <h3 className="text-xl font-semibold text-gray-800 mb-4">
                            {`Question ${mcq.serialNumber}`}
                        </h3>
                        <p className="text-gray-700 mb-4">{mcq.question}</p>
                        <div className="bg-green-50 border border-green-300 rounded p-4">
                            <p className="text-green-800 font-medium">
                                Correct Answer: {mcq.answer}
                            </p>
                            {mcq.explanation && (
                                <p className="text-gray-700 mt-2">
                                    Explanation: {mcq.explanation}
                                </p>
                            )}
                        </div>
                        <button 
                            onClick={closePopup}
                            className="mt-6 w-full bg-indigo-600 text-white py-2 rounded-md font-medium hover:bg-indigo-700 transition"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TeacherMCQCard;
