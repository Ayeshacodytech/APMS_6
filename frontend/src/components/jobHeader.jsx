import { useNavigate } from "react-router-dom";

export default function JobHeader() {
    const navigate = useNavigate();

    return (
        <nav className="h-16 shadow-lg border rounded-lg backdrop-blur bg-white/30">
            <div className="flex justify-between items-center h-full px-4 md:px-6">
                {/* Logo Section */}
                <div className="flex items-center gap-2">
                    <div className="flex items-center justify-center">
                        <svg width="120" height="120" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                            <text x="20" y="100" fontFamily="grechen" fontSize="100" fontWeight="bold" fill="white">F</text>
                            <text x="50" y="100" fontFamily="grechen" fontSize="50" fontWeight="bold" fill="white">F</text>
                        </svg>
                    </div>
                    <span className="text-2xl text-[#6366F1] font-bold">FutureForge</span>
                </div>

                {/* Navigation Buttons */}
                <div className="flex justify-end items-center gap-4">
                    <button
                        className="p-2 hover:bg-indigo-100 rounded-xl transition-all"
                        title="Job Home"
                        onClick={() => navigate('/jobs')}
                    >
                        <svg fill="#6366F1" width="28px" height="28px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" stroke="#6366F1">
                            <path d="M3.012,10.981,3,11H5v9a1,1,0,0,0,1,1H18a1,1,0,0,0,1-1V11h2a1,1,0,0,0,.555-1.832l-9-6a1,1,0,0,0-1.11,0l-9,6a1,1,0,0,0-.277,1.387A.98.98,0,0,0,3.012,10.981ZM10,14a1,1,0,0,1,1-1h2a1,1,0,0,1,1,1v5H10Z"></path>
                        </svg>
                    </button>
                </div>
            </div>
        </nav>
    );
}
