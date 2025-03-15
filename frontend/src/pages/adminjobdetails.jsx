// import { SideNavBar } from "../components/SideNavbar";
// import { useLocation, useParams, useNavigate } from "react-router-dom";
// import { format } from "date-fns";
// import AdminHeader from "../components/adminHeader";

// function Adminjobdetails() {
//     const { id } = useParams();
//     const location = useLocation();
//     const navigate = useNavigate();
//     const { job } = location.state || {};

//     if (!job) {
//         return <p className="text-center text-red-500">Job details not found.</p>;
//     }

//     const deadline = new Date(job.deadline);
//     const companyVisit = new Date(job.companyvisit);

//     const formattedDeadline = format(deadline, "MMMM do, yyyy");
//     const formattedCompanyVisit = format(companyVisit, "MMMM do, yyyy");

//     const handleUpdate = () => {
//         navigate(`/admin/update/job/${id}`, { state: { job } });
//     };

//     return (
//         <div className="object-fill min-h-screen ">
//             <AdminHeader></AdminHeader>
//             <div className="px-8 py-8 bg-gradient-to-l from-[#a935fd] to-[#35fdf5] object-fill min-h-screen">
//                 <div className="shadow-lg max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6 space-y-4">
//                     <h2 className="text-2xl font-semibold text-gray-800">{job.CompanyName}</h2>

//                     <div className="space-y-2">
//                         <div className="flex justify-between">
//                             <span className="text-gray-600 font-medium">Role:</span>
//                             <span>{job.role}</span>
//                         </div>

//                         <div className="flex justify-between">
//                             <span className="text-gray-600 font-medium">Package:</span>
//                             <span>{job.package}</span>
//                         </div>

//                         <div className="flex justify-between">
//                             <span className="text-gray-600 font-medium">Job Description:</span>
//                             <span className="px-4">{job.jobdescription}</span>
//                         </div>

//                         <div className="flex justify-between">
//                             <span className="text-gray-600 font-medium">Type:</span>
//                             <span>{job.Type}</span>
//                         </div>

//                         <div className="flex justify-between">
//                             <span className="text-gray-600 font-medium">Eligibility:</span>
//                             <span>{job.eligibility}</span>
//                         </div>

//                         <div className="flex justify-between">
//                             <span className="text-gray-600 font-medium">Department:</span>
//                             <span>{job.department?.join(", ")}</span>
//                         </div>

//                         <div className="flex justify-between">
//                             <span className="text-gray-600 font-medium">Apply Link:</span>
//                             <a
//                                 href={job.applylink}
//                                 className="text-blue-500 underline"
//                                 target="_blank"
//                                 rel="noopener noreferrer"
//                             >
//                                 Apply Here
//                             </a>
//                         </div>

//                         <div className="flex justify-between">
//                             <span className="text-gray-600 font-medium">Deadline:</span>
//                             <span>{formattedDeadline}</span>
//                         </div>

//                         <div className="flex justify-between">
//                             <span className="text-gray-600 font-medium">Company Visit:</span>
//                             <span>{formattedCompanyVisit}</span>
//                         </div>

//                         <div className="flex justify-between">
//                             <span className="text-gray-600 font-medium">Status:</span>
//                             <span>{job.status}</span>
//                         </div>

//                         {/* Update Job Button */}
//                         <div className="flex justify-end pt-4 ">
//                             <button
//                                 onClick={handleUpdate}
//                                 className="px-4 py-2 text-white font-semibold rounded-md bg-gradient-to-l from-[#a935fd] to-[#35fdf5] transition"
//                             >
//                                 Update Job
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default Adminjobdetails;
import React, { useState } from 'react';
import { useLocation, useParams, useNavigate } from "react-router-dom";
import { format } from "date-fns";
import AdminHeader from "../components/adminHeader";

