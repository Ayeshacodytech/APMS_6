import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuth } from "../auth/authContext";



export function TeacherSideNavBar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const {logout}=useAuth()
  const navItems = [
    {
      name: "Home",
      path: "/teacher/home",
      icon: (
        <svg
          width="20px"
          height="20px"
          viewBox="0 -0.5 21 21"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          fill="#FFFFFF"
        >
          <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
          <g
            id="SVGRepo_tracerCarrier"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></g>
          <g id="SVGRepo_iconCarrier">
  
            <title>home [#1391]</title> <desc>Created with Sketch.</desc>
            <defs> </defs>
            <g
              id="Page-1"
              stroke="none"
              stroke-width="1"
              fill="none"
              fill-rule="evenodd"
            >
  
              <g
                id="Dribbble-Light-Preview"
                transform="translate(-419.000000, -720.000000)"
                fill="#FFFFFF"
              >
  
                <g
                  id="icons"
                  transform="translate(56.000000, 160.000000)"
                >
  
                  <path
                    d="M379.79996,578 L376.649968,578 L376.649968,574 L370.349983,574 L370.349983,578 L367.19999,578 L367.19999,568.813 L373.489475,562.823 L379.79996,568.832 L379.79996,578 Z M381.899955,568.004 L381.899955,568 L381.899955,568 L373.502075,560 L363,569.992 L364.481546,571.406 L365.099995,570.813 L365.099995,580 L372.449978,580 L372.449978,576 L374.549973,576 L374.549973,580 L381.899955,580 L381.899955,579.997 L381.899955,570.832 L382.514204,571.416 L384.001,570.002 L381.899955,568.004 Z"
                    id="home-[#1391]"
                  >
  
                  </path>
                </g>
              </g>
            </g>
          </g>
        </svg>
      )
    },
    {
      name: "Community",
      path: "/teacher/community",
      icon: (
        <svg
          fill="#FFFFFF"
          width="20px"
          height="20px"
          viewBox="0 0 128 128"
          id="Layer_1"
          version="1.1"
          xml:space="preserve"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
        >
          <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
          <g
            id="SVGRepo_tracerCarrier"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></g>
          <g id="SVGRepo_iconCarrier">
  
            <g>
  
              <polygon points="91,45 83,45 83,73 73,73 73,119 61,119 61,73 51,73 51,45 43,45 43,81 53,81 53,127 81,127 81,81 91,81 "></polygon>
              <path d="M53,15c0,7.7,6.3,14,14,14s14-6.3,14-14S74.7,1,67,1S53,7.3,53,15z M73,15c0,3.3-2.7,6-6,6s-6-2.7-6-6s2.7-6,6-6 S73,11.7,73,15z"></path>
              <path d="M19,25c0,7.7,6.3,14,14,14s14-6.3,14-14s-6.3-14-14-14S19,17.3,19,25z M39,25c0,3.3-2.7,6-6,6s-6-2.7-6-6s2.7-6,6-6 S39,21.7,39,25z"></path>
              <polygon points="113,83 103,83 103,119 87,119 87,127 111,127 111,91 121,91 121,51 113,51 "></polygon>
              <path d="M87,25c0,7.7,6.3,14,14,14s14-6.3,14-14s-6.3-14-14-14S87,17.3,87,25z M101,19c3.3,0,6,2.7,6,6s-2.7,6-6,6s-6-2.7-6-6 S97.7,19,101,19z"></path>
              <polygon points="31,83 21,83 21,51 13,51 13,91 23,91 23,127 47,127 47,119 31,119 "></polygon>
            </g>
          </g>
        </svg>
      )
    },
    {
      name: "Aptitude",
      path: "/teacher/aptitude/home",
      icon: (
        <svg
          fill="#ffffff"
          width="20px"
          height="20px"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          stroke="#ffffff"
        >
          <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
          <g
            id="SVGRepo_tracerCarrier"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></g>
          <g id="SVGRepo_iconCarrier">
  
            <path d="M4,16 L4,8 L3.5,8 C3.22385763,8 3,7.77614237 3,7.5 C3,7.22385763 3.22385763,7 3.5,7 L4,7 L4,5.5 C4,4.11928813 5.11928813,3 6.5,3 L17.5,3 C18.8807119,3 20,4.11928813 20,5.5 L20,18.5 C20,19.8807119 18.8807119,21 17.5,21 L6.5,21 C5.11928813,21 4,19.8807119 4,18.5 L4,17 L3.5,17 C3.22385763,17 3,16.7761424 3,16.5 C3,16.2238576 3.22385763,16 3.5,16 L4,16 Z M5,16 L5.5,16 C5.77614237,16 6,16.2238576 6,16.5 C6,16.7761424 5.77614237,17 5.5,17 L5,17 L5,18.5 C5,19.3284271 5.67157288,20 6.5,20 L17.5,20 C18.3284271,20 19,19.3284271 19,18.5 L19,5.5 C19,4.67157288 18.3284271,4 17.5,4 L6.5,4 C5.67157288,4 5,4.67157288 5,5.5 L5,7 L5.5,7 C5.77614237,7 6,7.22385763 6,7.5 C6,7.77614237 5.77614237,8 5.5,8 L5,8 L5,16 Z M8.5,6 L15.5,6 C16.3284271,6 17,6.67157288 17,7.5 L17,9.5 C17,10.3284271 16.3284271,11 15.5,11 L8.5,11 C7.67157288,11 7,10.3284271 7,9.5 L7,7.5 C7,6.67157288 7.67157288,6 8.5,6 Z M8.5,7 C8.22385763,7 8,7.22385763 8,7.5 L8,9.5 C8,9.77614237 8.22385763,10 8.5,10 L15.5,10 C15.7761424,10 16,9.77614237 16,9.5 L16,7.5 C16,7.22385763 15.7761424,7 15.5,7 L8.5,7 Z"></path>
          </g>
        </svg>
      )
    },
    {
      name: "Gate",
      path: "/teacher/gate/home",
      icon: (
        <svg
          fill="#ffffff"
          width="20px"
          height="20px"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          stroke="#ffffff"
        >
          <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
          <g
            id="SVGRepo_tracerCarrier"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></g>
          <g id="SVGRepo_iconCarrier">
  
            <path d="M4,16 L4,8 L3.5,8 C3.22385763,8 3,7.77614237 3,7.5 C3,7.22385763 3.22385763,7 3.5,7 L4,7 L4,5.5 C4,4.11928813 5.11928813,3 6.5,3 L17.5,3 C18.8807119,3 20,4.11928813 20,5.5 L20,18.5 C20,19.8807119 18.8807119,21 17.5,21 L6.5,21 C5.11928813,21 4,19.8807119 4,18.5 L4,17 L3.5,17 C3.22385763,17 3,16.7761424 3,16.5 C3,16.2238576 3.22385763,16 3.5,16 L4,16 Z M5,16 L5.5,16 C5.77614237,16 6,16.2238576 6,16.5 C6,16.7761424 5.77614237,17 5.5,17 L5,17 L5,18.5 C5,19.3284271 5.67157288,20 6.5,20 L17.5,20 C18.3284271,20 19,19.3284271 19,18.5 L19,5.5 C19,4.67157288 18.3284271,4 17.5,4 L6.5,4 C5.67157288,4 5,4.67157288 5,5.5 L5,7 L5.5,7 C5.77614237,7 6,7.22385763 6,7.5 C6,7.77614237 5.77614237,8 5.5,8 L5,8 L5,16 Z M8.5,6 L15.5,6 C16.3284271,6 17,6.67157288 17,7.5 L17,9.5 C17,10.3284271 16.3284271,11 15.5,11 L8.5,11 C7.67157288,11 7,10.3284271 7,9.5 L7,7.5 C7,6.67157288 7.67157288,6 8.5,6 Z M8.5,7 C8.22385763,7 8,7.22385763 8,7.5 L8,9.5 C8,9.77614237 8.22385763,10 8.5,10 L15.5,10 C15.7761424,10 16,9.77614237 16,9.5 L16,7.5 C16,7.22385763 15.7761424,7 15.5,7 L8.5,7 Z"></path>
          </g>
        </svg>
      )
    },
    {
          name: "Logout",
          icon: (
            <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#000000">
              <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
              <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
              <g id="SVGRepo_iconCarrier">
                <path d="M21 12L13 12" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                <path d="M18 15L20.913 12.087V12.087C20.961 12.039 20.961 11.961 20.913 11.913V11.913L18 9" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                <path d="M16 5V4.5V4.5C16 3.67157 15.3284 3 14.5 3H5C3.89543 3 3 3.89543 3 5V19C3 20.1046 3.89543 21 5 21H14.5C15.3284 21 16 20.3284 16 19.5V19.5V19" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
              </g>
            </svg>
          ),
          onClick: () => {
            console.log("start")
            logout();
            console.log("logout")
            navigate("/teacher/signin");
          }
        }
  ];
  // Check screen size
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Initial check
    checkScreenSize();

    // Add listener for window resize
    window.addEventListener('resize', checkScreenSize);

    // Clean up
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const handleNavigation = (path) => {
    navigate(path);
    // For mobile or if we want the sidebar to auto-close on desktop too
    if (isMobile) {
      setIsOpen(false);
    }
  };

  // Toggle button that works for both mobile and desktop
  const ToggleButton = () => (
    <button
      className={`fixed top-4 z-40 p-2 rounded-md bg-indigo-600 text-white shadow-lg transition-all ${isMobile ? "left-4" : "left-4"
      }`}
      onClick={() => setIsOpen(!isOpen)}
      aria-expanded={isOpen}
      aria-label="Toggle menu"
    >
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {isOpen ? (
          // X icon when menu is open
          <path d="M6 18L18 6M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        ) : (
          // Hamburger icon when menu is closed
          <>
            <path d="M4 6H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M4 12H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M4 18H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </>
        )}
      </svg>
    </button>
  );
  const MobileBottomNav = () => (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-gray-800 shadow-lg z-20">
      <div className="flex justify-around p-2">
        {navItems.slice(0, 5).map((item) => (
          <button
            key={item.name}
            onClick={() => handleNavigation(item.path)}
            className={`p-2 rounded-full ${location.pathname === item.path ? "text-white bg-indigo-600" : "text-gray-300"
              }`}
            aria-label={item.name}
          >
            {item.icon}
          </button>
        ))}
        <button
          onClick={() => setIsOpen(true)}
          className="p-2 text-gray-300"
          aria-label="More options"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5 10C3.9 10 3 10.9 3 12C3 13.1 3.9 14 5 14C6.1 14 7 13.1 7 12C7 10.9 6.1 10 5 10Z" fill="currentColor" />
            <path d="M12 10C10.9 10 10 10.9 10 12C10 13.1 10.9 14 12 14C13.1 14 14 13.1 14 12C14 10.9 13.1 10 12 10Z" fill="currentColor" />
            <path d="M19 10C17.9 10 17 10.9 17 12C17 13.1 17.9 14 19 14C20.1 14 21 13.1 21 12C21 10.9 20.1 10 19 10Z" fill="currentColor" />
          </svg>
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Toggle button for both mobile and desktop */}
      <ToggleButton />

      {/* Overlay for mobile only */}
      {isMobile && isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar Navigation for both mobile and desktop */}
      <nav
  className={`${isOpen ? "translate-x-0" : "-translate-x-full"}
    w-60 shadow-lg h-full min-h-screen fixed top-0 left-0 
    bg-white/10 backdrop-blur-lg border border-white/20 text-white 
    z-20 overflow-y-auto transition-transform duration-300 ease-in-out`}
>

        <div className="space-y-2 mt-16 overflow-y-auto">
          {navItems.map((item) => (
            <div key={item.name} className="px-8 py-2">
              <button
                className={`bg-gradient-to-tl from-[#35fdf5] via-[#6f5eff] to-[#a935fd] font-bold text-white rounded-lg px-4 py-2 w-full flex items-center transition-transform hover:scale-105 ${location.pathname === item.path ? "ring-2 ring-white" : ""
                  }`}
                onClick={() => handleNavigation(item.path)}
                aria-current={location.pathname === item.path ? "page" : undefined}
              >
                <div className="mr-3 text-white">
                  {item.icon}
                </div>
                <span>{item.name}</span>
              </button>
            </div>
          ))}
        </div>
      </nav>
      {isMobile && !isOpen && <MobileBottomNav />}

      {/* Main content spacer - only when sidebar is open on desktop */}
      {isOpen && !isMobile && <div className="w-60" aria-hidden="true"></div>}
    </>
  );
}
