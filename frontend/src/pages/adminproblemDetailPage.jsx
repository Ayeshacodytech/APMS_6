import axios from 'axios';
import Cookies from 'js-cookie';
import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import AdminHeader from '../components/adminHeader';

const AdminProblemDetailPage = () => {
    const { id } = useParams();
    const [problem, setProblem] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [code, setCode] = useState('');
    const [language, setLanguage] = useState({ id: 71, name: 'Python' }); // Default to Python
    const [testResults, setTestResults] = useState(null);
    const [submitting, setSubmitting] = useState(false);
    const [running, setRunning] = useState(false);
    const [submission, setSubmission] = useState(null);

    // List of supported languages
    const languages = [
        { id: 71, name: 'Python' },
        { id: 63, name: 'JavaScript' },
        { id: 50, name: 'C' },
        { id: 54, name: 'C++' },
        { id: 62, name: 'Java' }
    ];

    // Fetch problem details
    useEffect(() => {
        const fetchProblem = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`https://futureforge.onrender.com/api/v1/admin/problem/${id}`, {
                    headers: { Authorization: `Bearer ${Cookies.get("token")}` },
                });
                setProblem(response.data);

                // Set default code template based on language
                setInitialCode(language.id);
            } catch (err) {
                console.error('Error fetching problem:', err);
                setError('Failed to load problem details. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchProblem();
    }, [id]);

    const setInitialCode = useCallback((languageId) => {
        // Set default code templates based on language
        switch (languageId) {
            case 71: // Python
                setCode('# Write your code here');
                break;
            case 63: // JavaScript
                setCode('# Write your code here');
                break;
            case 50: // C
                setCode('# Write your code here');
                break;
            case 54: // C++
                setCode('# Write your code here');
                break;
            case 62: // Java
                setCode('# Write your code here');
                break;
            default:
                setCode('// Write your solution here');
        }
    }, []);


    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                    <strong className="font-bold">Error! </strong>
                    <span className="block sm:inline">{error}</span>
                </div>
            </div>
        );
    }

    if (!problem) {
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded relative" role="alert">
                    <span className="block sm:inline">Problem not found.</span>
                </div>
            </div>
        );
    }

    // Parse test cases
    const testCases = problem.testCases ? JSON.parse(problem.testCases) : [];

    return (
        <div className="bg-gradient-to-l object-fill min-h-screen">
            <div className="ml-0 min-h-screen bg-gradient-to-b from-gray-50 to-white pb-16 md:pb-0">
                <AdminHeader />
                <div className="container mx-auto px-4 py-8">
                    {/* Problem description section */}
                    <div className="bg-white rounded-lg shadow-md p-6 overflow-y-auto lg:max-h-screen">
                        <div className="flex items-center justify-between mb-4">
                            <h1 className="text-2xl font-bold">{problem.title}</h1>
                            <span className={`px-3 py-1 rounded-full text-sm font-medium
              ${problem.difficulty === 'EASY' ? 'bg-green-100 text-green-800' :
                                    problem.difficulty === 'MEDIUM' ? 'bg-yellow-100 text-yellow-800' :
                                        'bg-red-100 text-red-800'}`}>
                                {problem.difficulty}
                            </span>
                        </div>

                        <div className="mb-6">
                            <h2 className="text-lg font-semibold mb-2">Description</h2>
                            <div className="prose max-w-none">
                                {problem.description}
                            </div>
                        </div>

                        <div className="mb-6">
                            <h2 className="text-lg font-semibold mb-2">Examples</h2>
                            <div className="space-y-4">
                                {testCases.map((testCase, index) => (
                                    <div key={index} className="bg-gray-50 p-4 rounded-md">
                                        <div className="mb-2">
                                            <span className="font-medium">Input:</span>
                                            <pre className="bg-gray-100 p-2 rounded mt-1 overflow-x-auto">{testCase.input}</pre>
                                        </div>
                                        <div>
                                            <span className="font-medium">Expected Output:</span>
                                            <pre className="bg-gray-100 p-2 rounded mt-1 overflow-x-auto">{testCase.expectedOutput}</pre>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Tags */}
                        <div>
                            <h2 className="text-lg font-semibold mb-2">Tags</h2>
                            <div className="flex flex-wrap gap-2">
                                {problem.tags && problem.tags.split(',').map((tag, index) => (
                                    <span key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                                        {tag.trim()}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminProblemDetailPage;