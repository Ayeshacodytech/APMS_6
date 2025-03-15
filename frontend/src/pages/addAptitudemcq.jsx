import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { TeacherSideNavBar } from '../components/teacherSideNavbar';
import { createMCQ } from '../store/slices/teacherAptitudeslice';
import TeacherAptitudeHeader from '../components/teacheraptitudeHeader';


const AddAptitudeMCQ = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // State for form inputs
    const [question, setQuestion] = useState('');
    const [options, setOptions] = useState(['', '', '', '']); // Array for 4 options
    const [answer, setAnswer] = useState('');
    const [explanation, setExplanation] = useState('');
    const [submitting, setSubmitting] = useState(false);

    const handleOptionChange = (index, value) => {
        const updatedOptions = [...options];
        updatedOptions[index] = value;
        setOptions(updatedOptions);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validation
        if (!question || options.some(option => option.trim() === '') || !answer) {
            toast.warning('Please fill in all fields, and ensure all options are provided.');
            return;
        }
        if (!options.includes(answer)) {
            toast.warning('The correct answer must match one of the provided options.');
            return;
        }

        // Create payload
        const mcqData = {
            question,
            options,
            answer,
            explanation
        };

        setSubmitting(true);
        try {
            const resultAction = await dispatch(createMCQ(mcqData));
            if (createMCQ.fulfilled.match(resultAction)) {
                toast.success('Question added successfully!');
                navigate('/teacher/aptitude/home');
            } else {
                toast.error('Failed to add the question. Please try again.');
            }
        } catch (err) {
            console.error('Error creating MCQ:', err);
            toast.error('An error occurred. Please try again later.');
        }
        setSubmitting(false);
    };

    return (
        <div className="bg-gradient-to-l object-fill min-h-screen">
            <TeacherSideNavBar />

            {/* Main Content */}
            <div className="ml-0 min-h-screen bg-gradient-to-b from-gray-50 to-white pb-16 md:pb-0">
                <TeacherAptitudeHeader />
                <div className="container mx-auto px-4 py-8">
                    <h1 className="text-3xl font-bold text-gray-800 mb-6">Add New MCQ</h1>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Question */}
                        <div>
                            <label className="block text-gray-700">Question</label>
                            <textarea
                                value={question}
                                onChange={(e) => setQuestion(e.target.value)}
                                className="w-full border border-gray-300 rounded px-3 py-2"
                                placeholder="Enter the question..."
                            />
                        </div>

                        {/* Options */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {options.map((option, index) => (
                                <div key={index}>
                                    <label className="block text-gray-700">{`Option ${index + 1}`}</label>
                                    <input
                                        type="text"
                                        value={option}
                                        onChange={(e) => handleOptionChange(index, e.target.value)}
                                        className="w-full border border-gray-300 rounded px-3 py-2"
                                        placeholder={`Option ${index + 1}`}
                                    />
                                </div>
                            ))}
                        </div>

                        {/* Answer */}
                        <div>
                            <label className="block text-gray-700">Correct Answer</label>
                            <input
                                type="text"
                                value={answer}
                                onChange={(e) => setAnswer(e.target.value)}
                                className="w-full border border-gray-300 rounded px-3 py-2"
                                placeholder="Enter the correct answer exactly as one of the options"
                            />
                        </div>

                        {/* Explanation */}
                        <div>
                            <label className="block text-gray-700">Explanation</label>
                            <textarea
                                value={explanation}
                                onChange={(e) => setExplanation(e.target.value)}
                                className="w-full border border-gray-300 rounded px-3 py-2"
                                placeholder="Provide an explanation (optional)..."
                            />
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={submitting}
                            className="w-full py-3 px-4 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700 transition-colors disabled:bg-indigo-400"
                        >
                            {submitting ? 'Submitting...' : 'Add Question'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddAptitudeMCQ;
