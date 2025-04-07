import axios from 'axios';
import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { SideNavBar } from '../components/SideNavbar';
import CodeHeader from '../components/codeHeader';

const SubmissionsPage = () => {
    const [submissions, setSubmissions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [problemMap, setProblemMap] = useState({});

    useEffect(() => {
        const fetchSubmissions = async () => {
            setLoading(true);
            try {
                // Fetch user's submissions
                const submissionsResponse = await axios.get('https://futureforge.onrender.com/api/v1/submission', {
                    headers: { Authorization: `Bearer ${Cookies.get("token")}` },
                });
                setSubmissions(submissionsResponse.data);

                // Get unique problem IDs from submissions
                const problemIds = [...new Set(submissionsResponse.data.map(sub => sub.problemId))];

                // Fetch problem details for each problem ID
                const problemsData = {};
                await Promise.all(problemIds.map(async (id) => {
                    try {
                        const response = await axios.get(`https://futureforge.onrender.com/api/v1/problem/${id}`, {
                            headers: { Authorization: `Bearer ${Cookies.get("token")}` },
                        });
                        problemsData[id] = response.data;
                    } catch (err) {
                        console.error(`Error fetching problem ${id}:`, err);
                    }
                }));

                setProblemMap(problemsData);
            } catch (err) {
                console.error('Error fetching submissions:', err);
                setError('Failed to load submissions. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchSubmissions();
    }, []);

    const getLanguageName = (langId) => {
        const languages = {
            71: 'Python',
            63: 'JavaScript',
            50: 'C',
            54: 'C++',
            62: 'Java'
        };
        return languages[langId] || `Language ID: ${langId}`;
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleString();
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'Accepted': return 'bg-green-100 text-green-800';
            case 'Wrong Answer': return 'bg-red-100 text-red-800';
            case 'ERROR': return 'bg-orange-100 text-orange-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <div className="bg-gradient-to-l object-fill min-h-screen">
            <SideNavBar />
            <div className="ml-0 min-h-screen bg-gradient-to-b from-gray-50 to-white pb-16 md:pb-0">
                <CodeHeader />
                <div className="container mx-auto px-4 py-8">
                    <h1 className="text-3xl font-bold mb-6">My Submissions</h1>

                    {loading ? (
                        <div className="flex justify-center items-center h-64">
                            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                        </div>
                    ) : error ? (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                            <span className="block sm:inline">{error}</span>
                        </div>
                    ) : submissions.length === 0 ? (
                        <div className="bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded relative" role="alert">
                            <span className="block sm:inline">You haven't submitted any solutions yet.</span>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
                                <thead className="bg-gray-100">
                                    <tr>
                                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Problem</th>
                                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Status</th>
                                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Language</th>
                                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Submitted At</th>
                                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {submissions.map((submission) => (
                                        <tr key={submission.id} className="hover:bg-gray-50">
                                            <td className="px-4 py-4">
                                                {problemMap[submission.problemId] ? (
                                                    <Link to={`/problem/${submission.problemId}`} className="text-blue-600 hover:text-blue-800">
                                                        {problemMap[submission.problemId].title}
                                                    </Link>
                                                ) : (
                                                    <span className="text-gray-500">Unknown Problem</span>
                                                )}
                                            </td>
                                            <td className="px-4 py-4">
                                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(submission.status)}`}>
                                                    {submission.status}
                                                </span>
                                            </td>
                                            <td className="px-4 py-4 text-sm">
                                                {getLanguageName(submission.languageId)}
                                            </td>
                                            <td className="px-4 py-4 text-sm text-gray-600">
                                                {formatDate(submission.createdAt)}
                                            </td>
                                            <td className="px-4 py-4">
                                                <Link
                                                    to={`/code/submission/${submission.id}`}
                                                    className="px-3 py-1 bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 text-sm"
                                                >
                                                    View Details
                                                </Link>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SubmissionsPage;