import { useNavigate } from "react-router-dom";
export function Job({ job }) {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/home/${job.id}`, { state: { job } }); // Pass the job object in state
  };
  return (
    <div className="col-span-1 transition-transform transform hover:scale-105">
      <div className="border h-64 rounded-lg">
        <div className="text-lg flex justify-center py-2 font-bold italic bg-black text-white item-center rounded-lg">
          {job.CompanyName}
        </div>
        <div className="flex pl-8 py-2">
          <div className="pt-0.5">
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
                  d="M9 7H5C3.89543 7 3 7.89543 3 9V18C3 19.1046 3.89543 20 5 20H19C20.1046 20 21 19.1046 21 18V9C21 7.89543 20.1046 7 19 7H15M9 7V5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7M9 7H15"
                  stroke="#000000"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>{" "}
              </g>
            </svg>
          </div>
          <div className="text-md italic">Role:</div>
          <div className="pl-4 text-md font-semibold">{job.role}</div>
        </div>
        <div className="flex pl-8 py-1">
          <div className="pt-0.5">
            <svg
              width="20px"
              height="20px"
              viewBox="0 0 64 64"
              xmlns="http://www.w3.org/2000/svg"
              stroke-width="3"
              stroke="#000000"
              fill="none"
            >
              <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                <rect x="7.18" y="16.7" width="50.86" height="29.87"></rect>
                <path d="M17.22,16.55a10,10,0,0,1-10,10.05"></path>
                <path d="M17.51,46.57a10.05,10.05,0,0,0-10-10"></path>
                <path d="M48.16,16.55A10.05,10.05,0,0,0,58.21,26.6"></path>
                <path d="M48,46.57a10.05,10.05,0,0,1,10-10"></path>
                <path
                  d="M28.47,22.3H31c2.49,0,5.23.81,5.23,4.6,0,4.11-3.48,5.68-7.18,5.26a.21.21,0,0,0-.17.36L36.74,41"
                  stroke-linecap="round"
                ></path>
                <line
                  x1="39.24"
                  y1="22.3"
                  x2="30.45"
                  y2="22.3"
                  stroke-linecap="round"
                ></line>
                <line
                  x1="28.59"
                  y1="27.03"
                  x2="39.3"
                  y2="27.03"
                  stroke-linecap="round"
                ></line>
              </g>
            </svg>
          </div>
          <div className="text-md italic">Package:</div>
          <div className="pl-4 text-md font-semibold">{job.package}</div>
        </div>
        <div className="flex pl-8 py-2">
          <div className="pt-0.5">
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
                  d="M9 7H5C3.89543 7 3 7.89543 3 9V18C3 19.1046 3.89543 20 5 20H19C20.1046 20 21 19.1046 21 18V9C21 7.89543 20.1046 7 19 7H15M9 7V5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7M9 7H15"
                  stroke="#000000"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>{" "}
              </g>
            </svg>
          </div>
          <div className="text-md italic">Type:</div>
          <div className="pl-4 text-md font-semibold">{job.Type}</div>
        </div>
        <div className="flex pl-8 py-2">
          <div className="pt-0.5">
            <svg
              width="20px"
              height="20px"
              viewBox="0 0 16 16"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              fill="#000000"
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
                  fill="#444"
                  d="M5 16v-5.3c-0.6-0.3-1-1-1-1.7v-4c0-0.7 0.4-1.3 1-1.7 0-0.1 0-0.2 0-0.3 0-1.1-0.9-2-2-2s-2 0.9-2 2c0 1.1 0.9 2 2 2h-2c-0.5 0-1 0.5-1 1v4c0 0.5 0.5 1 1 1v5h4z"
                ></path>{" "}
                <path
                  fill="#444"
                  d="M15 5h-2c1.1 0 2-0.9 2-2s-0.9-2-2-2-2 0.9-2 2c0 0.1 0 0.2 0 0.3 0.6 0.4 1 1 1 1.7v4c0 0.7-0.4 1.4-1 1.7v5.3h4v-5c0.5 0 1-0.5 1-1v-4c0-0.5-0.5-1-1-1z"
                ></path>{" "}
                <path
                  fill="#444"
                  d="M10 2c0 1.105-0.895 2-2 2s-2-0.895-2-2c0-1.105 0.895-2 2-2s2 0.895 2 2z"
                ></path>{" "}
                <path
                  fill="#444"
                  d="M10 4h-4c-0.5 0-1 0.5-1 1v4c0 0.5 0.5 1 1 1v6h4v-6c0.5 0 1-0.5 1-1v-4c0-0.5-0.5-1-1-1z"
                ></path>{" "}
              </g>
            </svg>
          </div>
          <div className="text-md italic">Eligibility:</div>
          <div className="pl-4 text-md font-semibold">{job.eligibility}</div>
        </div>
        <div className="pt-2 flex px-8 justify-between">
          <div className="">
            <button className="bg-black text-white font-semibold py-1 px-3 rounded-lg transition-transform transform hover:scale-110">
              Apply
            </button>
          </div>
          <div>
            <button
              className="bg-black text-white font-semibold py-1 px-3 rounded-lg transition-transform transform hover:scale-110"
              onClick={handleClick}
            >
              View job
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
