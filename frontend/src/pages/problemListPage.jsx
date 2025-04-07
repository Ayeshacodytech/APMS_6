import axios from 'axios';
import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { SideNavBar } from '../components/SideNavbar';
import CodeHeader from '../components/codeHeader';

const ProblemListPage = () => {
    const [problems, setProblems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filterTag, setFilterTag] = useState('');
    const [allTags, setAllTags] = useState([]);

    useEffect(() => {
        const fetchProblems = async () => {
            setLoading(true);
            try {
                const url = filterTag
                    ? `https://futureforge.onrender.com/api/v1/problem?tag=${filterTag}`
                    : 'https://futureforge.onrender.com/api/v1/problem/';

                const response = await axios.get(url, {
                    headers: { Authorization: `Bearer ${Cookies.get("token")}` },
                });
                setProblems(response.data);

                // Extract unique tags
                const tags = new Set();
                response.data.forEach(problem => {
                    if (problem.tags) {
                        problem.tags.split(',').forEach(tag => tags.add(tag.trim()));
                    }
                });
                setAllTags(Array.from(tags));
            } catch (err) {
                console.error('Error fetching problems:', err);
                setError('Failed to load problems. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchProblems();
    }, [filterTag]);

    const getDifficultyColor = (difficulty) => {
        switch (difficulty) {
            case 'EASY': return 'text-green-500';
            case 'MEDIUM': return 'text-yellow-500';
            case 'HARD': return 'text-red-500';
            default: return 'text-gray-500';
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'Accepted': return 'text-green-500';
            case 'Wrong Answer': return 'text-red-500';
            case 'ERROR': return 'text-orange-500';
            default: return 'text-gray-400';
        }
    };

    return (
        <div className="bg-gradient-to-l object-fill min-h-screen">
            <SideNavBar />
            <div className="ml-0 min-h-screen bg-gradient-to-b from-gray-50 to-white pb-16 md:pb-0">
                <CodeHeader />
                <div className="container mx-auto px-4 py-8">
                    <h1 className="text-3xl font-bold mb-6">Problem List</h1>

                    {/* Filter section */}
                    <div className="mb-6">
                        <div className="flex flex-wrap items-center gap-2 mb-4">
                            <span className="font-medium">Filter by tag:</span>
                            <button
                                className={`px-3 py-1 rounded-full text-sm ${filterTag === '' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                                onClick={() => setFilterTag('')}
                            >
                                All
                            </button>
                            {allTags.map(tag => (
                                <button
                                    key={tag}
                                    className={`px-3 py-1 rounded-full text-sm ${filterTag === tag ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                                    onClick={() => setFilterTag(tag)}
                                >
                                    {tag}
                                </button>
                            ))}
                        </div>
                    </div>

                    {loading ? (
                        <div className="flex justify-center items-center h-64">
                            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                        </div>
                    ) : error ? (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                            <span className="block sm:inline">{error}</span>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
                                <thead className="bg-gray-100">
                                    <tr>
                                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Status</th>
                                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Title</th>
                                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Difficulty</th>
                                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Tags</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {problems.map((problem) => (
                                        <tr key={problem.id} className="hover:bg-gray-50">
                                            <td className="px-4 py-4">
                                                <span className={`inline-block w-3 h-3 rounded-full ${getStatusColor(problem.userBestStatus)} mr-2`}></span>
                                                <span className={getStatusColor(problem.userBestStatus)}>{problem.userBestStatus || 'Not Attempted'}</span>
                                            </td>
                                            <td className="px-4 py-4">
                                                <Link to={`/code/problem/${problem.id}`} className="text-blue-600 hover:text-blue-800 font-medium">
                                                    {problem.title}
                                                </Link>
                                            </td>
                                            <td className={`px-4 py-4 ${getDifficultyColor(problem.difficulty)}`}>
                                                {problem.difficulty}
                                            </td>
                                            <td className="px-4 py-4">
                                                <div className="flex flex-wrap gap-1">
                                                    {problem.tags && problem.tags.split(',').map((tag, index) => (
                                                        <span key={index} className="bg-gray-200 px-2 py-1 rounded-full text-xs">
                                                            {tag.trim()}
                                                        </span>
                                                    ))}
                                                </div>
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

export default ProblemListPage;