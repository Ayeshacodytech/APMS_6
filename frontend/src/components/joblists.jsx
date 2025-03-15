import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchJobs, selectCurrentJobs, selectJobsStatus, selectJobsError } from "../store/slices/jobSlice"; // Adjust the import path based on your file structure
import { Job } from "./job";

export function JobLists() {
    const dispatch = useDispatch();
    const currentJobs = useSelector(selectCurrentJobs);
    const jobStatus = useSelector(selectJobsStatus);
    const jobError = useSelector(selectJobsError);

    useEffect(() => {
        if (jobStatus === "idle") {
            dispatch(fetchJobs());
        }
    }, [jobStatus, dispatch]);

    if (jobStatus === "loading") {
        return <div>Loading...</div>;
    }

    if (jobStatus === "failed") {
        return <div>Error: {jobError}</div>;
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4 py-6">
            {currentJobs.map((job) => (
                <Job key={job.id} job={job} />
            ))}
        </div>
    );

}
