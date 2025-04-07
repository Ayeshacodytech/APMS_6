import { useState, useEffect, useRef } from "react";
import Notifications from "./notification";
import { useNavigate } from "react-router-dom";
import TeacherNotifications from "./teachernotification";

export function TeacherCommunityHeader() {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="shadow-lg border rounded-lg backdrop-blur bg-white/30 w-full">
      <div className="max-w-[1400px] mx-auto px-4 md:px-6">
        {/* On mobile, stack vertically; on md+ screens show in a row */}
        <div className="flex flex-col md:flex-row justify-between items-center py-2 md:py-0">
          {/* Left: Logo and name */}
          <div className="flex items-center">
            <div className="w-12 h-12 md:w-16 pt-4 md:h-16 flex items-center justify-center">
                            <svg
                                className="w-full h-full"
                                viewBox="0 0 200 200"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <text
                                    x="20"
                                    y="100"
                                    fontFamily="grechen"
                                    fontSize="100"
                                    fontWeight="bold"
                                    fill="#6366F1"
                                >
                                    F
                                </text>
                                <text
                                    x="50"
                                    y="100"
                                    fontFamily="grechen"
                                    fontSize="50"
                                    fontWeight="bold"
                                    fill="#6366F1"
                                >
                                    F
                                </text>
                            </svg>
                        </div>
                        <span className="fontfamily-grechen text-2xl text-[#6366F1] font-bold ml-2">
                            Futureforge
                        </span>
          </div>

          {/* Right: Navigation Buttons */}
          <div className="flex items-center gap-4 mt-2 md:mt-0">
            <button
              className="p-2 hover:bg-indigo-50 rounded-xl transition-all"
              title="Community Home"
              onClick={() => navigate("/teacher/community")}
            >
              <svg
                fill="#6366F1"
                width="28px"
                height="28px"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                stroke="#6366F1"
              >
                <path d="M3.012,10.981,3,11H5v9a1,1,0,0,0,1,1H18a1,1,0,0,0,1-1V11h2a1,1,0,0,0,.555-1.832l-9-6a1,1,0,0,0-1.11,0l-9,6a1,1,0,0,0-.277,1.387A.98.98,0,0,0,3.012,10.981ZM10,14a1,1,0,0,1,1-1h2a1,1,0,0,1,1,1v5H10Z"></path>
              </svg>
            </button>

            <div className="relative" ref={dropdownRef}>
              <button
                className="p-2 hover:bg-indigo-50 rounded-xl transition-all"
                title="Notifications"
                aria-label="Notifications"
                onClick={() => setShowDropdown(!showDropdown)}
              >
                <svg
                  width="28px"
                  height="28px"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  stroke="#6366F1"
                >
                  <path
                    d="M10.88 2.603A.75.75 0 0 1 11.614 2h.77a.75.75 0 0 1 .735.603l.143.712a1.5 1.5 0 0 0 .75 1.02l.3.165a5.586 5.586 0 0 1 3.239 4.47l.54 4.864c.101.905.564 1.732 1.283 2.291l.354.275a1.5 1.5 0 0 1 .534 1.548L20.25 18a1.32 1.32 0 0 1-1.281 1H15a3 3 0 1 1-6 0H5.03a1.32 1.32 0 0 1-1.28-1l-.013-.052A1.5 1.5 0 0 1 4.27 16.4l.354-.275a3.375 3.375 0 0 0 1.282-2.291l.54-4.865A5.586 5.586 0 0 1 9.688 4.5l.3-.164a1.5 1.5 0 0 0 .75-1.021l.142-.712z"
                    fill="#6366F1"
                  ></path>
                </svg>
              </button>
              {showDropdown && (
                <div className="absolute -right-56 p-3 z-16">
                  <TeacherNotifications />
                </div>
              )}
            </div>

            <button
              className="p-2 hover:bg-indigo-50 rounded-xl transition-all"
              title="New Article"
              onClick={() => navigate("/teacher/new")}
            >
              <svg
                width="28px"
                height="28px"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                stroke="#6366F1"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10zm-5.5-9a1 1 0 1 1 0-2H11V6.5a1 1 0 1 1 2 0V11h4.5a1 1 0 1 1 0 2H13v4.5a1 1 0 1 1-2 0V13H6.5z"
                  fill="#6366F1"
                ></path>
              </svg>
            </button>

            <button
              className="p-2 hover:bg-indigo-50 rounded-xl transition-all"
              title="My articles"
              onClick={() => navigate("/teacher/communityprofile")}
            >
              <svg
                width="28px"
                height="28px"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                fill="#6366F1"
              >
                <path d="M20 22H4a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1zM7 6v4h4V6H7zm0 6v2h10v-2H7zm0 4v2h10v-2H7zm6-9v2h4V7h-4z"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default TeacherCommunityHeader;
