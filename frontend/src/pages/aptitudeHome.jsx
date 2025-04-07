import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AptitudeHeader from '../components/aptitudeHeader';
import { SideNavBar } from '../components/SideNavbar';
import { fetchResources, selectAptitudeError, selectAptitudeStatus, selectResources } from '../store/slices/aptitudeSlice';
import ResourceCard from '../components/resourceCard'; // Use ResourceCard only

function Aptitudehome() {
    const dispatch = useDispatch();
    const resources = useSelector(selectResources);
    const status = useSelector(selectAptitudeStatus);
    const error = useSelector(selectAptitudeError);

    // Fetch resources when component mounts and status is idle
    useEffect(() => {
            dispatch(fetchResources());
    }, [dispatch]);

    // Debug logs
    console.log("Resources data:", resources);
    console.log("Status:", status);

    return (
        <div className="bg-gradient-to-l object-fill min-h-screen">
            <SideNavBar />
            <div className="ml-0 min-h-screen bg-gradient-to-b from-gray-50 to-white pb-16 md:pb-0">
                <AptitudeHeader />
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
                            <ResourceCard key={resource.id} resource={resource} />
                        ))
                    ) : (
                        status === "succeeded" && <p>No resources available.</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Aptitudehome;