function AdminJobDetails() {
    const { id } = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const { job } = location.state || {};
    const [activeModal, setActiveModal] = useState(null);

    if (!job) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="bg-white rounded-lg shadow-lg p-6">
                    <p className="text-center text-red-500">Job details not found.</p>
                </div>
            </div>
        );
    }

    const deadline = new Date(job.deadline);
    const companyVisit = new Date(job.companyvisit);

    const formattedDeadline = format(deadline, "MMMM do, yyyy");
    const formattedCompanyVisit = format(companyVisit, "MMMM do, yyyy");

    const handleUpdate = () => {
        navigate(`/admin/update/job/${id}`, { state: { job } });
    };

    // Modal Component
    const Modal = ({ title, content, onClose }) => (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl">
                <div className="p-6 border-b">
                    <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
                </div>
                <div className="p-6 max-h-[70vh] overflow-y-auto">
                    {content}
                </div>
                <div className="p-4 border-t bg-gray-50 flex justify-end rounded-b-lg">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );

    // Truncate text helper
    const truncateText = (text, length = 100) => {
        if (text?.length > length) {
            return text.substring(0, length) + '...';
        }
        return text;
    };

    // Clickable Container Component
    const InfoContainer = ({ title, children, modalContent }) => (
        <div
            className="bg-gray-50 p-4 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors"
            onClick={() => setActiveModal({ title, content: modalContent })}
        >
            <h3 className="text-lg font-semibold text-gray-700 mb-2">{title}</h3>
            <div className="space-y-2">
                {children}
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-50">
            <AdminHeader />
            <div className="px-4 py-8 max-w-7xl mx-auto">
                <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                    <div className="bg-gradient-to-r from-purple-500 to-cyan-400 p-6">
                        <h1 className="text-3xl font-bold text-white">
                            {job.CompanyName}
                        </h1>
                        <div className="mt-2">
                            <span className="px-3 py-1 text-sm bg-white/20 text-white rounded-full">
                                {job.status}
                            </span>
                        </div>
                    </div>

                    <div className="p-6">
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-4">
                                <InfoContainer
                                    title="Role Details"
                                    modalContent={
                                        <div className="space-y-4">
                                            <div className="flex justify-between items-center">
                                                <span className="text-gray-600">Position</span>
                                                <span className="font-medium">{job.role}</span>
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <span className="text-gray-600">Package</span>
                                                <span className="font-medium">{job.package}</span>
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <span className="text-gray-600">Type</span>
                                                <span className="font-medium">{job.Type}</span>
                                            </div>
                                        </div>
                                    }
                                >
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-600">Position</span>
                                        <span className="font-medium">{truncateText(job.role, 30)}</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-600">Package</span>
                                        <span className="font-medium">{truncateText(job.package, 20)}</span>
                                    </div>
                                </InfoContainer>

                                <InfoContainer
                                    title="Requirements"
                                    modalContent={
                                        <div className="space-y-4">
                                            <div className="flex justify-between items-center">
                                                <span className="text-gray-600">Eligibility</span>
                                                <span className="font-medium">{job.eligibility}</span>
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <span className="text-gray-600">Department</span>
                                                <span className="font-medium">{job.department?.join(", ")}</span>
                                            </div>
                                        </div>
                                    }
                                >
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-600">Eligibility</span>
                                        <span className="font-medium">{truncateText(job.eligibility, 30)}</span>
                                    </div>
                                </InfoContainer>
                            </div>

                            <div className="space-y-4">
                                <InfoContainer
                                    title="Important Dates"
                                    modalContent={
                                        <div className="space-y-4">
                                            <div className="flex justify-between items-center">
                                                <span className="text-gray-600">Application Deadline</span>
                                                <span className="font-medium">{formattedDeadline}</span>
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <span className="text-gray-600">Company Visit</span>
                                                <span className="font-medium">{formattedCompanyVisit}</span>
                                            </div>
                                        </div>
                                    }
                                >
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-600">Deadline</span>
                                        <span className="font-medium">{formattedDeadline}</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-600">Company visit</span>
                                        <span className="font-medium">{formattedCompanyVisit}</span>
                                    </div>
                                </InfoContainer>

                                <InfoContainer
                                    title="Job Description"
                                    modalContent={
                                        <div className="prose max-w-none">
                                            <p className="text-gray-600 break-words whitespace-pre-line">{job.jobdescription}</p>
                                        </div>
                                    }
                                >
                                    <p className="text-gray-600 break-words whitespace-pre-line">
                                        {truncateText(job.jobdescription, 150)}
                                    </p>
                                </InfoContainer>
                            </div>
                        </div>

                        <div className="mt-6 flex justify-between items-center">
                            <a
                                href={job.applylink}
                                className="text-purple-600 hover:text-purple-700 font-medium flex items-center gap-2"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Apply Now
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                </svg>
                            </a>

                            <button
                                onClick={handleUpdate}
                                className="px-6 py-2 bg-gradient-to-r from-purple-500 to-cyan-400 text-white font-medium rounded-lg hover:opacity-90 transition-opacity"
                            >
                                Update Job
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal */}
            {activeModal && (
                <Modal
                    title={activeModal.title}
                    content={activeModal.content}
                    onClose={() => setActiveModal(null)}
                />
            )}
        </div>
    );
}

export default AdminJobDetails;