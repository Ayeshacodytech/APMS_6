import axios from 'axios';
import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { SideNavBar } from '../components/SideNavbar';
import CodeHeader from '../components/codeHeader';

const SubmissionDetailPage = () => {
    const { id } = useParams();
    const [submission, setSubmission] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchSubmission = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`https://futureforge.onrender.com/api/v1/submission/${id}`, {
                    headers: { Authorization: `Bearer ${Cookies.get("token")}` },
                });
                setSubmission(response.data);
            } catch (err) {
                console.error('Error fetching submission:', err);
                setError('Failed to load submission details. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchSubmission();
    }, [id]);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative text-center">
                    <strong className="font-bold">Error! </strong>
                    <span className="block sm:inline">{error}</span>
                </div>
            </div>
        );
    }

    if (!submission) {
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded relative text-center">
                    <span className="block sm:inline">Submission not found.</span>
                </div>
            </div>
        );
    }

    const results = submission.results ? JSON.parse(submission.results) : null;
    const problem = submission.problem;
    const testCases = problem.testCases ? JSON.parse(problem.testCases) : [];

    return (
        <div className="bg-gradient-to-l object-fill min-h-screen">
            <SideNavBar />
            <div className="ml-0 min-h-screen bg-gradient-to-b from-gray-50 to-white pb-16 md:pb-0">
                <CodeHeader />
                <div className="container mx-auto px-4 py-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Left Panel - Problem Details */}
                        <div className="bg-white rounded-lg shadow-md p-6 overflow-y-auto max-h-screen">
                            <h1 className="text-2xl font-bold mb-4">Submission Details</h1>
                            <div className="mb-4 flex flex-wrap justify-between items-center">
                                <h2 className="text-lg font-bold">{problem.title}</h2>
                                <span className={`px-3 py-1 rounded-full text-sm font-medium
                        ${problem.difficulty === 'EASY' ? 'bg-green-100 text-green-800' :
                                        problem.difficulty === 'MEDIUM' ? 'bg-yellow-100 text-yellow-800' :
                                            'bg-red-100 text-red-800'}`}>
                                    {problem.difficulty}
                                </span>
                            </div>

                            <div className="mb-6">
                                <h2 className="text-lg font-semibold">Description</h2>
                                <p className="text-gray-700">{problem.description}</p>
                            </div>

                            <div className="mb-6">
                                <h2 className="text-lg font-semibold">Examples</h2>
                                <div className="space-y-4">
                                    {testCases.map((testCase, index) => (
                                        <div key={index} className="bg-gray-50 p-4 rounded-md">
                                            <div className="mb-2">
                                                <span className="font-medium">Input:</span>
                                                <pre className="bg-gray-100 p-2 rounded mt-1 overflow-x-auto break-all">{testCase.input}</pre>
                                            </div>
                                            <div>
                                                <span className="font-medium">Expected Output:</span>
                                                <pre className="bg-gray-100 p-2 rounded mt-1 overflow-x-auto break-all">{testCase.expectedOutput}</pre>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <h2 className="text-lg font-semibold">Tags</h2>
                                <div className="flex flex-wrap gap-2">
                                    {problem.tags && problem.tags.split(',').map((tag, index) => (
                                        <span key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                                            {tag.trim()}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Right Panel - Submission Details */}
                        <div className="bg-white rounded-lg shadow-md p-6 overflow-y-auto max-h-screen">
                            <div className="mb-4">
                                <h2 className="text-lg font-semibold">Submission</h2>
                                <p><strong>Language:</strong> {submission.languageId === 71 ? 'Python' : submission.languageId === 63 ? 'JavaScript' : submission.languageId === 50 ? 'C' : submission.languageId === 54 ? 'C++' : submission.languageId === 62 ? 'Java' : 'Unknown'}</p>
                                <p><strong>Status:</strong> <span className={`font-medium ${submission.status === 'Accepted' ? 'text-green-600' : 'text-red-600'}`}>{submission.status}</span></p>
                                <p><strong>Source Code:</strong></p>
                                <pre className="bg-gray-100 p-2 rounded mt-1 overflow-x-auto break-all">{submission.sourceCode}</pre>
                            </div>

                            {results && (
                                <div>
                                    <h2 className="text-lg font-semibold">Test Results</h2>
                                    <div className="space-y-3">
                                        {results.evaluatedTestCases.map((result, index) => (
                                            <div key={index} className={`p-3 rounded-md ${result.passed ? 'bg-green-50' : 'bg-red-50'}`}>
                                                <div className="flex flex-wrap justify-between mb-2">
                                                    <span className="font-medium">Test Case {index + 1}</span>
                                                    <span className={`px-2 py-1 rounded text-sm ${result.passed ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                                        {result.passed ? 'Passed' : 'Failed'}
                                                    </span>
                                                </div>

                                                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
                                                    <div>
                                                        <div className="font-medium">Input</div>
                                                        <pre className="bg-gray-100 p-2 rounded overflow-x-auto break-all">{result.input}</pre>
                                                    </div>
                                                    <div>
                                                        <div className="font-medium">Expected</div>
                                                        <pre className="bg-gray-100 p-2 rounded overflow-x-auto break-all">{result.expectedOutput}</pre>
                                                    </div>
                                                    <div>
                                                        <div className="font-medium">Your Output</div>
                                                        <pre className="bg-gray-100 p-2 rounded overflow-x-auto break-all">{result.actualOutput}</pre>
                                                    </div>
                                                </div>

                                                {result.error && (
                                                    <div className="mt-2">
                                                        <div className="font-medium text-red-700">Error</div>
                                                        <pre className="bg-red-50 p-2 rounded text-red-700 overflow-x-auto break-all">{result.error}</pre>
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SubmissionDetailPage;
