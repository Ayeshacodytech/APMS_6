import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

export function GateHeader() {
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
                        <div className="w-12 h-12 md:w-16 md:h-16 flex items-center justify-center">
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
                                    fill="white"
                                >
                                    F
                                </text>
                                <text
                                    x="50"
                                    y="100"
                                    fontFamily="grechen"
                                    fontSize="50"
                                    fontWeight="bold"
                                    fill="white"
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
                            onClick={() => navigate("/gate")}
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
                            title="New Article"
                            onClick={() => navigate("/gate/new/resource")}
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
                            title="Practice MCQs"
                            onClick={() => navigate("/gate/mcq")}
                        >
                            <svg fill="#6366F1" height="25px" width="25px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 452.986 452.986" xml:space="preserve" stroke="#6366F1">
                                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                                <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                                <g id="SVGRepo_iconCarrier">
                                    <g>
                                        <g>
                                            <g>
                                                <path d="M387.724,0H65.306C32.108,0,5.08,27.007,5.08,60.226v246.532c0,33.176,27.028,60.161,60.226,60.161h35.031 c0,0-25.777,59.061-37.619,86.067c35.441-34.707,87.793-86.067,87.793-86.067h237.192c33.241,0,60.204-26.985,60.204-60.161 V60.226C447.928,27.007,420.921,0,387.724,0z M236.081,290.084c-3.71,3.818-8.175,5.738-13.417,5.738 c-5.177,0-9.685-1.898-13.352-5.652c-3.689-3.775-5.544-8.456-5.544-13.956c0-5.263,1.855-9.728,5.544-13.352 c3.689-3.581,8.175-5.393,13.352-5.393c5.242,0,9.707,1.812,13.417,5.479c3.645,3.667,5.501,8.046,5.501,13.266 C241.582,281.65,239.727,286.266,236.081,290.084z M282.092,154.533c-2.89,5.975-10.332,14.323-22.11,25.173 c-15.423,13.848-24.763,24.073-28.085,30.674c-3.279,6.601-5.091,17.537-5.393,32.766h-8.369c0-12.338,0.647-22.132,1.877-29.25 c1.337-7.14,3.041-12.727,5.048-16.89c2.049-4.098,7.269-11.691,15.617-22.779c6.601-8.542,11.238-16.631,13.935-24.246 c2.61-7.571,4.055-15.984,4.055-25.087c0-12.36-3.538-22.326-10.483-29.897c-6.881-7.528-15.445-11.303-25.497-11.303 c-8.671,0-15.855,2.157-21.679,6.428c-5.846,4.271-8.693,8.671-8.693,13.201c0,2.502,2.028,5.35,6.083,8.499 c6.083,4.81,9.189,10.052,9.189,15.725c0,5.026-1.596,9.275-4.897,12.597c-3.279,3.3-7.399,5.004-12.295,5.004 c-5.91,0-10.872-2.373-14.884-7.118c-4.055-4.681-6.083-10.893-6.083-18.551c0-12.08,5.565-22.908,16.674-32.529 c11.174-9.599,25.152-14.388,42.041-14.388c17.386,0,31.58,5.328,42.883,16.07c11.26,10.656,16.912,23.728,16.912,39.151 C287.959,137.622,285.975,146.573,282.092,154.533z"></path>
                                            </g>
                                        </g>
                                        <g></g>
                                        <g></g>
                                        <g></g>
                                        <g></g>
                                        <g></g>
                                        <g> </g>
                                        <g> </g>
                                        <g> </g>
                                        <g> </g>
                                        <g> </g>
                                        <g> </g>
                                        <g> </g>
                                        <g> </g>
                                        <g> </g>
                                        <g> </g>
                                    </g>
                                </g>
                            </svg>
                        </button>

                        <button
                            className="p-2 hover:bg-indigo-50 rounded-xl transition-all"
                            title="My resources"
                            onClick={() => navigate("/gate/myresources")}
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

export default GateHeader;
