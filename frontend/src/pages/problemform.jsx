import axios from 'axios';
import Cookies from 'js-cookie';
import React, { useState } from 'react';
import AdminHeader from '../components/adminHeader';
const ProblemForm = () => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        difficulty: 'EASY',
        tags: [''],
        testCases: [{ input: '', expectedOutput: '' }]
    });

    const [response, setResponse] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const difficultyOptions = ['EASY', 'MEDIUM', 'HARD'];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleDifficultyChange = (e) => {
        setFormData({ ...formData, difficulty: e.target.value });
    };

    const handleTagChange = (index, value) => {
        const newTags = [...formData.tags];
        newTags[index] = value;
        setFormData({ ...formData, tags: newTags });
    };

    const addTag = () => {
        setFormData({ ...formData, tags: [...formData.tags, ''] });
    };

    const removeTag = (index) => {
        const newTags = [...formData.tags];
        newTags.splice(index, 1);
        setFormData({ ...formData, tags: newTags });
    };

    const handleTestCaseChange = (index, field, value) => {
        const newTestCases = [...formData.testCases];
        newTestCases[index] = { ...newTestCases[index], [field]: value };
        setFormData({ ...formData, testCases: newTestCases });
    };

    const addTestCase = () => {
        setFormData({
            ...formData,
            testCases: [...formData.testCases, { input: '', expectedOutput: '' }]
        });
    };

    const removeTestCase = (index) => {
        const newTestCases = [...formData.testCases];
        newTestCases.splice(index, 1);
        setFormData({ ...formData, testCases: newTestCases });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        try {
            // Filter out empty tags
            const filteredTags = formData.tags.filter(tag => tag.trim() !== '');

            const response = await axios.post(
                'https://futureforge.onrender.com/api/v1/problem',
                {
                    ...formData
                },
                {
                    headers: {
                        Authorization: `Bearer ${Cookies.get("token")}`,
                    },
                }
            );

            const data = await response.data;
            console.log(data);
            if (!data) {
                throw new Error(data.message || 'Error submitting problem');
            }

            setResponse(data);

            // Reset form after successful submission
            setFormData({
                title: '',
                description: '',
                difficulty: 'EASY',
                tags: [''],
                testCases: [{ input: '', expectedOutput: '' }]
            });
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="bg-gradient-to-l object-fill min-h-screen">

            <div className="ml-0 min-h-screen bg-gradient-to-b from-gray-50 to-white pb-16 md:pb-0">
                <AdminHeader />
                <div className="max-w-4xl mx-auto p-8 bg-white rounded-lg shadow-lg">
                    <h1 className="text-2xl font-bold mb-6">Add New Problem</h1>

                    {response && (
                        <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded">
                            <h2 className="font-bold">Problem Added Successfully!</h2>
                            <pre className="mt-2 p-3 bg-gray-100 rounded overflow-x-auto">
                                {JSON.stringify(response, null, 2)}
                            </pre>
                        </div>
                    )}

                    {error && (
                        <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
                            Error: {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2" htmlFor="title">Title</label>
                            <input
                                id="title"
                                name="title"
                                type="text"
                                value={formData.title}
                                onChange={handleChange}
                                required
                                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2" htmlFor="description">Description</label>
                            <textarea
                                id="description"
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                required
                                rows="6"
                                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2">Difficulty</label>
                            <select
                                value={formData.difficulty}
                                onChange={handleDifficultyChange}
                                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                {difficultyOptions.map(option => (
                                    <option key={option} value={option}>{option}</option>
                                ))}
                            </select>
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2">Tags</label>
                            {formData.tags.map((tag, index) => (
                                <div key={index} className="flex mb-2">
                                    <input
                                        type="text"
                                        value={tag}
                                        onChange={(e) => handleTagChange(index, e.target.value)}
                                        placeholder="Enter tag"
                                        className="flex-grow p-2 border rounded-l focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => removeTag(index)}
                                        disabled={formData.tags.length <= 1}
                                        className="px-4 bg-red-500 text-white rounded-r hover:bg-red-600 disabled:bg-gray-300"
                                    >
                                        Remove
                                    </button>
                                </div>
                            ))}
                            <button
                                type="button"
                                onClick={addTag}
                                className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                            >
                                Add Tag
                            </button>
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2">Test Cases</label>
                            {formData.testCases.map((testCase, index) => (
                                <div key={index} className="mb-4 p-4 border rounded bg-gray-50">
                                    <div className="flex justify-between mb-2">
                                        <h3 className="font-medium">Test Case #{index + 1}</h3>
                                        <button
                                            type="button"
                                            onClick={() => removeTestCase(index)}
                                            disabled={formData.testCases.length <= 1}
                                            className="px-2 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600 disabled:bg-gray-300"
                                        >
                                            Remove
                                        </button>
                                    </div>

                                    <div className="mb-2">
                                        <label className="block text-gray-700 mb-1 text-sm">Input</label>
                                        <input
                                            type="text"
                                            value={testCase.input}
                                            onChange={(e) => handleTestCaseChange(index, 'input', e.target.value)}
                                            required
                                            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-gray-700 mb-1 text-sm">Expected Output</label>
                                        <input
                                            type="text"
                                            value={testCase.expectedOutput}
                                            onChange={(e) => handleTestCaseChange(index, 'expectedOutput', e.target.value)}
                                            required
                                            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>
                                </div>
                            ))}
                            <button
                                type="button"
                                onClick={addTestCase}
                                className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                            >
                                Add Test Case
                            </button>
                        </div>

                        <div className="mt-6">
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="px-6 py-3 bg-green-500 text-white rounded font-medium hover:bg-green-600 disabled:bg-gray-400"
                            >
                                {isLoading ? 'Submitting...' : 'Submit Problem'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ProblemForm;