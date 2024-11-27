import { useNavigate } from "react-router-dom";
export function SideNavBar() {
  const navigate = useNavigate();
  const homeclick = () => {
    navigate("/home");
  };
  const profileclick = () => {
    navigate("/profile");
  };
  return (
    <div>
      <nav className="w-60 shadow-lg min-h-screen pt-6 fixed top-0 left-0 bordered w-60 shadow-lg min-h-screen pt-6 fixed top-0 left-0 bg-gradient-to-tl from-[#35fdf5] via-[#6f5eff] to-[#a935fd] object-fill min-h-screen">
        <div className="px-8 py-2">
          <button
            onClick={homeclick}
            className="bg-black text-white rounded-lg px-4 py-1 pr-[62px] flex items-center transition-transform transform hover:scale-110"
          >
            <div className="pr-3">
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
                  {" "}
                  <title>home [#1391]</title> <desc>Created with Sketch.</desc>{" "}
                  <defs> </defs>{" "}
                  <g
                    id="Page-1"
                    stroke="none"
                    stroke-width="1"
                    fill="none"
                    fill-rule="evenodd"
                  >
                    {" "}
                    <g
                      id="Dribbble-Light-Preview"
                      transform="translate(-419.000000, -720.000000)"
                      fill="#FFFFFF"
                    >
                      {" "}
                      <g
                        id="icons"
                        transform="translate(56.000000, 160.000000)"
                      >
                        {" "}
                        <path
                          d="M379.79996,578 L376.649968,578 L376.649968,574 L370.349983,574 L370.349983,578 L367.19999,578 L367.19999,568.813 L373.489475,562.823 L379.79996,568.832 L379.79996,578 Z M381.899955,568.004 L381.899955,568 L381.899955,568 L373.502075,560 L363,569.992 L364.481546,571.406 L365.099995,570.813 L365.099995,580 L372.449978,580 L372.449978,576 L374.549973,576 L374.549973,580 L381.899955,580 L381.899955,579.997 L381.899955,570.832 L382.514204,571.416 L384.001,570.002 L381.899955,568.004 Z"
                          id="home-[#1391]"
                        >
                          {" "}
                        </path>{" "}
                      </g>{" "}
                    </g>{" "}
                  </g>{" "}
                </g>
              </svg>
            </div>
            Home
          </button>
        </div>
        {/* <div className="px-8 py-2">
          <button className="bg-black text-white rounded-lg px-4 py-1 pr-[72px] flex items-center transition-transform transform hover:scale-110">
            <div className="pr-3">
              <svg
                width="20px"
                height="20px"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
                fill="#000000"
              >
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  <path
                    fill-rule="evenodd"
                    d="M5.508 2.466L4.356 5H2.5A1.5 1.5 0 001 6.5v1.882l.503.251a19 19 0 0016.994 0L19 8.382V6.5A1.5 1.5 0 0017.5 5h-1.856l-1.152-2.534A2.5 2.5 0 0012.216 1H7.784a2.5 2.5 0 00-2.276 1.466zM7.784 3a.5.5 0 00-.455.293L6.553 5h6.894l-.776-1.707A.5.5 0 0012.216 3H7.784z"
                    fill="#ffffff"
                  ></path>
                  <path
                    d="M19 10.613a20.986 20.986 0 01-8 2.003V14a1 1 0 01-2 0v-1.384c-2.74-.131-5.46-.798-8-2.003V17.5A1.5 1.5 0 002.5 19h15a1.5 1.5 0 001.5-1.5v-6.887z"
                    fill="#ffffff"
                  ></path>
                </g>
              </svg>
            </div>
            Jobs
          </button>
        </div> */}
        <div className="px-8 py-2">
          <button className="bg-black text-white rounded-lg px-4 py-1 pr-5 flex items-center transition-transform transform hover:scale-110">
            <div className="pr-3">
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
                  {" "}
                  <g>
                    {" "}
                    <polygon points="91,45 83,45 83,73 73,73 73,119 61,119 61,73 51,73 51,45 43,45 43,81 53,81 53,127 81,127 81,81 91,81 "></polygon>{" "}
                    <path d="M53,15c0,7.7,6.3,14,14,14s14-6.3,14-14S74.7,1,67,1S53,7.3,53,15z M73,15c0,3.3-2.7,6-6,6s-6-2.7-6-6s2.7-6,6-6 S73,11.7,73,15z"></path>{" "}
                    <path d="M19,25c0,7.7,6.3,14,14,14s14-6.3,14-14s-6.3-14-14-14S19,17.3,19,25z M39,25c0,3.3-2.7,6-6,6s-6-2.7-6-6s2.7-6,6-6 S39,21.7,39,25z"></path>{" "}
                    <polygon points="113,83 103,83 103,119 87,119 87,127 111,127 111,91 121,91 121,51 113,51 "></polygon>{" "}
                    <path d="M87,25c0,7.7,6.3,14,14,14s14-6.3,14-14s-6.3-14-14-14S87,17.3,87,25z M101,19c3.3,0,6,2.7,6,6s-2.7,6-6,6s-6-2.7-6-6 S97.7,19,101,19z"></path>{" "}
                    <polygon points="31,83 21,83 21,51 13,51 13,91 23,91 23,127 47,127 47,119 31,119 "></polygon>{" "}
                  </g>{" "}
                </g>
              </svg>
            </div>
            Community
          </button>
        </div>
        <div className="px-8 py-2">
          <button className="bg-black text-white rounded-lg px-4 py-1 pr-16 flex items-center transition-transform transform hover:scale-110">
            <div className="pr-3">
              <svg
                width="20px"
                height="20px"
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
                  {" "}
                  <path
                    d="M15.5 9L15.6716 9.17157C17.0049 10.5049 17.6716 11.1716 17.6716 12C17.6716 12.8284 17.0049 13.4951 15.6716 14.8284L15.5 15"
                    stroke="#ffffff"
                    stroke-width="1.5"
                    stroke-linecap="round"
                  ></path>{" "}
                  <path
                    d="M13.2942 7.17041L12.0001 12L10.706 16.8297"
                    stroke="#ffffff"
                    stroke-width="1.5"
                    stroke-linecap="round"
                  ></path>{" "}
                  <path
                    d="M8.49994 9L8.32837 9.17157C6.99504 10.5049 6.32837 11.1716 6.32837 12C6.32837 12.8284 6.99504 13.4951 8.32837 14.8284L8.49994 15"
                    stroke="#ffffff"
                    stroke-width="1.5"
                    stroke-linecap="round"
                  ></path>{" "}
                  <path
                    d="M22 12C22 16.714 22 19.0711 20.5355 20.5355C19.0711 22 16.714 22 12 22C7.28595 22 4.92893 22 3.46447 20.5355C2 19.0711 2 16.714 2 12C2 7.28595 2 4.92893 3.46447 3.46447C4.92893 2 7.28595 2 12 2C16.714 2 19.0711 2 20.5355 3.46447C21.5093 4.43821 21.8356 5.80655 21.9449 8"
                    stroke="#ffffff"
                    stroke-width="1.5"
                    stroke-linecap="round"
                  ></path>{" "}
                </g>
              </svg>
            </div>
            Code
          </button>
        </div>
        <div className="px-8 py-2">
          <button className="bg-black text-white rounded-lg px-4 py-1 pr-10 flex items-center transition-transform transform hover:scale-110">
            <div className="pr-3">
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
                  {" "}
                  <path d="M4,16 L4,8 L3.5,8 C3.22385763,8 3,7.77614237 3,7.5 C3,7.22385763 3.22385763,7 3.5,7 L4,7 L4,5.5 C4,4.11928813 5.11928813,3 6.5,3 L17.5,3 C18.8807119,3 20,4.11928813 20,5.5 L20,18.5 C20,19.8807119 18.8807119,21 17.5,21 L6.5,21 C5.11928813,21 4,19.8807119 4,18.5 L4,17 L3.5,17 C3.22385763,17 3,16.7761424 3,16.5 C3,16.2238576 3.22385763,16 3.5,16 L4,16 Z M5,16 L5.5,16 C5.77614237,16 6,16.2238576 6,16.5 C6,16.7761424 5.77614237,17 5.5,17 L5,17 L5,18.5 C5,19.3284271 5.67157288,20 6.5,20 L17.5,20 C18.3284271,20 19,19.3284271 19,18.5 L19,5.5 C19,4.67157288 18.3284271,4 17.5,4 L6.5,4 C5.67157288,4 5,4.67157288 5,5.5 L5,7 L5.5,7 C5.77614237,7 6,7.22385763 6,7.5 C6,7.77614237 5.77614237,8 5.5,8 L5,8 L5,16 Z M8.5,6 L15.5,6 C16.3284271,6 17,6.67157288 17,7.5 L17,9.5 C17,10.3284271 16.3284271,11 15.5,11 L8.5,11 C7.67157288,11 7,10.3284271 7,9.5 L7,7.5 C7,6.67157288 7.67157288,6 8.5,6 Z M8.5,7 C8.22385763,7 8,7.22385763 8,7.5 L8,9.5 C8,9.77614237 8.22385763,10 8.5,10 L15.5,10 C15.7761424,10 16,9.77614237 16,9.5 L16,7.5 C16,7.22385763 15.7761424,7 15.5,7 L8.5,7 Z"></path>{" "}
                </g>
              </svg>
            </div>
            Aptitude
          </button>
        </div>
        <div className="px-8 py-2">
          <button className="bg-black text-white rounded-lg px-4 py-1 pr-[69px] flex items-center transition-transform transform hover:scale-110">
            <div className="pr-3">
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
                  {" "}
                  <path d="M4,16 L4,8 L3.5,8 C3.22385763,8 3,7.77614237 3,7.5 C3,7.22385763 3.22385763,7 3.5,7 L4,7 L4,5.5 C4,4.11928813 5.11928813,3 6.5,3 L17.5,3 C18.8807119,3 20,4.11928813 20,5.5 L20,18.5 C20,19.8807119 18.8807119,21 17.5,21 L6.5,21 C5.11928813,21 4,19.8807119 4,18.5 L4,17 L3.5,17 C3.22385763,17 3,16.7761424 3,16.5 C3,16.2238576 3.22385763,16 3.5,16 L4,16 Z M5,16 L5.5,16 C5.77614237,16 6,16.2238576 6,16.5 C6,16.7761424 5.77614237,17 5.5,17 L5,17 L5,18.5 C5,19.3284271 5.67157288,20 6.5,20 L17.5,20 C18.3284271,20 19,19.3284271 19,18.5 L19,5.5 C19,4.67157288 18.3284271,4 17.5,4 L6.5,4 C5.67157288,4 5,4.67157288 5,5.5 L5,7 L5.5,7 C5.77614237,7 6,7.22385763 6,7.5 C6,7.77614237 5.77614237,8 5.5,8 L5,8 L5,16 Z M8.5,6 L15.5,6 C16.3284271,6 17,6.67157288 17,7.5 L17,9.5 C17,10.3284271 16.3284271,11 15.5,11 L8.5,11 C7.67157288,11 7,10.3284271 7,9.5 L7,7.5 C7,6.67157288 7.67157288,6 8.5,6 Z M8.5,7 C8.22385763,7 8,7.22385763 8,7.5 L8,9.5 C8,9.77614237 8.22385763,10 8.5,10 L15.5,10 C15.7761424,10 16,9.77614237 16,9.5 L16,7.5 C16,7.22385763 15.7761424,7 15.5,7 L8.5,7 Z"></path>{" "}
                </g>
              </svg>
            </div>
            Gate
          </button>
        </div>
        <div className="px-8 py-2">
          <button
            className="bg-black text-white rounded-lg px-4 py-1 pr-[57px] flex items-center transition-transform transform hover:scale-110"
            onClick={profileclick}
          >
            <div className="pr-3">
              <svg
                width="20px"
                height="20px"
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
                  {" "}
                  <path
                    d="M12.12 12.78C12.05 12.77 11.96 12.77 11.88 12.78C10.12 12.72 8.71997 11.28 8.71997 9.50998C8.71997 7.69998 10.18 6.22998 12 6.22998C13.81 6.22998 15.28 7.69998 15.28 9.50998C15.27 11.28 13.88 12.72 12.12 12.78Z"
                    stroke="#FFFFFF"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></path>{" "}
                  <path
                    d="M18.74 19.3801C16.96 21.0101 14.6 22.0001 12 22.0001C9.40001 22.0001 7.04001 21.0101 5.26001 19.3801C5.36001 18.4401 5.96001 17.5201 7.03001 16.8001C9.77001 14.9801 14.25 14.9801 16.97 16.8001C18.04 17.5201 18.64 18.4401 18.74 19.3801Z"
                    stroke="#FFFFFF"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></path>{" "}
                  <path
                    d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                    stroke="#FFFFFF"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></path>{" "}
                </g>
              </svg>
            </div>
            Profile
          </button>
        </div>
      </nav>
    </div>
  );
}
