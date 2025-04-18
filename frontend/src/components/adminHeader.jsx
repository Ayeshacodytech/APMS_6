import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/authContext";

export default function AdminHeader() {
    const { logout } = useAuth()
    const navigate = useNavigate();
    const handleLogout = () => {
        logout()
        navigate('/admin/signin')
    }
    return (
        <nav className="h-16 shadow-lg border rounded-lg backdrop-blur bg-white/30">
            <div className="flex justify-between md:flex-row items-center h-full px-2">
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
                        onClick={() => navigate('/admin/home')} // Fixed here
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
                        title="New Problem"
                        onClick={() => navigate('/admin/code/add')}
                    >
                        <svg
                            width="24px"
                            height="24px"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                            <g
                                id="SVGRepo_tracerCarrier"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                            ></g>
                            <g id="SVGRepo_iconCarrier">

                                <path
                                    d="M15.5 9L15.6716 9.17157C17.0049 10.5049 17.6716 11.1716 17.6716 12C17.6716 12.8284 17.0049 13.4951 15.6716 14.8284L15.5 15"
                                    stroke="#6366F1"
                                    stroke-width="1.5"
                                    stroke-linecap="round"
                                ></path>
                                <path
                                    d="M13.2942 7.17041L12.0001 12L10.706 16.8297"
                                    stroke="#6366F1"
                                    stroke-width="1.5"
                                    stroke-linecap="round"
                                ></path>
                                <path
                                    d="M8.49994 9L8.32837 9.17157C6.99504 10.5049 6.32837 11.1716 6.32837 12C6.32837 12.8284 6.99504 13.4951 8.32837 14.8284L8.49994 15"
                                    stroke="#6366F1"
                                    stroke-width="1.5"
                                    stroke-linecap="round"
                                ></path>
                                <path
                                    d="M22 12C22 16.714 22 19.0711 20.5355 20.5355C19.0711 22 16.714 22 12 22C7.28595 22 4.92893 22 3.46447 20.5355C2 19.0711 2 16.714 2 12C2 7.28595 2 4.92893 3.46447 3.46447C4.92893 2 7.28595 2 12 2C16.714 2 19.0711 2 20.5355 3.46447C21.5093 4.43821 21.8356 5.80655 21.9449 8"
                                    stroke="#6366F1"
                                    stroke-width="1.5"
                                    stroke-linecap="round"
                                ></path>
                            </g>
                        </svg>
                    </button>
                    <button
                        className="p-2 hover:bg-indigo-50 rounded-xl transition-all"
                        title="Leaderboard"
                        onClick={() => navigate("/admin/leaderboard")}
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
                            title="Problems"
                            onClick={() => navigate("/admin/code/problems")}
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
