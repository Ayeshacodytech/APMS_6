// import { useNavigate } from "react-router-dom";
// import { deleteJob } from "../store/slices/jobSlice";
// import { useDispatch } from "react-redux";
// export function Adminjob({job}) {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const handleClick = () => {
//     navigate(`/admin/jobs/${job.id}`, { state: { job } });
//   };
//   const handleDelete = (id) => {
//     dispatch(deleteJob(id));
// };
//   return (
//     <div className="col-span-1 transition-transform transform hover:scale-105">
//       <div className="border h-64 bg-gray-200 rounded-lg">
//         <div className="text-lg flex justify-center py-2 font-bold italic bg-gradient-to-tl from-[#35fdf5] via-[#6f5eff] to-[#a935fd] text-white item-center rounded-lg">
//         {job.CompanyName}
//         </div>
//         <div className="flex pl-8 py-2">
//           <div className="pt-0.5">
//             <svg
//               width="20px"
//               height="20px"
//               viewBox="0 0 24 24"
//               fill="none"
//               xmlns="http://www.w3.org/2000/svg"
//             >
//               <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
//               <g
//                 id="SVGRepo_tracerCarrier"
//                 stroke-linecap="round"
//                 stroke-linejoin="round"
//               ></g>
//               <g id="SVGRepo_iconCarrier">
//                 {" "}
//                 <path
//                   d="M9 7H5C3.89543 7 3 7.89543 3 9V18C3 19.1046 3.89543 20 5 20H19C20.1046 20 21 19.1046 21 18V9C21 7.89543 20.1046 7 19 7H15M9 7V5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7M9 7H15"
//                   stroke="#000000"
//                   stroke-width="2"
//                   stroke-linecap="round"
//                   stroke-linejoin="round"
//                 ></path>{" "}
//               </g>
//             </svg>
//           </div>
//           <div className="text-md italic">Role:</div>
//           <div className="pl-4 text-md font-semibold">{job.role}</div>
//         </div>
//         <div className="flex pl-8 py-1">
//           <div className="pt-0.5">
//             <svg
//               width="20px"
//               height="20px"
//               viewBox="0 0 64 64"
//               xmlns="http://www.w3.org/2000/svg"
//               stroke-width="3"
//               stroke="#000000"
//               fill="none"
//             >
//               <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
//               <g
//                 id="SVGRepo_tracerCarrier"
//                 stroke-linecap="round"
//                 stroke-linejoin="round"
//               ></g>
//               <g id="SVGRepo_iconCarrier">
//                 <rect x="7.18" y="16.7" width="50.86" height="29.87"></rect>
//                 <path d="M17.22,16.55a10,10,0,0,1-10,10.05"></path>
//                 <path d="M17.51,46.57a10.05,10.05,0,0,0-10-10"></path>
//                 <path d="M48.16,16.55A10.05,10.05,0,0,0,58.21,26.6"></path>
//                 <path d="M48,46.57a10.05,10.05,0,0,1,10-10"></path>
//                 <path
//                   d="M28.47,22.3H31c2.49,0,5.23.81,5.23,4.6,0,4.11-3.48,5.68-7.18,5.26a.21.21,0,0,0-.17.36L36.74,41"
//                   stroke-linecap="round"
//                 ></path>
//                 <line
//                   x1="39.24"
//                   y1="22.3"
//                   x2="30.45"
//                   y2="22.3"
//                   stroke-linecap="round"
//                 ></line>
//                 <line
//                   x1="28.59"
//                   y1="27.03"
//                   x2="39.3"
//                   y2="27.03"
//                   stroke-linecap="round"
//                 ></line>
//               </g>
//             </svg>
//           </div>
//           <div className="text-md italic">Package:</div>
//           <div className="pl-4 text-md font-semibold">{job.package}</div>
//         </div>
//         <div className="flex pl-8 py-2">
//           <div className="pt-0.5">
//             <svg
//               width="20px"
//               height="20px"
//               viewBox="0 0 24 24"
//               fill="none"
//               xmlns="http://www.w3.org/2000/svg"
//             >
//               <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
//               <g
//                 id="SVGRepo_tracerCarrier"
//                 stroke-linecap="round"
//                 stroke-linejoin="round"
//               ></g>
//               <g id="SVGRepo_iconCarrier">
//                 {" "}
//                 <path
//                   d="M9 7H5C3.89543 7 3 7.89543 3 9V18C3 19.1046 3.89543 20 5 20H19C20.1046 20 21 19.1046 21 18V9C21 7.89543 20.1046 7 19 7H15M9 7V5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7M9 7H15"
//                   stroke="#000000"
//                   stroke-width="2"
//                   stroke-linecap="round"
//                   stroke-linejoin="round"
//                 ></path>{" "}
//               </g>
//             </svg>
//           </div>
//           <div className="text-md italic">Type:</div>
//           <div className="pl-4 text-md font-semibold">{job.Type}</div>
//         </div>
//         <div className="flex pl-8 py-2">
//           <div className="pt-0.5">
//             <svg
//               width="20px"
//               height="20px"
//               viewBox="0 0 16 16"
//               version="1.1"
//               xmlns="http://www.w3.org/2000/svg"
//               xmlns:xlink="http://www.w3.org/1999/xlink"
//               fill="#000000"
//             >
//               <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
//               <g
//                 id="SVGRepo_tracerCarrier"
//                 stroke-linecap="round"
//                 stroke-linejoin="round"
//               ></g>
//               <g id="SVGRepo_iconCarrier">
//                 {" "}
//                 <path
//                   fill="#444"
//                   d="M5 16v-5.3c-0.6-0.3-1-1-1-1.7v-4c0-0.7 0.4-1.3 1-1.7 0-0.1 0-0.2 0-0.3 0-1.1-0.9-2-2-2s-2 0.9-2 2c0 1.1 0.9 2 2 2h-2c-0.5 0-1 0.5-1 1v4c0 0.5 0.5 1 1 1v5h4z"
//                 ></path>{" "}
//                 <path
//                   fill="#444"
//                   d="M15 5h-2c1.1 0 2-0.9 2-2s-0.9-2-2-2-2 0.9-2 2c0 0.1 0 0.2 0 0.3 0.6 0.4 1 1 1 1.7v4c0 0.7-0.4 1.4-1 1.7v5.3h4v-5c0.5 0 1-0.5 1-1v-4c0-0.5-0.5-1-1-1z"
//                 ></path>{" "}
//                 <path
//                   fill="#444"
//                   d="M10 2c0 1.105-0.895 2-2 2s-2-0.895-2-2c0-1.105 0.895-2 2-2s2 0.895 2 2z"
//                 ></path>{" "}
//                 <path
//                   fill="#444"
//                   d="M10 4h-4c-0.5 0-1 0.5-1 1v4c0 0.5 0.5 1 1 1v6h4v-6c0.5 0 1-0.5 1-1v-4c0-0.5-0.5-1-1-1z"
//                 ></path>{" "}
//               </g>
//             </svg>
//           </div>
//           <div className="text-md italic">Department:</div>
//           <div className="pl-4 text-md font-semibold">
//           {job.department?.join(", ")}
//           </div>
//         </div>
//         <div className="pt-2 flex px-8 justify-between">
//           <div className="">
//             <button className="bg-gradient-to-tl from-[#35fdf5] via-[#6f5eff] to-[#a935fd] text-white font-semibold py-1 px-3 rounded-lg transition-transform transform hover:scale-110">
//               Apply
//             </button>
//           </div>
//           <div>
//             <button className="bg-gradient-to-tl from-[#35fdf5] via-[#6f5eff] to-[#a935fd] text-white font-semibold py-1 px-3 rounded-lg transition-transform transform hover:scale-110" onClick={handleClick}>
//               View job
//             </button>
//           </div>
          
