import axios from 'axios';
import Cookies from 'js-cookie';
import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { SideNavBar } from '../components/SideNavbar';
import CodeHeader from '../components/codeHeader';

const ProblemDetailPage = () => {
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
                const response = await axios.get(`https://futureforge.onrender.com/api/v1/problem/${id}`, {
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

    const handleLanguageChange = (e) => {
        const selectedLangId = parseInt(e.target.value);
        setLanguage(languages.find(lang => lang.id === selectedLangId));
        setInitialCode(selectedLangId);
    };

    const runCode = async () => {
        setRunning(true);
        setTestResults(null);

        try {
            const response = await axios.post('https://futureforge.onrender.com/api/v1/submission/run',
                {
                    problemId: id,
                    sourceCode: code,
                    languageId: language.id
                },
                {
                    headers: { Authorization: `Bearer ${Cookies.get("token")}` }, // Include token from cookies
                }
            );

            setTestResults(response.data);
        } catch (err) {
            console.error('Error running code:', err);
            setError('Failed to run code. Please try again.');
        } finally {
            setRunning(false);
        }
    };

    const submitCode = async () => {
        setSubmitting(true);
        setTestResults(null);

        try {
            const response = await axios.post('https://futureforge.onrender.com/api/v1/submission',
                {
                    problemId: id,
                    sourceCode: code,
                    languageId: language.id
                },
                {
                    headers: { Authorization: `Bearer ${Cookies.get("token")}` }, // Include token from cookies
                }
            );

            setSubmission(response.data.submission);
            setTestResults(response.data);
        } catch (err) {
            console.error('Error submitting code:', err);
            setError('Failed to submit code. Please try again.');
        } finally {
            setSubmitting(false);
        }
    };

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
            <SideNavBar />
            <div className="ml-0 min-h-screen bg-gradient-to-b from-gray-50 to-white pb-16 md:pb-0">
                <CodeHeader />
                <div className="container mx-auto px-4 py-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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

                        {/* Code editor section */}
                        <div className="flex flex-col bg-white rounded-lg shadow-md h-full">
                            <div className="p-4 bg-gray-100 rounded-t-lg flex flex-wrap items-center justify-between gap-3">
                                <div className="flex items-center space-x-2">
                                    <label htmlFor="language" className="font-medium">Language:</label>
                                    <select
                                        id="language"
                                        value={language.id}
                                        onChange={handleLanguageChange}
                                        className="border rounded-md px-2 py-1"
                                    >
                                        {languages.map(lang => (
                                            <option key={lang.id} value={lang.id}>{lang.name}</option>
                                        ))}
                                    </select>
                                </div>

                                <div className="flex space-x-2">
                                    <button
                                        onClick={runCode}
                                        disabled={running}
                                        className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 disabled:bg-gray-300"
                                    >
                                        {running ? 'Running...' : 'Run Code'}
                                    </button>
                                    <button
                                        onClick={submitCode}
                                        disabled={submitting}
                                        className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:bg-green-300"
                                    >
                                        {submitting ? 'Submitting...' : 'Submit Solution'}
                                    </button>
                                </div>
                            </div>

                            <div className="flex-grow p-4">
                                <textarea
                                    value={code}
                                    onChange={(e) => setCode(e.target.value)}
                                    className="w-full h-64 p-4 font-mono text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Write your code here..."
                                />
                                {/* Ideally, replace with a proper code editor component */}
                            </div>

                            {/* Test results section */}
                            {testResults && (
                                <div className="p-4 border-t">
                                    <h3 className="text-lg font-semibold mb-2">
                                        Test Results:
                                        <span className={`ml-2 ${testResults.status === 'Accepted' ? 'text-green-600' : 'text-red-600'}`}>
                                            {testResults.status}
                                        </span>
                                    </h3>

                                    <div className="space-y-3 mt-3">
                                        {testResults.evaluatedTestCases.map((result, index) => (
                                            <div key={index} className={`p-3 rounded-md ${result.passed ? 'bg-green-50' : 'bg-red-50'}`}>
                                                <div className="flex items-center justify-between mb-2">
                                                    <span className="font-medium">Test Case {index + 1}</span>
                                                    <span className={`px-2 py-1 rounded text-sm ${result.passed ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                                        {result.passed ? 'Passed' : 'Failed'}
                                                    </span>
                                                </div>

                                                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
                                                    <div>
                                                        <div className="font-medium mb-1">Input</div>
                                                        <pre className="bg-gray-100 p-2 rounded overflow-x-auto">{result.input}</pre>
                                                    </div>
                                                    <div>
                                                        <div className="font-medium mb-1">Expected</div>
                                                        <pre className="bg-gray-100 p-2 rounded overflow-x-auto">{result.expectedOutput}</pre>
                                                    </div>
                                                    <div>
                                                        <div className="font-medium mb-1">Your Output</div>
                                                        <pre className="bg-gray-100 p-2 rounded overflow-x-auto">{result.actualOutput}</pre>
                                                    </div>
                                                </div>

                                                {result.error && (
                                                    <div className="mt-2">
                                                        <div className="font-medium text-red-700">Error</div>
                                                        <pre className="bg-red-50 p-2 rounded text-red-700 overflow-x-auto">{result.error}</pre>
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

export default ProblemDetailPage;