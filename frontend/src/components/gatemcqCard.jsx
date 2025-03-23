import React, { useState } from 'react';

const GateMCQCard = ({ mcq }) => {
    const [showAnswer, setShowAnswer] = useState(false);

    // If the question is attempted, toggle showAnswer on click.
    const handleCardClick = () => {
        if (mcq.attempted) {
            setShowAnswer(prev => !prev);
        }
    };

    return (
        <div 
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer"
            onClick={handleCardClick}
        >
            <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                <span className="text-sm font-medium px-3 py-1 rounded-full bg-gray-100 text-gray-800">
                        {`Question ${mcq.serialNumber}`}
                    </span>
                    {mcq.attempted ? (
                        <span className="text-sm font-medium px-3 py-1 rounded-full bg-green-100 text-green-800">
                            Attempted
                        </span>
                    ) : (
                        <span className="text-sm font-medium px-3 py-1 rounded-full bg-yellow-100 text-yellow-800">
                            Pending
                        </span>
                    )}
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
                {/* Button not needed for attempted items; clicking toggles inline answer */}
                {!mcq.attempted ? (
                    <a 
                        href={`/gate/mcq/${mcq.id}`} 
                        className="block w-full text-center py-2 rounded-md font-medium bg-indigo-600 text-white hover:bg-indigo-700 transition-colors"
                    >
                        Attempt Question
                    </a>
                ) : (
                    <div className="text-center">
                        <button 
                            className="block w-full py-2 px-4 rounded-md font-medium bg-gray-100 text-gray-800 hover:bg-gray-200 transition-colors"
                            onClick={(e) => { e.stopPropagation(); setShowAnswer(prev => !prev); }}
                        >
                            {showAnswer ? 'Hide Answer' : 'Show Answer'}
                        </button>
                        {showAnswer && (
                            <div className="mt-4 p-4 bg-green-50 border border-green-300 rounded">
                                <p className="text-green-800 font-medium">Correct Answer: {mcq.answer}</p>
                                {mcq.explanation && (
                                    <p className="text-gray-700 mt-2">Explanation: {mcq.explanation}</p>
                                )}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default GateMCQCard;