//           <div className="">
//             <button className="bg-gradient-to-tl from-[#35fdf5] via-[#6f5eff] to-[#a935fd] text-white font-semibold py-1 px-3 rounded-lg transition-transform transform hover:scale-110" onClick={() => handleDelete(job.id)}>
//               Delete
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
import React from 'react';
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteJob } from "../store/slices/jobSlice";

export function AdminJob({ job }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleClick = () => {
    navigate(`/admin/jobs/${job.id}`, { state: { job } });
  };

  const handleDelete = (id) => {
    dispatch(deleteJob(id));
  };

  return (
    <div className="transform transition-all duration-300 hover:scale-105">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-400 p-4">
          <h3 className="text-lg font-bold text-white text-center">
            {job.CompanyName}
          </h3>
        </div>

        {/* Content */}
        <div className="p-4 space-y-3">
          {/* Role */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 flex items-center justify-center bg-purple-100 rounded-lg">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-purple-600">
                <path d="M9 7H5C3.89543 7 3 7.89543 3 9V18C3 19.1046 3.89543 20 5 20H19C20.1046 20 21 19.1046 21 18V9C21 7.89543 20.1046 7 19 7H15M9 7V5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7M9 7H15" 
                      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div className="flex-1">
              <span className="text-gray-600 text-sm">Role</span>
              <p className="font-medium">{job.role}</p>
            </div>
          </div>

          {/* Package */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 flex items-center justify-center bg-blue-100 rounded-lg">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-blue-600">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.31-8.86c-1.77-.45-2.34-.94-2.34-1.67 0-.84.79-1.43 2.1-1.43 1.38 0 1.9.66 1.94 1.64h1.71c-.05-1.34-.87-2.57-2.49-2.97V5H10.9v1.69c-1.51.32-2.72 1.3-2.72 2.81 0 1.79 1.49 2.69 3.66 3.21 1.95.46 2.34 1.15 2.34 1.87 0 .53-.39 1.39-2.1 1.39-1.6 0-2.23-.72-2.32-1.64H8.04c.1 1.7 1.36 2.66 2.86 2.97V19h2.34v-1.67c1.52-.29 2.72-1.16 2.73-2.77-.01-2.2-1.9-2.96-3.66-3.42z" 
                      fill="currentColor"/>
              </svg>
            </div>
            <div className="flex-1">
              <span className="text-gray-600 text-sm">Package</span>
              <p className="font-medium">{job.package}</p>
            </div>
          </div>

          {/* Type */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 flex items-center justify-center bg-cyan-100 rounded-lg">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-cyan-600">
                <path d="M21 13.2V6.8C21 5.11984 21 4.27976 20.673 3.63803C20.3854 3.07354 19.9265 2.6146 19.362 2.32698C18.7202 2 17.8802 2 16.2 2H7.8C6.11984 2 5.27976 2 4.63803 2.32698C4.07354 2.6146 3.6146 3.07354 3.32698 3.63803C3 4.27976 3 5.11984 3 6.8V13.2C3 14.8802 3 15.7202 3.32698 16.362C3.6146 16.9265 4.07354 17.3854 4.63803 17.673C5.27976 18 6.11984 18 7.8 18H16.2C17.8802 18 18.7202 18 19.362 17.673C19.9265 17.3854 20.3854 16.9265 20.673 16.362C21 15.7202 21 14.8802 21 13.2Z" 
                      stroke="currentColor" strokeWidth="2"/>
                <path d="M7 22H17" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                <path d="M12 18V22" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </div>
            <div className="flex-1">
              <span className="text-gray-600 text-sm">Type</span>
              <p className="font-medium">{job.Type}</p>
            </div>
          </div>

          {/* Department */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 flex items-center justify-center bg-green-100 rounded-lg">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-green-600">
                <path d="M17 20H7M12 4V16M12 16L7 11M12 16L17 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div className="flex-1">
              <span className="text-gray-600 text-sm">Department</span>
              <p className="font-medium">{job.department?.join(", ")}</p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="px-4 py-3 bg-gray-50 flex justify-between gap-2">
          <button 
            onClick={() => handleDelete(job.id)}
            className="px-4 py-2 text-sm bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
          >
            Delete
          </button>
          <button 
            onClick={handleClick}
            className="px-4 py-2 text-sm bg-gradient-to-r from-purple-500 to-cyan-400 text-white rounded-lg hover:opacity-90 transition-opacity"
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
}