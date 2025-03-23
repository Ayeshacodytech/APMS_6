import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    fetchMyResources,
    selectMyResources,
    selectGateStatus,
    selectGateError
} from '../store/slices/teacherGateslice';
import { TeacherSideNavBar } from '../components/teacherSideNavbar';
import TeacherGateHeader from '../components/teachergateHeader';
import TeacherGateResource from '../components/teacherGateresource';

function TeacherGateProfile() {
    const dispatch = useDispatch();

    // Get myResources, status, and error from your aptitude slice
    const myResources = useSelector(selectMyResources);
    const status = useSelector(selectGateStatus);
    const error = useSelector(selectGateError);

    console.log("My Resources:", myResources);

    useEffect(() => {
        dispatch(fetchMyResources());
    }, [dispatch]);

    // Display loading or error state if needed
    if (status === 'loading') {
        return <div>Loading...</div>;
    }

    if (status === 'failed') {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="bg-gradient-to-l object-fill min-h-screen">
            <TeacherSideNavBar />

            <div className="ml-0 min-h-screen bg-gradient-to-b from-gray-50 to-white pb-16 md:pb-0">
                <TeacherGateHeader />

                <div className="py-2 px-8 pb-12 max-w-5xl mx-auto">
                    {myResources && myResources.length > 0 ? (
                        myResources.map((resource) => (
                            <TeacherGateResource key={resource.id} resource={resource} />
                        ))
                    ) : (
                        <p>No resources available</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default TeacherGateProfile;
