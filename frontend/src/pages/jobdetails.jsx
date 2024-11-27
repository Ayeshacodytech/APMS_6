import React from "react";
import { SideNavBar } from "../components/SideNavbar";
import { useLocation, useParams } from "react-router-dom";
import { format } from "date-fns";

function JobDetails() {
  const location = useLocation();
  const { job } = location.state || {};
  const deadline = new Date(job.deadline);
  const companyVisit = new Date(job.companyvisit);

  const formattedDeadline = format(deadline, "MMMM do, yyyy");
  const formattedCompanyVisit = format(companyVisit, "MMMM do, yyyy");
  return (
    <div className="bg-gradient-to-l from-[#a935fd] to-[#35fdf5] object-fill min-h-screen">
      <SideNavBar></SideNavBar>
      <div className="pl-52 py-8">
        <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6 space-y-4">
          <h2 className="text-2xl font-semibold text-gray-800">
            {job.CompanyName}
          </h2>

          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600 font-medium">Role:</span>
              <span>{job.role}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-600 font-medium">Package:</span>
              <span>{job.package}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-600 font-medium">
                Job Description:
              </span>
              <span className="px-4">{job.jobdescription}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-600 font-medium">Type</span>
              <span>{job.Type}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-600 font-medium">Eligibility:</span>
              <span>{job.eligibility}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-600 font-medium">Department:</span>
              <span>
                {job.department && job.department.length > 0
                  ? job.departmant.join(", ")
                  : "N/A"}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-600 font-medium">Apply Link:</span>
              <a
                href={job.applylink}
                className="text-blue-500 underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Apply Here
              </a>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-600 font-medium">Deadline:</span>
              <span>{formattedDeadline}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-600 font-medium">Company Visit:</span>
              <span>{formattedCompanyVisit}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-600 font-medium">Status:</span>
              <span>{job.status}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default JobDetails;
