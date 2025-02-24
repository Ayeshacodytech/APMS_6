import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAdminJobs,
  selectCurrentJobs,
  selectJobsStatus,
  selectJobsError,
} from "../store/slices/jobSlice"; // Adjust the import path based on your file structure
import { AdminJob } from "../components/adminjob";
import AdminHeader from "../components/adminHeader";

const AdminHome = () => {
  const dispatch = useDispatch();
  const currentJobs = useSelector(selectCurrentJobs);
  const jobStatus = useSelector(selectJobsStatus);
  const jobError = useSelector(selectJobsError);

  useEffect(() => {
    if (jobStatus === "idle") {
      dispatch(fetchAdminJobs());
    }
  }, [jobStatus, dispatch]);
  useEffect(() => {
    dispatch(fetchAdminJobs()); // Fetch jobs when the component loads
  }, [dispatch]);

  if (jobStatus === "loading") {
    return <div>Loading...</div>;
  }

  if (jobStatus === "failed") {
    return <div>Error: {jobError}</div>;
  }

  return (
    <>
      <AdminHeader></AdminHeader>
      <div className="grid grid-cols-3 gap-6 px-1 pr-4 py-6">
        {currentJobs.map((job) => (
          <AdminJob key={job.id} job={job} />
        ))}
      </div>
    </>
  );
};

export default AdminHome;
