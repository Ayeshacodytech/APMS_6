import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/authContext";

export default function AdminHeader() {
    const {logout}=useAuth()
    const navigate = useNavigate();
    const handleLogout=()=>{
        logout()
        navigate('/admin/signin')
    }
    return (
        <nav className="h-16 shadow-lg border rounded-lg backdrop-blur bg-white/30">
            <div className="flex justify-between items-center h-full px-2">
                <div className="flex items-center">
                    <div className="flex items-center justify-center">
                        <svg width="150" height="150" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                            <text x="20" y="100" fontFamily="grechen" font-size="100" font-weight="bold" fill="white">F</text>
                            <text x="50" y="100" fontFamily="grechen" font-size="50" font-weight="bold" fill="white">F</text>
                        </svg>
                    </div>
                    <span className="fontfamily-grechen text-2xl text-[#6366F1] font-bold">Futureforge</span>
                </div>

                <div className="flex justify-end items-center h-full px-6 gap-6">
                    <button
                        className="p-2 hover:bg-indigo-50 rounded-xl transition-all"
                        title="Admin Home"
                        onClick={() => navigate('/admin/addjob')} // Fixed here
                    >
                        <svg fill="#6366F1" width="28px" height="28px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" stroke="#6366F1">
                            <path d="M3.012,10.981,3,11H5v9a1,1,0,0,0,1,1H18a1,1,0,0,0,1-1V11h2a1,1,0,0,0,.555-1.832l-9-6a1,1,0,0,0-1.11,0l-9,6a1,1,0,0,0-.277,1.387A.98.98,0,0,0,3.012,10.981ZM10,14a1,1,0,0,1,1-1h2a1,1,0,0,1,1,1v5H10Z"></path>
                        </svg>
                    </button>


                    <button
                        className="p-2 hover:bg-indigo-50 rounded-xl transition-all"
                        title="New Job"
                        onClick={() => navigate('/admin/addjob')} // Fixed here
                    >
                        <svg width="28px" height="28px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#6366F1">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10zm-5.5-9a1 1 0 1 1 0-2H11V6.5a1 1 0 1 1 2 0V11h4.5a1 1 0 1 1 0 2H13v4.5a1 1 0 1 1-2 0V13H6.5z" fill="#6366F1"></path>
                        </svg>
                    </button>
                    <button
                        className="p-2 hover:bg-indigo-50 rounded-xl transition-all"
                        title="logout"
                        onClick={handleLogout} // Fixed here
                    >
                        <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#6366F1">
                            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                            <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                            <g id="SVGRepo_iconCarrier">
                                <path d="M21 12L13 12" stroke="#6366F1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                                <path d="M18 15L20.913 12.087V12.087C20.961 12.039 20.961 11.961 20.913 11.913V11.913L18 9" stroke="#6366F1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                                <path d="M16 5V4.5V4.5C16 3.67157 15.3284 3 14.5 3H5C3.89543 3 3 3.89543 3 5V19C3 20.1046 3.89543 21 5 21H14.5C15.3284 21 16 20.3284 16 19.5V19.5V19" stroke="#6366F1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                            </g>
                        </svg>
                    </button>

                </div>
            </div>
        </nav>
    )
}
