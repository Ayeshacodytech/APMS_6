import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMCQs, selectMCQs, selectGateStatus, selectGateError } from '../store/slices/gateSlice';
import { SideNavBar } from './SideNavbar';
import GateHeader from './gateHeader';
import GateMCQCard from './gatemcqCard';

const GateMCQs = () => {
    const [filter, setFilter] = useState('all'); // 'all', 'attempted', 'pending'
    const dispatch = useDispatch();

    // Get MCQs, status and error from Redux store
    const mcqs = useSelector(selectMCQs);
    const status = useSelector(selectGateStatus);
    const error = useSelector(selectGateStatus);

    // Fetch MCQs when component mounts and the status is idle
    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchMCQs());
        }
    }, [status, dispatch]);

    // Filtering logic remains the same:
    const filteredMCQs = mcqs.filter(mcq => {
        if (filter === 'all') return true;
        if (filter === 'attempted') return mcq.attempted;
        if (filter === 'pending') return !mcq.attempted;
        return true;
    });

    return (
        <div className="bg-gradient-to-l object-fill min-h-screen">
            <SideNavBar />

            <div className="ml-0 min-h-screen bg-gradient-to-b from-gray-50 to-white pb-16 md:pb-0">
                <GateHeader />
                <div className="container mx-auto px-4 py-8">
                    <div className="flex md:flex-row flex-col justify-between items-center mb-8">
                        <h1 className="text-3xl font-bold text-gray-800">GATE MCQs</h1>
                        <div className="flex gap-2 py-2">
                            <button
                                className={`px-4 py-2 rounded-md ${filter === 'all' ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-800'}`}
                                onClick={() => setFilter('all')}
                            >
                                All
                            </button>
                            <button
                                className={`px-4 py-2 rounded-md ${filter === 'attempted' ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-800'}`}
                                onClick={() => setFilter('attempted')}
                            >
                                Attempted
                            </button>
                            <button
                                className={`px-4 py-2 rounded-md ${filter === 'pending' ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-800'}`}
                                onClick={() => setFilter('pending')}
                            >
                                Pending
                            </button>
                        </div>
                    </div>

                    {/* Display loading and error states */}
                    {status === 'loading' && <p>Loading MCQs...</p>}
                    {status === 'failed' && <p className="text-red-500">{error}</p>}

                    {/* Display the filtered MCQs */}
                    {status === 'succeeded' && (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredMCQs.length > 0 ? (
                                filteredMCQs.map(mcq => (
                                    <GateMCQCard key={mcq.id} mcq={mcq} />
                                ))
                            ) : (
                                <div className="col-span-full text-center py-12">
                                    <p className="text-xl text-gray-600">No MCQs found for the selected filter.</p>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default GateMCQs;
