import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

export function CodeHeader() {
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
                            title="Home"
                            onClick={() => navigate("/code/home")}
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


                        <button
                            className="p-2 hover:bg-indigo-50 rounded-xl transition-all"
                            title="Leaderboard"
                            onClick={() => navigate("/code/leaderboard")}
                        >
                            <svg width="28px" height="28px" viewBox="0 0 48 48" fill="#6366F1" xmlns="http://www.w3.org/2000/svg">
                                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                                <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                                <g id="SVGRepo_iconCarrier">
                                    <rect width="48" height="48" fill="white" fill-opacity="0.01"></rect>
                                    <rect x="4" y="18" width="13" height="24" stroke="#ffffff" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"></rect> <rect x="17" y="6" width="13" height="36" stroke="#ffffff" stroke-width="1" stroke-linejoin="round"></rect>
                                    <rect x="30" y="26" width="13" height="16" stroke="#ffffff" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"></rect>
                                </g>
                            </svg>
                        </button>
                        <button
                            className="p-2 hover:bg-indigo-50 rounded-xl transition-all"
                            title="Submissions"
                            onClick={() => navigate("/code/submission")}
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

export default CodeHeader;
