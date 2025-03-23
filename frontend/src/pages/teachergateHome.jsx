import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchResources, selectGateError, selectGateStatus, selectResources } from '../store/slices/teacherGateslice';

import { TeacherSideNavBar } from '../components/teacherSideNavbar';
import TeacherGateHeader from '../components/teachergateHeader';
import TeachergateResourceCard from '../components/teachergateresourceCard';

function TeacherGatehome() {
    const dispatch = useDispatch();
    const resources = useSelector(selectResources);
    const status = useSelector(selectGateStatus);
    const error = useSelector(selectGateError);

    // Fetch resources when component mounts and status is idle
    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchResources());
        }
    }, [status, dispatch]);

    // Debug logs
    console.log("Resources data:", resources);
    console.log("Status:", status);

    return (
        <div className="bg-gradient-to-l object-fill min-h-screen">
            <TeacherSideNavBar />
            <div className="ml-0 min-h-screen bg-gradient-to-b from-gray-50 to-white pb-16 md:pb-0">
                <TeacherGateHeader />
                {/* Main Content Area */}
                <div className="py-2 px-4 sm:px-6 lg:px-8 pb-12 max-w-screen-lg mx-auto">
                    {status === "loading" && <p>Loading resources...</p>}
                    {status === "failed" && <p className="text-red-500">{error}</p>}
                    
                    {/* Debug logs */}
                    {console.log("Status:", status)}
                    {console.log("Resources:", resources)}
                    
                    {/* Render resources if available */}
                    {status === "succeeded" && resources.length > 0 ? (
                        resources.map((resource) => (
                            <TeachergateResourceCard key={resource.id} resource={resource} />
                        ))
                    ) : (
                        status === "succeeded" && <p>No resources available.</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default TeacherGatehome;
