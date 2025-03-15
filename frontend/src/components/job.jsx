import { useNavigate } from "react-router-dom";
export function Job({job}) {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/jobs/${job.id}`, { state: { job } });
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
        <div className="px-4 py-3 bg-gray-50 flex justify-center gap-2">
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
