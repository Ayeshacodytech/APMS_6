import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMyMCQs, selectMyMCQs, selectGateStatus, selectGateError } from '../store/slices/teacherGateslice';
import { TeacherSideNavBar } from './teacherSideNavbar';
import TeacherGateHeader from './teachergateHeader';
import TeacherMyGateMCQCard from './teachermygatemcqcard';

const TeacherGatemyMCQs = () => {
    const dispatch = useDispatch();
    // Select teacher's MCQs and Resources plus global status & error.
    const myMCQ = useSelector(selectMyMCQs);
    console.log('My check MCQs:', myMCQ);
    const status = useSelector(selectGateStatus);
    const error = useSelector(selectGateError);
    const fullState = useSelector((state) => state);
    console.log("Full Redux State:", fullState);

    const myMCQs = fullState.teacheraptitude.myMCQ || []; // Accessing directly
    console.log("My MCQs from Full State:", myMCQs);
    // Dispatch fetch actions when component mounts
    console.log('My check MCQs:', myMCQ);
    
    useEffect(() => {
        dispatch(fetchMyMCQs());
    }, [dispatch]);
    console.log("status:", status);

    return (
        <div className="bg-gradient-to-l object-fill min-h-screen">
            <TeacherSideNavBar />

            <div className="ml-0 min-h-screen bg-gradient-to-b from-gray-50 to-white pb-16 md:pb-0">
                <TeacherGateHeader />

                <div className="container mx-auto px-4 py-8">
                    {status === 'loading' && <p>Loading your data...</p>}
                    {status === 'failed' && <p className="text-red-500">{error}</p>}

                    {status === 'idle' && (
                        <>
                            {/* My MCQs Section */}
                            <section className="mb-12">
                                <h1 className="text-3xl font-bold text-gray-800 mb-6">My MCQs</h1>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {myMCQs && myMCQs.length > 0 ? (
                                        myMCQs.map((mcq) => (
                                            <TeacherMyGateMCQCard key={mcq.id} mcq={mcq} />
                                        ))
                                    ) : (
                                        <p className="col-span-full text-center py-12 text-xl text-gray-600">
                                            No MCQs found.
                                        </p>
                                    )}
                                </div>
                            </section>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default TeacherGatemyMCQs;
