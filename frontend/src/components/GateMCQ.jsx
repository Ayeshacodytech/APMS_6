import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import {
    attemptMCQ,
    fetchMCQById,
    selectMCQDetails,
    selectGateStatus,
    selectGateError
} from '../store/slices/gateSlice';
import { SideNavBar } from './SideNavbar';

import GateHeader from './gateHeader';
import Loading from './Loading';
const GateMCQ = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    // Map URL param 'id' to 'mcqId'
    const { id: mcqId } = useParams();

    // Retrieve Redux state
    const mcqDetails = useSelector(selectMCQDetails);
    const status = useSelector(selectGateStatus);
    const error = useSelector(selectGateError);

    const [selectedOption, setSelectedOption] = useState('');
    const [submission, setSubmission] = useState(null);
    const [submitting, setSubmitting] = useState(false);

    // Fetch the MCQ detail when the component mounts or mcqId changes
    useEffect(() => {
        if (mcqId) {
            dispatch(fetchMCQById(mcqId));
        }
    }, [dispatch, mcqId]);

    // While loading or status is idle and no data yet, show loading...
    if ((status === 'loading' || status === 'idle') && !mcqDetails) {
        return (
            <div className="container mx-auto px-4 py-8">
                <Loading/>
            </div>
        );
    }

    // If an error occurred or no MCQ was found
    if (status === 'failed' || !mcqDetails) {
        return (
            <div className="container mx-auto px-4 py-8">
                <p className="text-red-500">Error: {error || 'MCQ not found'}</p>
                <button
                    onClick={() => navigate('/aptitude/mcq')}
                    className="mt-4 py-2 px-4 bg-indigo-600 text-white rounded-md"
                >
                    Back to Questions
                </button>
            </div>
        );
    }

    // Use the fetched MCQ details
    const mcq = mcqDetails;

    
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!selectedOption) {
            toast.warning('Please select an option');
            return;
        }
        setSubmitting(true);
        try {
            const resultAction = await dispatch(
                attemptMCQ({
                    mcqId: mcq.id,
                    attemptData: { selectedOption }  // Sends { "selectedOption": "YourOption" }
                })
            );
            if (attemptMCQ.fulfilled.match(resultAction)) {
                // Compare without modifying case, keeping options as they are
                const isCorrect = selectedOption === mcq.answer;
                const submissionData = {
                    isCorrect,
                    message: isCorrect ? 'Correct answer!' : 'Incorrect answer!',
                    selectedAnswer: selectedOption,
                    correctAnswer: mcq.answer,  // Use mcq.answer as returned from the backend
                    explanation: mcq.explanation
                };
                setSubmission(submissionData);
                toast[isCorrect ? 'success' : 'error'](submissionData.message);
            } else {
                toast.error('Submission failed. Please try again.');
            }
        } catch (error) {
            toast.error('An error occurred. Please try again later.');
        }
        setSubmitting(false);
    };



    const handleOptionChange = (e) => {
        setSelectedOption(e.target.value);
    };

    return (
        <div className="bg-gradient-to-l object-fill min-h-screen">
                    <SideNavBar />
        
                    <div className="ml-0 min-h-screen bg-gradient-to-b from-gray-50 to-white pb-16 md:pb-0">
                        <GateHeader />
        <div className="container mx-auto px-4 py-8">
            <button
                onClick={() => navigate('/aptitude/mcq')}
                className="mb-6 flex items-center text-indigo-600 hover:text-indigo-800"
            >
                &larr; Back to Questions
            </button>

            <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
                <div className="mb-4">
                    <span className="text-sm font-medium px-3 py-1 rounded-full bg-blue-100 text-blue-800">
                    {`Question ${mcq.serialNumber}`}
                    </span>
                </div>

                <h1 className="text-2xl font-bold text-gray-800 mb-6">{mcq.question}</h1>

                {/* If no submission yet, show the form; otherwise, show the result */}
                {!submission ? (
                    <form onSubmit={handleSubmit}>
                        <div className="space-y-4 mb-8">
                            {mcq.options.map((optionText, index) => (
                                <label
                                    key={index}
                                    className={`block p-4 border rounded-lg cursor-pointer transition-colors ${selectedOption === optionText
                                            ? 'border-indigo-600 bg-indigo-50'
                                            : 'border-gray-300 hover:bg-gray-50'
                                        }`}
                                >
                                    <div className="flex items-center">
                                        <input
                                            type="radio"
                                            name="option"
                                            value={optionText}
                                            checked={selectedOption === optionText}
                                            onChange={handleOptionChange}
                                            className="h-5 w-5 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                                        />
                                        <span className="ml-3 font-medium text-gray-800">
                                            {optionText}
                                        </span>
                                    </div>
                                </label>
                            ))}
                        </div>


                        <button
                            type="submit"
                            disabled={submitting || status === 'loading'}
                            className="w-full py-3 px-4 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700 transition-colors disabled:bg-indigo-400"
                        >
                            {submitting ? 'Submitting...' : 'Submit Answer'}
                        </button>
                    </form>
                ) : (
                    <div>
                        <div
                            className={`p-4 mb-6 rounded-lg ${submission.isCorrect
                                ? 'bg-green-100 border border-green-300'
                                : 'bg-red-100 border border-red-300'
                                }`}
                        >
                            <h3
                                className={`text-lg font-semibold ${submission.isCorrect ? 'text-green-800' : 'text-red-800'
                                    }`}
                            >
                                {submission.message}
                            </h3>
                            <p className="text-gray-800 mt-2">
                                Your answer: Option {submission.selectedAnswer}
                            </p>
                            {!submission.isCorrect && (
                                <p className="text-red-800 mt-2">
                                    Correct answer: Option {submission.correctAnswer}
                                </p>
                            )}
                        </div>

                        {submission.explanation && (
                            <div className="mt-6">
                                <h3 className="text-xl font-semibold text-gray-800 mb-3">
                                    Explanation
                                </h3>
                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <p className="text-gray-700">{submission.explanation}</p>
                                </div>
                            </div>
                        )}

                        <button
                            onClick={() => navigate('/aptitude/mcq')}
                            className="mt-8 w-full py-3 px-4 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700 transition-colors"
                        >
                            Back to All Questions
                        </button>
                    </div>
                )}
            </div>
        </div>
    </div>
    </div>
    );
};

export default GateMCQ;
